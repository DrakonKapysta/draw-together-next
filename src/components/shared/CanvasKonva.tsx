"use client";
import { useGrabbing } from "@/hooks/useGrabbing";
import { useTool } from "@/hooks/useTool";
import { cn } from "@/lib/utils";
import { useCanvasStore } from "@/stores/CanvasStore";
import { Tools } from "@/types/Shapes";
import { useEffect, useState } from "react";
import { Stage, Layer, Circle, Text } from "react-konva";

function CanvasKonva(props: any) {
  const currentTool = useCanvasStore((state) => state.currentTool);
  const { isGrabbing } = useGrabbing(currentTool);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={currentTool === Tools.Grab}
      className={cn(
        "cursor-auto",
        `${currentTool === Tools.Grab && "cursor-grab"}`,
        `${isGrabbing && "cursor-grabbing"}`
      )}
    >
      <Layer>
        <Text x={50} y={50} text="Hello World" fill={"green"} />
        <Circle x={210} y={100} radius={50} fill="red" />
        <Circle x={220} y={100} radius={50} fill="blue" />
        <Circle x={230} y={100} radius={50} fill="yellow" />
        <Circle x={240} y={100} radius={50} fill="green" />
      </Layer>
    </Stage>
  );
}

export default CanvasKonva;
