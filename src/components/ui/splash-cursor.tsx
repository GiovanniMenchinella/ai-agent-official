"use client";
import { useEffect, useRef } from "react";
import { SplashCursorProps } from "@/lib/fluid-simulation/types";
import { getSupportedWebGLContext, compileShader, scaleByPixelRatio } from "@/lib/fluid-simulation/webgl-utils";
import { 
  baseVertexShader, copyShader, clearShader, displayShaderSource,
  splatShader, advectionShader, divergenceShader, curlShader,
  vorticityShader, pressureShader, gradientSubtractShader
} from "@/lib/fluid-simulation/shaders";
import { createFBO, createDoubleFBO, resizeDoubleFBO, getResolution, blit, initBlit } from "@/lib/fluid-simulation/framebuffers";
import { generateColor, correctRadius, wrap } from "@/lib/fluid-simulation/color-utils";
import { Material, Program } from "@/lib/fluid-simulation/program-classes";
import { pointerPrototype, updatePointerDownData, updatePointerMoveData, updatePointerUpData } from "@/lib/fluid-simulation/pointer-utils";

export function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 4.5,
  VELOCITY_DISSIPATION = 2.5,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 0,
  SPLAT_RADIUS = 0.1,
  SPLAT_FORCE = 2000,
  SHADING = false,
  COLOR_UPDATE_SPEED = 0,
  BACK_COLOR = { r: 0.15, g: 0.1, b: 0.3 },
  TRANSPARENT = true,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize pointers
    let pointers = [pointerPrototype()];

    const { gl, ext } = getSupportedWebGLContext(canvas);
    
    // Setup configuration
    let config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    };

    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    // Compile shaders
    const baseVertexShaderCompiled = compileShader(gl, gl.VERTEX_SHADER, baseVertexShader);
    
    // Create programs
    const copyProgram = new Program(gl, baseVertexShaderCompiled, compileShader(gl, gl.FRAGMENT_SHADER, copyShader));
    const clearProgram = new Program(gl, baseVertexShaderCompiled, compileShader(gl, gl.FRAGMENT_SHADER, clearShader));
    const splatProgram = new Program(gl, baseVertexShaderCompiled, compileShader(gl, gl.FRAGMENT_SHADER, splatShader));
    const advectionProgram = new Program(
      gl, 
      baseVertexShaderCompiled, 
      compileShader(gl, gl.FRAGMENT_SHADER, advectionShader, ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"])
    );
    const divergenceProgram = new Program(gl, baseVertexShaderCompiled, compileShader(gl, gl.FRAGMENT_SHADER, divergenceShader));
    const curlProgram = new Program(gl, baseVertexShaderCompiled, compileShader(gl, gl.FRAGMENT_SHADER, curlShader));
    const vorticityProgram = new Program(gl, baseVertexShaderCompiled, compileShader(gl, gl.FRAGMENT_SHADER, vorticityShader));
    const pressureProgram = new Program(gl, baseVertexShaderCompiled, compileShader(gl, gl.FRAGMENT_SHADER, pressureShader));
    const gradienSubtractProgram = new Program(gl, baseVertexShaderCompiled, compileShader(gl, gl.FRAGMENT_SHADER, gradientSubtractShader));
    const displayMaterial = new Material(gl, baseVertexShaderCompiled, displayShaderSource);

    // Initialize framebuffers
    let dye: any, velocity: any, divergence: any, curl: any, pressure: any;
    const blitFn = initBlit(gl);

    function initFramebuffers() {
      let simRes = getResolution(config.SIM_RESOLUTION, gl);
      let dyeRes = getResolution(config.DYE_RESOLUTION, gl);
      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      gl.disable(gl.BLEND);

      if (!dye)
        dye = createDoubleFBO(
          gl,
          dyeRes.width,
          dyeRes.height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering
        );
      else
        dye = resizeDoubleFBO(
          gl,
          dye,
          dyeRes.width,
          dyeRes.height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering,
          copyProgram
        );

      if (!velocity)
        velocity = createDoubleFBO(
          gl,
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering
        );
      else
        velocity = resizeDoubleFBO(
          gl,
          velocity,
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering,
          copyProgram
        );

      divergence = createFBO(
        gl,
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
      curl = createFBO(
        gl,
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
      pressure = createDoubleFBO(
        gl,
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
    }

    function updateKeywords() {
      let displayKeywords = [];
      if (config.SHADING) displayKeywords.push("SHADING");
      displayMaterial.setKeywords(displayKeywords);
    }

    function calcDeltaTime() {
      let now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    }

    function resizeCanvas() {
      let width = scaleByPixelRatio(canvas.clientWidth);
      let height = scaleByPixelRatio(canvas.clientHeight);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }

    function updateColors(dt: number) {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach((p) => {
          p.color = generateColor();
        });
      }
    }

    function splatPointer(pointer: any) {
      let dx = pointer.deltaX * config.SPLAT_FORCE;
      let dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function clickSplat(pointer: any) {
      const color = generateColor();
      color.r *= 10.0;
      color.g *= 10.0;
      color.b *= 10.0;
      let dx = 10 * (Math.random() - 0.5);
      let dy = 30 * (Math.random() - 0.5);
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }

    function splat(x: number, y: number, dx: number, dy: number, color: any) {
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms["uTarget"], velocity.read.attach(0));
      gl.uniform1f(
        splatProgram.uniforms["aspectRatio"],
        canvas.width / canvas.height
      );
      gl.uniform2f(splatProgram.uniforms["point"], x, y);
      gl.uniform3f(splatProgram.uniforms["color"], dx, dy, 0.0);
      gl.uniform1f(
        splatProgram.uniforms["radius"],
        correctRadius(config.SPLAT_RADIUS / 100.0, canvas.width / canvas.height)
      );
      blitFn(velocity.write);
      velocity.swap();

      gl.uniform1i(splatProgram.uniforms["uTarget"], dye.read.attach(0));
      gl.uniform3f(splatProgram.uniforms["color"], color.r, color.g, color.b);
      blitFn(dye.write);
      dye.swap();
    }

    function applyInputs() {
      pointers.forEach((p) => {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      });
    }

    function step(dt: number) {
      gl.disable(gl.BLEND);
      
      curlProgram.bind();
      gl.uniform2f(
        curlProgram.uniforms["texelSize"],
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(curlProgram.uniforms["uVelocity"], velocity.read.attach(0));
      blitFn(curl);

      vorticityProgram.bind();
      gl.uniform2f(
        vorticityProgram.uniforms["texelSize"],
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(vorticityProgram.uniforms["uVelocity"], velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms["uCurl"], curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms["curl"], config.CURL);
      gl.uniform1f(vorticityProgram.uniforms["dt"], dt);
      blitFn(velocity.write);
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(
        divergenceProgram.uniforms["texelSize"],
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(divergenceProgram.uniforms["uVelocity"], velocity.read.attach(0));
      blitFn(divergence);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms["uTexture"], pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms["value"], config.PRESSURE);
      blitFn(pressure.write);
      pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(
        pressureProgram.uniforms["texelSize"],
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(pressureProgram.uniforms["uDivergence"], divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms["uPressure"], pressure.read.attach(1));
        blitFn(pressure.write);
        pressure.swap();
      }

      gradienSubtractProgram.bind();
      gl.uniform2f(
        gradienSubtractProgram.uniforms["texelSize"],
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(gradienSubtractProgram.uniforms["uPressure"], pressure.read.attach(0));
      gl.uniform1i(gradienSubtractProgram.uniforms["uVelocity"], velocity.read.attach(1));
      blitFn(velocity.write);
      velocity.swap();

      advectionProgram.bind();
      gl.uniform2f(
        advectionProgram.uniforms["texelSize"],
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      if (!ext.supportLinearFiltering)
        gl.uniform2f(
          advectionProgram.uniforms["dyeTexelSize"],
          velocity.texelSizeX,
          velocity.texelSizeY
        );
      let velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms["uVelocity"], velocityId);
      gl.uniform1i(advectionProgram.uniforms["uSource"], velocityId);
      gl.uniform1f(advectionProgram.uniforms["dt"], dt);
      gl.uniform1f(
        advectionProgram.uniforms["dissipation"],
        config.VELOCITY_DISSIPATION
      );
      blitFn(velocity.write);
      velocity.swap();

      if (!ext.supportLinearFiltering)
        gl.uniform2f(
          advectionProgram.uniforms["dyeTexelSize"],
          dye.texelSizeX,
          dye.texelSizeY
        );
      gl.uniform1i(advectionProgram.uniforms["uVelocity"], velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms["uSource"], dye.read.attach(1));
      gl.uniform1f(
        advectionProgram.uniforms["dissipation"],
        config.DENSITY_DISSIPATION
      );
      blitFn(dye.write);
      dye.swap();
    }

    function render(target: any) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      drawDisplay(target);
    }

    function drawDisplay(target: any) {
      let width = target == null ? gl.drawingBufferWidth : target.width;
      let height = target == null ? gl.drawingBufferHeight : target.height;
      displayMaterial.bind();
      if (config.SHADING)
        gl.uniform2f(
          displayMaterial.uniforms["texelSize"],
          1.0 / width,
          1.0 / height
        );
      gl.uniform1i(displayMaterial.uniforms["uTexture"], dye.read.attach(0));
      blitFn(target);
    }

    // Initialize everything
    updateKeywords();
    initFramebuffers();
    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;

    function updateFrame() {
      const dt = calcDeltaTime();
      if (resizeCanvas()) initFramebuffers();
      updateColors(dt);
      applyInputs();
      step(dt);
      render(null);
      requestAnimationFrame(updateFrame);
    }

    // Event listeners
    window.addEventListener("mousedown", (e) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY, canvas.width, canvas.height);
      clickSplat(pointer);
    });

    document.body.addEventListener(
      "mousemove",
      function handleFirstMouseMove(e) {
        let pointer = pointers[0];
        let posX = scaleByPixelRatio(e.clientX);
        let posY = scaleByPixelRatio(e.clientY);
        let color = generateColor();
        updateFrame(); // start animation loop
        updatePointerMoveData(pointer, posX, posY, color, canvas.width, canvas.height);
        document.body.removeEventListener("mousemove", handleFirstMouseMove);
      }
    );

    window.addEventListener("mousemove", (e) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      let color = pointer.color;
      updatePointerMoveData(pointer, posX, posY, color, canvas.width, canvas.height);
    });

    document.body.addEventListener(
      "touchstart",
      function handleFirstTouchStart(e) {
        const touches = e.targetTouches;
        let pointer = pointers[0];
        for (let i = 0; i < touches.length; i++) {
          let posX = scaleByPixelRatio(touches[i].clientX);
          let posY = scaleByPixelRatio(touches[i].clientY);
          updateFrame(); // start animation loop
          updatePointerDownData(pointer, touches[i].identifier, posX, posY, canvas.width, canvas.height);
        }
        document.body.removeEventListener("touchstart", handleFirstTouchStart);
      }
    );

    window.addEventListener("touchstart", (e) => {
      const touches = e.targetTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointer, touches[i].identifier, posX, posY, canvas.width, canvas.height);
      }
    });

    window.addEventListener(
      "touchmove",
      (e) => {
        const touches = e.targetTouches;
        let pointer = pointers[0];
        for (let i = 0; i < touches.length; i++) {
          let posX = scaleByPixelRatio(touches[i].clientX);
          let posY = scaleByPixelRatio(touches[i].clientY);
          updatePointerMoveData(pointer, posX, posY, pointer.color, canvas.width, canvas.height);
        }
      },
      false
    );

    window.addEventListener("touchend", (e) => {
      const touches = e.changedTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        updatePointerUpData(pointer);
      }
    });

    updateFrame();
    
    // Cleanup function
    return () => {
      window.removeEventListener("mousedown", () => {});
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("touchstart", () => {});
      window.removeEventListener("touchmove", () => {});
      window.removeEventListener("touchend", () => {});
    };
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  ]);

  return (
    <div className="fixed top-0 left-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} id="fluid" className="w-screen h-screen" />
    </div>
  );
}
