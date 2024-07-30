export enum Tools {
  Grab = "Grab",
  MousePointer = "MousePointer",
  Pencil = "Pencil",
  Circle = "Circle",
  Rectangle = "Rectangle",
  Text = "Text",
  Line = "Line",
}

export enum ShapeType {
  LINE = "LINE",
  CIRCLE = "CIRCLE",
  RECTANGLE = "RECTANGLE",
  TEXT = "TEXT",
}

export interface Placement2D {
  x: number;
  y: number;
}

export interface Size2D {
  width: number;
  height: number;
}

export interface CommonShape extends Placement2D {
  id: string;
  selected: boolean;
  type: ShapeType;
}

export interface Rectangle extends CommonShape, Size2D {
  type: ShapeType.RECTANGLE;
}

export interface Circle extends CommonShape {
  type: ShapeType.CIRCLE;
  radiusX: number;
  radiusY: number;
}

export interface Line extends CommonShape {
  type: ShapeType.LINE;
  points: number[];
}

export interface Text extends CommonShape {
  type: ShapeType.TEXT;
  text: string;
}

export type Shape = Rectangle | Circle | Line | Text;
