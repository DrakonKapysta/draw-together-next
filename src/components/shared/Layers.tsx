import { handleShapeLayering } from "@/lib/handleShapeLayering";
import { LayersOptions } from "@/types/Layers";
import { Shape } from "@/types/Shapes";
import Konva from "konva";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUp,
  ArrowUpFromLine,
} from "lucide-react";
import React, { FC } from "react";

interface LayerProps {
  activeShapes?: Shape[];
}

export const layerOptions = [
  {
    type: LayersOptions.BACKGROUND,
    icon: <ArrowDownToLine size={18} color="white" />,
  },
  {
    type: LayersOptions.BACK,
    icon: <ArrowDown size={18} color="white" />,
  },
  {
    type: LayersOptions.FORWARD,
    icon: <ArrowUp size={18} color="white" />,
  },
  {
    type: LayersOptions.FOREGROUND,
    icon: <ArrowUpFromLine size={18} color="white" />,
  },
];

export const Layers: FC<LayerProps> = ({ activeShapes }) => {
  const handleLayer = (layerOption: LayersOptions) => {
    handleShapeLayering(activeShapes, layerOption);
  };

  return (
    <div>
      <b className="text-white mb-2 block">Layers</b>
      <div className="flex gap-2">
        {layerOptions.map((opt, index) => (
          <button
            key={index}
            onClick={() => handleLayer(opt.type)}
            className={`max-w-7 min-h-7 w-full flex justify-center items-center rounded bg-[#2f2e38] hover:bg-[#363541]`}
          >
            {opt.icon}
          </button>
        ))}
      </div>
    </div>
  );
};
