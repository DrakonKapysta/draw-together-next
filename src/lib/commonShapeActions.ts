import Konva from "konva";

export function getLayeringActions(stage: Konva.Stage, shapeId: string) {
  const moveToTop = () => {
    if (!stage) return;
    stage
      .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
      ?.moveToTop();
  };
  const moveToBottom = () => {
    if (!stage) return;
    stage
      .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
      ?.moveToBottom();
  };
  const moveUp = () => {
    if (!stage) return;
    stage.findOne((shape: Konva.Node) => shape.attrs.id === shapeId)?.moveUp();
  };
  const moveDown = () => {
    if (!stage) return;
    stage
      .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
      ?.moveDown();
  };

  return { moveToTop, moveToBottom, moveUp, moveDown };
}
