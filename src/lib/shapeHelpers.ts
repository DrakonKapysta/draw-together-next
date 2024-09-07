import {
  Circle,
  Line,
  Placement2D,
  Rectangle,
  ShapeStyle,
  ShapeType,
  Size2D,
} from "@/types/Shapes";
import Konva from "konva";
import { Context } from "konva/lib/Context";
import { Vector2d } from "konva/lib/types";
import { v4 as uuidv4 } from "uuid";

export class RectHelper {
  public static createRect(
    pointerPosition: Vector2d | null,
    width: number = 0,
    height: number = 0,
    defaultStyles?: ShapeStyle | { visible: boolean }
  ) {
    if (!pointerPosition) return;

    console.log(pointerPosition);

    return {
      ...defaultStyles,
      id: uuidv4(),
      x: pointerPosition.x,
      y: pointerPosition.y,
      width: width,
      height: height,
      startX: pointerPosition.x,
      startY: pointerPosition.y,
      type: ShapeType.RECTANGLE,
    };
  }
  public static updateRect(rect: Rectangle, x: number = 0, y: number = 0) {
    const prevStartX = rect.startX;
    const prevStartY = rect.startY;
    const { startX, startY } = rect;
    let width = Math.abs(x - prevStartX);
    let height = Math.abs(y - prevStartY);

    return {
      ...rect,
      x: x < prevStartX ? x : prevStartX,
      y: y < prevStartY ? y : prevStartY,
      width,
      height,
      startX,
      startY,
    };
  }

  public static createHitBox(context: Context, rect: Konva.Shape) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(rect.width(), 0);
    context.lineTo(rect.width(), rect.height());
    context.lineTo(0, rect.height());
    context.closePath();
    if (rect.hasFill()) {
      context.fillStrokeShape(rect);
    } else {
      rect.hitStrokeWidth(20);
      context.strokeShape(rect);
    }
  }

  public static getRectPositionProperties(rect: Placement2D & Size2D) {
    const { width, height, x, y } = rect;
    return { width, height, x, y };
  }
}

export class CircleHelper {
  public static createCircle(
    pointerPosition: Vector2d | null,
    radiusX: number = 0,
    radiusY: number = 0,
    defaultStyles: ShapeStyle
  ) {
    if (!pointerPosition) return;

    return {
      ...defaultStyles,
      id: uuidv4(),
      x: pointerPosition.x,
      y: pointerPosition.y,
      radiusX,
      radiusY,
      startX: pointerPosition.x,
      startY: pointerPosition.y,
      type: ShapeType.CIRCLE,
    };
  }

  public static updateCircle(circle: Circle, x: number = 0, y: number = 0) {
    const { startX, startY } = circle;

    let radiusX = Math.abs(x - startX);
    let radiusY = Math.abs(y - startY);

    return {
      ...circle,
      radiusX,
      radiusY,
      startX,
      startY,
    };
  }

  public static createHitBox(context: Context, circle: Konva.Shape) {
    context.beginPath();
    context.moveTo(0, 0);
    context.closePath();
    if (circle.hasFill()) {
      context.fillStrokeShape(circle);
    } else {
      circle.hitStrokeWidth(20);
      context.strokeShape(circle);
    }
  }
}

export class PencilHelper {
  public static createPencil(
    pointerPosition: Vector2d | null,
    defaultStyles: ShapeStyle
  ) {
    if (!pointerPosition) return;
    let x1 = pointerPosition.x,
      x2 = x1;
    let y1 = pointerPosition.y,
      y2 = y1;

    return {
      ...defaultStyles,
      id: uuidv4(),
      points: [x1, y1, x2, y2],
      strokeWidth: 5,
      LineCap: "round",
      stroke: "white",
      LineJoin: "round",
      type: ShapeType.LINE,
      tension: 0.5,
      x: 0,
      y: 0,
      transformedPoints: [x1, y1],
    };
  }

  public static updatePencil(line: Line, x: number = 0, y: number = 0) {
    const { points } = line;

    return {
      ...line,
      points: [...points, x, y],
    };
  }
}

export class LineHelper {
  public static createLine(
    pointerPosition: Vector2d | null,
    defaultStyles: ShapeStyle
  ) {
    if (!pointerPosition) return;
    const { x, y } = pointerPosition;
    console.log(x, y);

    return {
      ...defaultStyles,
      id: uuidv4(),
      oldId: null,
      points: [x, y, x, y],
      startX: x,
      startY: y,
      strokeWidth: 10,
      LineCap: "round",
      stroke: "white",
      LineJoin: "round",
      type: ShapeType.LINE,
      x: 0,
      y: 0,
      transformedX: 0,
      transformedY: 0,
      transformedPoints: [x, y, x, y],
    };
  }
  public static updateLine(line: Line, pointerPosition: Vector2d | null) {
    if (!pointerPosition) return;
    const { x, y } = pointerPosition;
    line.points[2] = x;
    line.points[3] = y;
    line.transformedPoints[2] = x;
    line.transformedPoints[3] = y;

    return {
      ...line,
    };
  }
}
