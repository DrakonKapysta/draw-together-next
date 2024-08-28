import Konva from "konva";

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
  GROUP = "GROUP",
}

export interface Placement2D {
  x: number;
  y: number;
}

export interface NodeOptions {
  moveToTop: () => void;
  moveToBottom: () => void;
  moveUp: () => void;
  moveDown: () => void;
}

export interface Size2D {
  width: number;
  height: number;
}

export interface CommonShape extends Placement2D, NodeOptions {
  id: string;
  selected?: boolean;
  type: ShapeType;
  startX: number;
  startY: number;
}

export interface ShapeStyle {
  fill: string;
  stroke: string;
  strokeWidth: number;
  cornerRadius?: number;
  text?: string;
  fontSize?: number;
}

export interface Rectangle extends CommonShape, Size2D, ShapeStyle {
  type: ShapeType.RECTANGLE;
}

export interface Circle extends CommonShape, ShapeStyle {
  type: ShapeType.CIRCLE;
  radiusX: number;
  radiusY: number;
}

export interface Line extends CommonShape, ShapeStyle {
  type: ShapeType.LINE;
  points: number[];
}

export interface Text extends CommonShape, ShapeStyle {
  type: ShapeType.TEXT;
  text: string;
}

export interface Group extends CommonShape {
  groupShapes: Shape[];
}

export type Shape = Rectangle | Circle | Line | Text;
