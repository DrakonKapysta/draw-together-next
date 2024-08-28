import { useCanvasStore } from "@/stores/CanvasStore";
import { Tools } from "@/types/Shapes";
import { useEffect } from "react";

export const useTool = () => {
  const { currentTool, changeTool, unselectShapes } = useCanvasStore(
    (state) => state
  );
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "1":
          changeTool(Tools.Grab);
          break;
        case "2":
          changeTool(Tools.MousePointer);
          break;
        case "3":
          unselectShapes();
          changeTool(Tools.Rectangle);
          break;
        case "4":
          unselectShapes();
          changeTool(Tools.Circle);
          break;
        case "5":
          unselectShapes();
          changeTool(Tools.Line);
          break;
        case "6":
          unselectShapes();
          changeTool(Tools.Pencil);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return { currentTool, changeTool, unselectShapes };
};
