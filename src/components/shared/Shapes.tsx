import { Shape, Tools } from "@/types/Shapes";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import React, { FC } from "react";
import { Ellipse, Line, Rect, Text } from "react-konva";

interface ShapeProps {
  currentTool: Tools;
  shapes: Shape[];
  onDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
  className?: string;
}

export const Shapes: FC<ShapeProps> = ({
  shapes,
  currentTool,
  onDragEnd,
  className,
}) => {
  const options = {
    draggable: currentTool === Tools.MousePointer,
    onDragEnd,
  };
  return (
    <>
      {shapes.map((shape) => {
        const activeProps = shape.selected
          ? { shadowColor: "red", shadowBlur: 20, shadowOpacity: 100 }
          : {};
        const props = { ...activeProps, ...shape, ...options };
        switch (shape.type) {
          case "LINE":
            return (
              <Line
                key={shape.id}
                className={className}
                {...props}
                x={0}
                y={0}
              />
            );
          case "CIRCLE":
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
            return <Rect key={shape.id} className={className} {...props} />;
          case "TEXT":
            return <Text key={shape.id} className={className} {...props} />;
        }
      })}
    </>
  );
};
