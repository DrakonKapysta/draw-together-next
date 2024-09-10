import { cn } from "@/lib/utils";
import { ShapeStyle } from "@/types/Shapes";
import React from "react";

interface CommonStylesProps {
  onClick: (styles: Partial<ShapeStyle>) => void;
}

const commonStyeOptions = [
  {
    title: "Stroke",
    style: "borderColor",
    canvasStyle: "stroke",
    values: ["#ffffff", "#ff8383", "#3a994c", "#56a2e8"],
  },
  {
    title: "Stroke Width",
    style: "borderWidth",
    canvasStyle: "strokeWidth",
    values: [1, 5, 10, 15, 20],
  },
];

export const CommonStyles: React.FC<CommonStylesProps> = ({ onClick }) => {
  return (
    <>
      {commonStyeOptions.map((option, index) => {
        return (
          <div key={option.title}>
            <b className="text-white mb-2 block">{option.title}</b>
            <div className="flex gap-2">
              {option.values.map((value) => (
                <button
                  key={value + option.style}
                  style={{
                    [option.style]: value !== "" ? value : undefined,
                    borderWidth: option.style === "borderWidth" ? 2 : undefined,
                    opacity:
                      option.style === "borderWidth"
                        ? Number(value) / 15
                        : undefined,
                  }}
                  className={cn(
                    `min-w-6 min-h-6 rounded border `,
                    `${value === "" && "transparent-background"} ${
                      option.style === "borderWidth"
                        ? "rounded-sm min-h-1 min-w-6 bg-white"
                        : undefined
                    } `
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
