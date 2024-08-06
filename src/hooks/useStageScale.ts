import { KonvaEventObject } from "konva/lib/Node";
import { useCallback, useState } from "react";

const SCALE_BORDER = { min: 0.1, max: 2 };
const SCALE_SPEED = 1.05;

function getLimitedScale(currScale: number, min: number, max: number) {
  return Math.max(min, Math.min(max, currScale));
}

export const useStageScale = () => {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState(1);

  const handleMouseWheel = useCallback((e: KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    if (!stage) return;

    const oldScale = stage.scaleX();

    const pointerPosition = stage.getPointerPosition();

    if (!pointerPosition) return;

    const mousePointTo = {
      x: (pointerPosition.x - stage.x()) / oldScale,
      y: (pointerPosition.y - stage.y()) / oldScale,
    };

    const newScale =
      e.evt.deltaY > 0 ? oldScale * SCALE_SPEED : oldScale / SCALE_SPEED;

    const finalScale = getLimitedScale(
      newScale,
      SCALE_BORDER.min,
      SCALE_BORDER.max
    );

    setStageScale(finalScale);
    setStagePos({
      x: pointerPosition.x - mousePointTo.x * finalScale,
      y: pointerPosition.y - mousePointTo.y * finalScale,
    });
  }, []);

  return {
    stagePos,
    stageScale,
    handleMouseWheel,
  };
};
