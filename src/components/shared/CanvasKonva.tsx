"use client";
import { useGrabbing } from "@/hooks/useGrabbing";
import { useMouseArea } from "@/hooks/useMouseArea";
import { useStageScale } from "@/hooks/useStageScale";
import { useTool } from "@/hooks/useTool";
import { cn } from "@/lib/utils";
import { useCanvasStore } from "@/stores/CanvasStore";
import { Shape, ShapeStyle, Tools } from "@/types/Shapes";
import { useEffect, useMemo, useState } from "react";
import { Stage, Layer, Circle, Text, Rect } from "react-konva";
import { Shapes } from "./Shapes";
import { KonvaEventObject } from "konva/lib/Node";
import { isShapeSelection, SelectionBox } from "@/lib/isShapeSelection";
import { ShapeOptions } from "./ShapeOptions";

function CanvasKonva(props: any) {
  const [defaultStyle, setDefaultStyle] = useState<ShapeStyle>({
    fill: "transparent",
    stroke: "white",
    strokeWidth: 1,
    fontSize: 20,
    cornerRadius: 10,
  });
  const {
    currentTool,
    shapes,
    addShape,
    selectShape,
    setShapes,
    selectShapesInArea,
  } = useCanvasStore((state) => state);
  const { isGrabbing } = useGrabbing(currentTool);
  const { handleMouseWheel, stagePos, stageScale } = useStageScale();

  const appendShape = (shape: Shape) => {
    addShape(shape);
  };

  const { previewLayerRef, selectedArea, ...handlers } = useMouseArea({
    defaultStyle,
    tool: currentTool,
    appendShape,
    selectShape,
    selectShapesInArea,
  });

  const onApplyStyles = (style: Partial<ShapeStyle>) => {
    setShapes(
      shapes.map((shape) => (shape.selected ? { ...shape, ...style } : shape))
    );
  };

  const activeShapes = useMemo(
    () => shapes.filter((shape) => shape.selected),
    [shapes]
  );

  const handleShapeDragEnd = (e: KonvaEventObject<MouseEvent>) => {
    const shapeId = e.target.attrs.id;

    setShapes(
      shapes.map((shape) => {
        if (shape.id === shapeId) {
          return { ...shape, x: e.target.x(), y: e.target.y() };
        }
        return shape;
      })
    );
  };

  return (
    <>
      {activeShapes.length > 0 && (
        <ShapeOptions
          activeShapes={activeShapes}
          onApplyStyles={onApplyStyles}
          style={defaultStyle}
        />
      )}
      <Stage
        {...stagePos}
        scale={{ x: stageScale, y: stageScale }}
        width={window.innerWidth}
        height={window.innerHeight}
        draggable={currentTool === Tools.Grab}
        onWheel={handleMouseWheel}
        className={cn(
          "cursor-auto",
          `${currentTool === Tools.Grab && "cursor-grab"}`,
          `${isGrabbing && "cursor-grabbing"}`
        )}
        {...handlers}
      >
        <Layer>
          <Shapes
            onDragEnd={handleShapeDragEnd}
            currentTool={currentTool}
            shapes={shapes}
          />
        </Layer>
        <Layer>
          {
            /* Selection Layer */ selectedArea.visible && (
              <Rect
                {...selectedArea}
                opacity={0.3}
                fill="aqua"
                stroke={"blue"}
                strokeWidth={1}
              />
            )
          }
        </Layer>
        <Layer ref={previewLayerRef}>{/* Preview Layer */}</Layer>
      </Stage>
    </>
  );
}

export default CanvasKonva;
