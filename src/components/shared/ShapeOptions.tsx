import { Shape, ShapeStyle, ShapeType, Tools } from "@/types/Shapes";

import { Layers } from "./Layers";
import ShapeActions from "./ShapeActions";
import Konva from "konva";
import { RectStyles } from "./RectStyles";
import React, { useEffect, useState } from "react";
import renderShapeStyles from "@/lib/renderShapeStyles";
import { CommonStyles } from "./CommonStyles";

interface ShapeOptionsProps {
  style: ShapeStyle;
  onApplyStyles: (styles: Partial<ShapeStyle>) => void;
  onStyleChange: (styles: Partial<ShapeStyle>) => void;
  groupRef: React.RefObject<Konva.Group>;
  activeShapes: Shape[];
  tool: Tools;
}

export const ShapeOptions = ({
  style,
  tool,
  onApplyStyles,
  onStyleChange,
  activeShapes,
  groupRef,
}: ShapeOptionsProps) => {
  const activeTypes = React.useRef<Set<ShapeType>>(new Set());

  useEffect(() => {
    activeTypes.current.clear();
    activeTypes.current.add(ShapeType.COMMON);

    activeShapes
      .map((s) => s.type)
      .forEach((t) => {
        activeTypes.current.add(t);
      });
  }, [activeShapes]);

  const clickButtonHandler = (styles: Partial<ShapeStyle>) => {
    onApplyStyles(styles);
    onStyleChange(styles);
  };

  return (
    <aside className="absolute top-1/2 -translate-y-1/2 left-2 rounded z-30 bg-[#232329] max-w-44 px-3 py-2">
      <section className="flex flex-col gap-2">
        {activeShapes.length > 0 ? (
          Array.from(activeTypes.current).map((type, index) => {
            return (
              <React.Fragment key={type + index}>
                {renderShapeStyles(type, tool, clickButtonHandler)}
              </React.Fragment>
            );
          })
        ) : (
          <React.Fragment>
            <CommonStyles onClick={clickButtonHandler} />
            {renderShapeStyles(null, tool, clickButtonHandler)}
          </React.Fragment>
        )}
        <Layers groupRef={groupRef} activeShapes={activeShapes} />
        <ShapeActions />
      </section>
    </aside>
  );
};
