import { useCanvasStore } from "@/stores/CanvasStore";
import { Trash2 } from "lucide-react";
import React from "react";

export default function ShapeActions() {
  const { deleteSelectedShapes } = useCanvasStore((state) => state);

  const shapeActions = [
    {
      icon: <Trash2 size={18} color="white" />,
      action: deleteSelectedShapes,
    },
  ];

  return (
    <div>
      <b className="text-white mb-2 block">Actions</b>
      <div className="flex gap-2">
        {shapeActions.map((shapeAction, index) => (
          <button
            key={index}
            onClick={() => shapeAction.action()}
            className={`max-w-7 min-h-7 w-full flex justify-center items-center rounded bg-[#2f2e38] hover:bg-[#363541]`}
          >
            {shapeAction.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
