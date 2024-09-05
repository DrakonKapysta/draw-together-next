import {
  Circle,
  Line,
  Placement2D,
  Rectangle,
  Shape,
  Size2D,
} from "@/types/Shapes";

export type SelectionBox = Placement2D & Size2D;

export const isShapeSelection = (shape: Shape, selectionBox: SelectionBox) => {
  let x = 0;
  let y = 0;
  switch (shape.type) {
    case "LINE":
      x = (shape as Line).transformedPoints[0];
      y = (shape as Line).transformedPoints[1];
      break;
    case "RECTANGLE":
      x = (shape as Rectangle).x;
      y = (shape as Rectangle).y;
      break;
    case "CIRCLE":
      x = (shape as Circle).x;
      y = (shape as Circle).y;
      break;
  }

  return (
    x >= selectionBox.x &&
    x <= selectionBox.x + selectionBox.width &&
    y >= selectionBox.y &&
    y <= selectionBox.y + selectionBox.height
  );
};
