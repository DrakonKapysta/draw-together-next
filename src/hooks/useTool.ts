import { useCanvasStore } from "@/stores/CanvasStore";
import { Tools } from "@/types/Shapes";
import { useEffect } from "react";

export const useTool = () => {
  const { currentTool, changeTool } = useCanvasStore((state) => state);
  useEffect(() => {
    console.log("Effect");

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "1":
          changeTool(Tools.Grab);
          break;
        case "2":
          changeTool(Tools.MousePointer);
          break;
        case "3":
          changeTool(Tools.Rectangle);
          break;
        case "4":
          changeTool(Tools.Circle);
          break;
        case "5":
          changeTool(Tools.Line);
          break;
        case "6":
          changeTool(Tools.Pencil);
          break;
        case "7":
          changeTool(Tools.Text);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return { currentTool, changeTool };
};
