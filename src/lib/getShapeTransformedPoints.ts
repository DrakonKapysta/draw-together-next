import { ShapeType } from "@/types/Shapes";
import Konva from "konva";

export default function (node: Konva.Node) {
  const transform = node.getTransform();
  let point = null;

  switch (node.attrs.type) {
    case ShapeType.GROUP:
      point = transform.getTranslation();
      return { x: point.x, y: point.y };
    case ShapeType.CIRCLE:
      point = transform.getTranslation();

      return { x: point.x, y: point.y };

    case ShapeType.RECTANGLE:
      const { x, y } = transform.getTranslation();
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
  }
}
