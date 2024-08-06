import { Placement2D, Shape, Size2D } from "@/types/Shapes";

export type SelectionBox = Placement2D & Size2D;

export const isShapeSelection = (shape: Shape, selectionBox: SelectionBox) => {
  return (
    shape.x >= selectionBox.x &&
    shape.x <= selectionBox.x + selectionBox.width &&
    shape.y >= selectionBox.y &&
    shape.y <= selectionBox.y + selectionBox.height
  );
};
