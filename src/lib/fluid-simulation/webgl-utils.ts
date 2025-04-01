
import { GLContext } from './types';

// Format support for WebGL
export interface FormatInfo {
  internalFormat: number;
  format: number;
}

export const getSupportedWebGLContext = (canvas: HTMLCanvasElement) => {
  const params = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  };
  
  // Try to get WebGL2 context first
  let gl = canvas.getContext("webgl2", params) as WebGL2RenderingContext | null;
  const isWebGL2 = !!gl;
  
  // Fall back to WebGL1 if WebGL2 is not available
  if (!isWebGL2) {
    gl = (canvas.getContext("webgl", params) ||
      canvas.getContext("experimental-webgl", params)) as WebGLRenderingContext | null;
  }
  
  if (!gl) {
    throw new Error("WebGL not supported");
  }

  let halfFloat;
  let supportLinearFiltering;
  let formatRGBA;
  let formatRG;
  let formatR;

  if (isWebGL2) {
    gl.getExtension("EXT_color_buffer_float");
    supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
    
    // Use proper WebGL2 constants
    const RGBA16F = 0x881A; // gl.RGBA16F
    const RG16F = 0x822F;   // gl.RG16F
    const R16F = 0x822D;    // gl.R16F
    const RG = 0x8227;      // gl.RG
    const RED = 0x1903;     // gl.RED
    const HALF_FLOAT = 0x140B; // gl.HALF_FLOAT
    
    formatRGBA = getSupportedFormat(gl, RGBA16F, gl.RGBA, HALF_FLOAT);
    formatRG = getSupportedFormat(gl, RG16F, RG, HALF_FLOAT);
    formatR = getSupportedFormat(gl, R16F, RED, HALF_FLOAT);
    halfFloat = HALF_FLOAT;
  } else {
    halfFloat = (gl.getExtension("OES_texture_half_float") as any)?.HALF_FLOAT_OES;
    supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
    
    formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloat);
    formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloat);
    formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloat);
  }
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType: halfFloat,
      supportLinearFiltering,
    },
  };
};

function getSupportedFormat(gl: GLContext, internalFormat: number, format: number, type: number): FormatInfo | null {
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
    // Constants for WebGL1/2
    const R16F = 0x822D;
    const RG16F = 0x822F;
    const RGBA16F = 0x881A;
    const RG = 0x8227;
    const RED = 0x1903;
    
    switch (internalFormat) {
      case R16F:
        return getSupportedFormat(gl, RG16F, RG, type);
      case RG16F:
        return getSupportedFormat(gl, RGBA16F, gl.RGBA, type);
      default:
        return null;
    }
  }
  return {
    internalFormat,
    format,
  };
}

function supportRenderTextureFormat(gl: GLContext, internalFormat: number, format: number, type: number): boolean {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    internalFormat,
    4,
    4,
    0,
    format,
    type,
    null
  );
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture as WebGLTexture,
    0
  );
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  return status === gl.FRAMEBUFFER_COMPLETE;
}

export function compileShader(gl: GLContext, type: number, source: string, keywords?: string[]) {
  source = addKeywords(source, keywords);
  const shader = gl.createShader(type) as WebGLShader;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    console.trace(gl.getShaderInfoLog(shader));
  return shader;
}

function addKeywords(source: string, keywords?: string[]) {
  if (!keywords) return source;
  let keywordsString = "";
  keywords.forEach((keyword) => {
    keywordsString += "#define " + keyword + "\n";
  });
  return keywordsString + source;
}

export function createProgram(gl: GLContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram() as WebGLProgram;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    console.trace(gl.getProgramInfoLog(program));
  return program;
}

export function getUniforms(gl: GLContext, program: WebGLProgram) {
  let uniforms: Record<string, WebGLUniformLocation> = {};
  let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < uniformCount; i++) {
    const uniformName = gl.getActiveUniform(program, i)?.name as string;
    uniforms[uniformName] = gl.getUniformLocation(program, uniformName) as WebGLUniformLocation;
  }
  return uniforms;
}

export function hashCode(s: string): number {
  if (s.length === 0) return 0;
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function scaleByPixelRatio(input: number): number {
  const pixelRatio = window.devicePixelRatio || 1;
  return Math.floor(input * pixelRatio);
}
