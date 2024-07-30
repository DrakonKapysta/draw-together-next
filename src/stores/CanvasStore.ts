import { produce } from "immer";
import { create } from "zustand";

interface CanvasState {
  currentTool: string;
  changeTool: (tool: string) => void;
}

export const useCanvasStore = create<CanvasState>()((set) => ({
  currentTool: "MousePointer",
  changeTool: (tool: string) =>
    set(
      produce((state) => {
        return { currentTool: tool };
      })
    ),
}));
