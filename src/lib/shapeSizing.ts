import { Placement2D, Size2D } from "@/types/Shapes";

export class ShapeSizing {
  public static getRectSize({ height, width }: Size2D, { x, y }: Placement2D) {
    return { width, height, x: x - width / 2, y: y - height / 2 };
  }
  public static getElipseSize(
    { height, width }: Size2D,
    { x, y }: Placement2D
  ) {
    return { radiusX: width / 2, radiusY: height / 2, x, y };
  }
}
