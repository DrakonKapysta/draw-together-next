import { isShapeSelection, SelectionBox } from "@/lib/isShapeSelection";
import { Shape, Tools } from "@/types/Shapes";
import { produce } from "immer";
import { create } from "zustand";

interface CanvasState {
  shapes: Shape[];
  currentTool: Tools;
  changeTool: (tool: Tools) => void;
  setSelectedShape: () => void;
  unselectShape: () => void;
  addShape: (shape: Shape) => void;
  deleteShape: (id: string) => void;
  deleteSelectedShapes: () => void;
  setShapes: (shapes: Shape[]) => void;
  selectShape: (id: string) => void;
  selectShapesInArea: (selectionBox: SelectionBox) => void;
  isShapeSelected: boolean;
}

export const useCanvasStore = create<CanvasState>()((set) => ({
  shapes: [],
  currentTool: Tools.MousePointer,
  isShapeSelected: false,
  changeTool: (tool: Tools) =>
    set(
      produce((state) => {
        return { currentTool: tool };
      })
    ),
  setSelectedShape: () =>
    set(
      produce((state) => {
        return { isShapeSelected: true };
      })
    ),
  unselectShape: () =>
    set(
      produce((state) => {
        return { isShapeSelected: false };
      })
    ),
  setShapes: (shapes: Shape[]) => {
    set(
      produce((state) => {
        return { shapes: shapes };
      })
    );
  },
  addShape: (shape: Shape) => {
    set(
      produce((state) => {
        return { shapes: [...state.shapes, shape] };
      })
    );
  },
  deleteShape: (id: string) => {
    set(
      produce((state) => {
        return {
          shapes: state.shapes.filter((shape: Shape) => shape.id !== id),
        };
      })
    );
  },
  deleteSelectedShapes: () => {
    set(
      produce((state) => {
        return {
          shapes: state.shapes.filter((shape: Shape) => !shape.selected),
        };
      })
    );
  },
  selectShape(id: string) {
    set(
      produce((state) => {
        return {
          shapes: state.shapes.map((shape: Shape) => {
            return { ...shape, selected: shape.id === id };
          }),
        };
      })
    );
  },
  selectShapesInArea: (selectionBox: SelectionBox) => {
    set(
      produce((state) => {
        return {
          shapes: state.shapes.map((shape: Shape) => {
            return {
              ...shape,
              selected: isShapeSelection(shape, selectionBox),
            };
          }),
        };
      })
    );
  },
}));
