import { CircleHelper, RectHelper } from "@/lib/shapeHelpers";
import { useCanvasStore } from "@/stores/CanvasStore";
import { Line as LineType, Shape, ShapeType, Tools } from "@/types/Shapes";
import Konva from "konva";
import { Context } from "konva/lib/Context";
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
          ? // ? { shadowColor: "red", shadowBlur: 20, shadowOpacity: 100 }
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

                  const transform = node.getTransform();
                  const firstPoint = transform.point({
                    x: (node as Konva.Line).points()[0],
                    y: (node as Konva.Line).points()[1],
                  });
                  const secondPoint = transform.point({
                    x: (node as Konva.Line).points()[2],
                    y: (node as Konva.Line).points()[3],
                  });

                  updateShape({
                    id: shape.id,
                    x: 0,
                    y: 0,
                    points: [
                      firstPoint.x,
                      firstPoint.y,
                      secondPoint.x,
                      secondPoint.y,
                    ],
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
              />
            );
          case "RECTANGLE":
            return (
              <Rect
                key={shape.id}
                className={className}
                {...props}
                hitFunc={RectHelper.createHitBox}
              />
            );
          case "TEXT":
            return <Text key={shape.id} className={className} {...props} />;
        }
      })}
    </>
  );
};
