import { ShapeStyle, ShapeType, Tools } from "@/types/Shapes";
import { RectStyles } from "../components/shared/RectStyles";
import { CommonStyles } from "@/components/shared/CommonStyles";

export default function renderShapeStyles(
  shapeType: ShapeType | null,
  tool: Tools,
  onClick: (styles: Partial<ShapeStyle>) => void
) {
  if ((tool === Tools.MousePointer || tool === Tools.Grab) && !shapeType) {
    return null;
  }

  switch (shapeType || tool) {
    case ShapeType.COMMON:
      return <CommonStyles onClick={onClick} />;
    case ShapeType.RECTANGLE:
      return <RectStyles onClick={onClick} />;
    case ShapeType.LINE:
      return null;
    case Tools.Rectangle:
      return <RectStyles onClick={onClick} />;
    case Tools.Circle:
      return null;
    case Tools.Line:
      return null;
    case Tools.Pencil:
      return null;
    default:
      return null;
  }
}
