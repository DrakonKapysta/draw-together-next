"use client";
import { useTool } from "@/hooks/useTool";
import { cn } from "@/lib/utils";
import { useCanvasStore } from "@/stores/CanvasStore";
import { Tools } from "@/types/Shapes";
import {
  Circle,
  MousePointer,
  Pencil,
  Square,
  LetterText,
  Hand,
  Minus,
} from "lucide-react";
import React from "react";

const options = [
  {
    id: Tools.Grab,
    icon: <Hand size={18} color="white" />,
    props: { disabled: false },
  },
  {
    id: Tools.MousePointer,
    icon: <MousePointer size={18} color="white" />,
    props: { disabled: false },
  },
  {
    id: Tools.Rectangle,
    icon: <Square size={18} color="white" />,
    props: { disabled: false },
  },
  {
    id: Tools.Circle,
    icon: <Circle size={18} color="white" />,
    props: { disabled: false },
  },
  {
    id: Tools.Line,
    icon: <Minus size={18} color="white" />,
    props: { disabled: false },
  },
  {
    id: Tools.Pencil,
    icon: <Pencil size={18} color="white" />,
    props: { disabled: false },
  },
];

export default function Toolbar({ className }: { className?: string }) {
  const { currentTool, changeTool, unselectShapes } = useTool();

  return (
    <menu
      className={cn(
        "absolute left-1/2 -translate-x-1/2 flex items-center h-12 pl-1 z-10",
        className
      )}
    >
      <div className="flex items-center justify-center gap-2 h-full rounded-lg bg-[#232329] px-4">
        {options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => {
              unselectShapes();
              changeTool(option.id);
            }}
            className={cn(
              `flex items-center justify-center h-10 w-10 rounded-lg border-solid relative ${
                option.props?.disabled && "opacity-50"
              }`,
              currentTool === option.id ? "bg-[#403E6A]" : "hover:bg-[#31303B]"
            )}
            {...option.props}
          >
            {option.icon}
            <span className="absolute right-1 bottom-1 text-xs/[10px] text-white/50">
              {index + 1}
            </span>
          </button>
        ))}
      </div>
    </menu>
  );
}
