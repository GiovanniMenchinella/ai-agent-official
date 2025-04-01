
// WebGL context and rendering types
export type GLContext = WebGLRenderingContext | WebGL2RenderingContext;

export interface BackColor {
  r: number;
  g: number;
  b: number;
}

export interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: BackColor;
  TRANSPARENT?: boolean;
}

// Framebuffer and texture types
export interface FBO {
  texture: WebGLTexture | null;
  fbo: WebGLFramebuffer | null;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach: (id: number) => number;
}

export interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap: () => void;
}

export interface Material {
  vertexShader: WebGLShader;
  fragmentShaderSource: string;
  programs: any[];
  activeProgram: WebGLProgram | null;
  uniforms: Record<string, WebGLUniformLocation>;
  setKeywords: (keywords: string[]) => void;
  bind: () => void;
}

export interface Program {
  uniforms: Record<string, WebGLUniformLocation>;
  program: WebGLProgram;
  bind: () => void;
}

export interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: {r: number, g: number, b: number};
}
