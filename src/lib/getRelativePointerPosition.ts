import Konva from "konva";

export const getRelativePointerPosition = (stage: Konva.Stage | null) => {
  if (!stage) {
    return {
      x: 0,
      y: 0,
    };
  }
  const pointerPosition = stage.getPointerPosition();

  let relativeX = 0;
  let relativeY = 0;
  if (pointerPosition) {
    relativeX = (pointerPosition.x - stage.x()) / stage.scaleX();
    relativeY = (pointerPosition.y - stage.y()) / stage.scaleY();
  }

  return { x: relativeX, y: relativeY };
};
