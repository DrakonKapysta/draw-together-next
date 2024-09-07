import getShapeTransformedPoints from "@/lib/getShapeTransformedPoints";
import { RectHelper } from "@/lib/shapeHelpers";
import { useCanvasStore } from "@/stores/CanvasStore";
import { Shape, ShapeType, Tools } from "@/types/Shapes";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import React, { FC } from "react";
import { Ellipse, Line, Rect, Text, Group } from "react-konva";

interface ShapeProps {
  currentTool: Tools;
  shapes: Shape[];
  onDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
  className?: string;
  trRef?: React.RefObject<Konva.Transformer>;
}

export const Shapes: FC<ShapeProps> = ({
  shapes,
  currentTool,
  onDragEnd,
  trRef,
  className,
}) => {
  const updateShape = useCanvasStore((state) => state.updateShape);
  const options = {
    draggable: currentTool === Tools.MousePointer,
    onDragEnd,
  };
  return (
    <>
      {shapes.map((shape) => {
        const activeProps = shape.selected
          ? // ? { shadowColor: "red", shadowBlur: 20, shadowOpacity: 100 } can add some selections styles.
            {}
          : {};
        const props = { ...activeProps, ...shape, ...options };
        switch (shape.type) {
          case "LINE":
            return (
              <Line
                key={shape.id}
                className={className}
                {...props}
                hitStrokeWidth={20}
                x={shape.x}
                y={shape.y}
                onTransformStart={(e) => {}}
                onTransformEnd={(e) => {
                  const node = e.target;

                  const transformedPoints = getShapeTransformedPoints(node);

                  updateShape({
                    id: node.attrs.id,
                    ...transformedPoints,
                  });
                }}
              />
            );
          case ShapeType.CIRCLE:
            return (
              <Ellipse
                key={shape.id}
                className={className}
                {...props}
                radiusX={shape.radiusX}
                radiusY={shape.radiusY}
                height={shape.radiusY * 2}
                width={shape.radiusX * 2}
                onTransformEnd={(e) => {
                  const node = e.target;

                  const transformedPoints = getShapeTransformedPoints(node);
                  updateShape({
                    id: node.attrs.id,
                    ...transformedPoints,
                  });
                }}
              />
            );
          case "RECTANGLE":
            return (
              <Rect
                key={shape.id}
                className={className}
                {...props}
                hitFunc={RectHelper.createHitBox}
                onTransformEnd={(e) => {
                  const node = e.target;
                  updateShape({
                    ...node.attrs,
                  });
                }}
              />
            );
          case "TEXT":
            return <Text key={shape.id} className={className} {...props} />;
        }
      })}
    </>
  );
};
