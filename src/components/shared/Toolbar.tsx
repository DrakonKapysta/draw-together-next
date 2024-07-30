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
  },
  {
    id: Tools.MousePointer,
    icon: <MousePointer size={18} color="white" />,
  },
  {
    id: Tools.Rectangle,
    icon: <Square size={18} color="white" />,
  },
  {
    id: Tools.Circle,
    icon: <Circle size={18} color="white" />,
  },
  {
    id: Tools.Line,
    icon: <Minus size={18} color="white" />,
  },
  {
    id: Tools.Pencil,
    icon: <Pencil size={18} color="white" />,
  },
  {
    id: Tools.Text,
    icon: <LetterText size={18} color="white" />,
  },
];

export default function Toolbar({ className }: { className?: string }) {
  const { currentTool, changeTool } = useTool();

  return (
    <menu className={cn("flex items-center h-12 pl-16", className)}>
      <div className="flex items-center justify-center gap-2 h-full rounded-lg bg-[#232329] px-4">
        {options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => changeTool(option.id)}
            className={cn(
              "flex items-center justify-center h-10 w-10 rounded-lg border-solid relative",
              currentTool === option.id ? "bg-[#403E6A]" : "hover:bg-[#31303B]"
            )}
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
