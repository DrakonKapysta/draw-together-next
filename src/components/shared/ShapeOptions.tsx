import { cn } from "@/lib/utils";
import { Shape, ShapeStyle } from "@/types/Shapes";

import { useState } from "react";
import { Layers } from "./Layers";
import ShapeActions from "./ShapeActions";

interface ShapeOptionsProps {
  style: ShapeStyle;
  onApplyStyles: (styles: Partial<ShapeStyle>) => void;
  activeShapes: Shape[];
}

const strokeColors = ["#ffffff", "#ff8383", "#3a994c", "#56a2e8"];
const backgroundColors = [...strokeColors, "transparent"];
const cornerRadius = [0, 5, 10];

export const ShapeOptions = ({
  style,
  onApplyStyles,
  activeShapes,
}: ShapeOptionsProps) => {
  const [activeButton, setActiveButton] = useState<{
    defaultCssProp: string;
    index: number;
  } | null>(null);

  const clickButtonHandler = (
    activeButton: {
      defaultCssProp: string;
      index: number;
    },
    styles: Partial<ShapeStyle>
  ) => {
    onApplyStyles(styles);
    setActiveButton(activeButton);
  };

  const options: {
    title: string;
    options: ShapeStyle[keyof ShapeStyle][];
    key: keyof ShapeStyle;
    type: "color" | "text";
    defaultCssProp: string;
  }[] = [
    {
      title: "Background",
      options: backgroundColors,
      key: "fill",
      type: "color",
      defaultCssProp: "backgroundColor",
    },
    {
      title: "Stroke",
      options: strokeColors,
      key: "stroke",
      type: "color",
      defaultCssProp: "borderColor",
    },
    {
      title: "Corner radius",
      options: cornerRadius,
      key: "cornerRadius",
      type: "text",
      defaultCssProp: "borderRadius",
    },
  ];
  return (
    <aside className="absolute top-1/2 -translate-y-1/2 left-2 rounded z-30 bg-[#232329] max-w-44 px-3 py-2">
      <section className="flex flex-col gap-2">
        {options.map((option) => (
          <div key={option.title}>
            <b className="text-white mb-2 block">{option.title}</b>
            <div className="flex gap-2">
              {option.options.map((opt, index) => (
                <button
                  key={index}
                  style={{
                    backgroundColor: `${opt}50`,
                    borderColor:
                      activeButton?.defaultCssProp === option.defaultCssProp &&
                      activeButton.index === index
                        ? "white"
                        : "",
                    [option.defaultCssProp]: opt === "transparent" ? "" : opt,
                  }}
                  className={cn(
                    `min-w-6 min-h-6 rounded border `,
                    `${opt === "transparent" && "transparent-background"}`
                  )}
                  onClick={() =>
                    clickButtonHandler(
                      { index, defaultCssProp: option.defaultCssProp },
                      { [option.key]: opt }
                    )
                  }
                ></button>
              ))}
            </div>
          </div>
        ))}
        <Layers activeShapes={activeShapes} />
        <ShapeActions />
      </section>
    </aside>
  );
};
