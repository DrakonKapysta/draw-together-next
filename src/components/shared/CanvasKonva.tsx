"use client";
import { useGrabbing } from "@/hooks/useGrabbing";
import { useMouseArea } from "@/hooks/useMouseArea";
import { useStageScale } from "@/hooks/useStageScale";
import { useTool } from "@/hooks/useTool";
import { cn, getShapeRefsFromArray } from "@/lib/utils";
import { useCanvasStore } from "@/stores/CanvasStore";
import { Shape, ShapeStyle, ShapeType, Tools } from "@/types/Shapes";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Circle,
  Text,
  Rect,
  Group,
  Transformer,
} from "react-konva";
import { Shapes } from "./Shapes";
import { KonvaEventObject } from "konva/lib/Node";
import { isShapeSelection, SelectionBox } from "@/lib/isShapeSelection";
import { ShapeOptions } from "./ShapeOptions";
import { useMouse } from "@/hooks/useMouse";
import Konva from "konva";
import getShapeTransformedPoints from "@/lib/getShapeTransformedPoints";

function CanvasKonva(props: any) {
  const trRef = useRef<Konva.Transformer>(null);
  const [defaultStyle, setDefaultStyle] = useState<ShapeStyle>({
    fill: "",
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
    unselectShapes,
  } = useCanvasStore((state) => state);
  const { isGrabbing } = useGrabbing(currentTool);
  const { handleMouseWheel, stagePos, stageScale } = useStageScale();

  const appendShape = (shape: Shape) => {
    addShape(shape);
  };

  const { previewLayerRef, selectedArea, groupRef, ...handlers } = useMouse({
    defaultStyle,
    tool: currentTool,
    appendShape,
    selectShape,
    unselectShapes,
    selectShapesInArea,
  });

  const onApplyStyles = (style: Partial<ShapeStyle>) => {
    setShapes(
      shapes.map((shape) => (shape.selected ? { ...shape, ...style } : shape))
    );
  };

  const activeShapes = useMemo(() => {
    const active = shapes.filter((shape) => shape.selected);

    if (trRef.current && active.length > 0) {
      const layer = trRef.current.getLayer();

      trRef.current.nodes(getShapeRefsFromArray(active, layer));
      trRef.current.getLayer()?.batchDraw();
    } else if (trRef.current && active.length <= 0) {
      trRef.current.nodes([]);
      trRef.current.getLayer()?.batchDraw();
    }
    return active;
  }, [shapes]);

  const handleShapeDragEnd = (e: KonvaEventObject<MouseEvent>) => {
    const shapeId = e.target.attrs.id;

    setShapes(
      shapes.map((shape) => {
        if (shape.id === shapeId) {
          const points = getShapeTransformedPoints(e.target);
          return { ...shape, ...points }; //це повинен бути обєкт для універсальності!
        }
        return shape;
      })
    );
  };

  return (
    <>
      {(currentTool === Tools.MousePointer && activeShapes.length > 0) ||
      (currentTool !== Tools.MousePointer && currentTool !== Tools.Grab) ? (
        <ShapeOptions
          activeShapes={activeShapes}
          onApplyStyles={onApplyStyles}
          style={defaultStyle}
          onStyleChange={(style: Partial<ShapeStyle>) =>
            setDefaultStyle((styles) => ({ ...styles, ...style }))
          }
          groupRef={groupRef}
        />
      ) : (
        false
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
            trRef={trRef}
          />
          <Group ref={groupRef} draggable preventDefault></Group>

          <Transformer // можливо потрібно створити трансформер для кожної фігури в обєкті shapes.
            ref={trRef}
            flipEnabled={false}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                return oldBox;
              }
              return newBox;
            }}
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
