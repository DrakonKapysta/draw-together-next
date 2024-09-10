import { cn } from "@/lib/utils";
import { ShapeStyle } from "@/types/Shapes";
import React from "react";

interface RectStylesProps {
  onClick: (styles: Partial<ShapeStyle>) => void;
}

const rectStyeOptions = [
  {
    title: "Background",
    style: "backgroundColor",
    canvasStyle: "fill",
    values: ["#ffffff", "#ff8383", "#3a994c", "#56a2e8", ""],
  },
  {
    title: "Corner Radius",
    style: "borderRadius",
    canvasStyle: "cornerRadius",
    values: [0, 5, 10, 15, 20],
  },
];

export const RectStyles: React.FC<RectStylesProps> = ({ onClick }) => {
  return (
    <>
      {rectStyeOptions.map((option, index) => {
        return (
          <div key={option.title}>
            <b className="text-white mb-2 block">{option.title}</b>
            <div className="flex gap-2">
              {option.values.map((value) => (
                <button
                  key={value + option.style}
                  style={{
                    [option.style]: value !== "" ? value : undefined,
                  }}
                  className={cn(
                    `min-w-6 min-h-6 rounded border `,
                    `${value === "" && "transparent-background"}`
                  )}
                  onClick={() => onClick({ [option.canvasStyle]: value })}
                ></button>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};
