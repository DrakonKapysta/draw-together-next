import { ShapeType } from "@/types/Shapes";
import Konva from "konva";

export default function (node: Konva.Node) {
  const transform = node.getTransform();

  switch (node.attrs.type) {
    case ShapeType.CIRCLE:
      const point = node.getAbsolutePosition();

      console.log(point);

      return { x: point.x, y: point.y };
      break;

    case ShapeType.RECTANGLE:
      const { x, y } = node.getAbsolutePosition();
      return { x, y };

    case ShapeType.LINE:
      if (node.attrs.points.length === 4) {
        const firstPoint = transform.point({
          x: (node as Konva.Line).points()[0],
          y: (node as Konva.Line).points()[1],
        });
        const secondPoint = transform.point({
          x: (node as Konva.Line).points()[2],
          y: (node as Konva.Line).points()[3],
        });
        return {
          transformedPoints: [
            firstPoint.x,
            firstPoint.y,
            secondPoint.x,
            secondPoint.y,
          ],
        };
      } else {
        const firstPoint = transform.point({
          x: (node as Konva.Line).points()[0],
          y: (node as Konva.Line).points()[1],
        });

        return {
          transformedPoints: [firstPoint.x, firstPoint.y],
        };
      }
      break;
  }
}
