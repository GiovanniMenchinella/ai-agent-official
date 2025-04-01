
import { Pointer } from './types';
import { generateColor } from './color-utils';
import { scaleByPixelRatio } from './webgl-utils';
import { correctDeltaX, correctDeltaY } from './color-utils';

export function updatePointerDownData(
  pointer: Pointer, 
  id: number, 
  posX: number, 
  posY: number,
  canvasWidth: number,
  canvasHeight: number
) {
  pointer.id = id;
  pointer.down = true;
  pointer.moved = false;
  pointer.texcoordX = posX / canvasWidth;
  pointer.texcoordY = 1.0 - posY / canvasHeight;
  pointer.prevTexcoordX = pointer.texcoordX;
  pointer.prevTexcoordY = pointer.texcoordY;
  pointer.deltaX = 0;
  pointer.deltaY = 0;
  pointer.color = generateColor();
}

export function updatePointerMoveData(
  pointer: Pointer, 
  posX: number, 
  posY: number,
  color: any,
  canvasWidth: number,
  canvasHeight: number
) {
  pointer.prevTexcoordX = pointer.texcoordX;
  pointer.prevTexcoordY = pointer.texcoordY;
  pointer.texcoordX = posX / canvasWidth;
  pointer.texcoordY = 1.0 - posY / canvasHeight;
  
  const aspectRatio = canvasWidth / canvasHeight;
  pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX, aspectRatio);
  pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY, aspectRatio);
  
  pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
  pointer.color = color;
}

export function updatePointerUpData(pointer: Pointer) {
  pointer.down = false;
}

export function pointerPrototype() {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: {r: 0, g: 0, b: 0}
  };
}
