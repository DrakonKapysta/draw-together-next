import { isShapeSelection, SelectionBox } from "@/lib/isShapeSelection";
import { Shape, Tools } from "@/types/Shapes";
import { produce } from "immer";
import { create } from "zustand";

interface CanvasState {
  shapes: Shape[];
  currentTool: Tools;
  changeTool: (tool: Tools) => void;
  setSelectedShape: () => void;
  unselectShapes: () => void;
  addShape: (shape: Shape) => void;
  deleteShape: (id: string) => void;
  deleteSelectedShapes: () => void;
  setShapes: (shapes: Shape[]) => void;
  selectShape: (id: string) => void;
  selectShapesInArea: (selectionBox: SelectionBox) => void;
  isShapeSelected: boolean;
  selectedShapesCount: number;
  isGroup: boolean;
  setIsGroup: (grouped: boolean) => void;
  updateShape: (shapeToUpdate: any) => void;
  resetSelectedShapesCount: () => void;
}

export const useCanvasStore = create<CanvasState>()((set) => ({
  shapes: [],
  currentTool: Tools.MousePointer,
  isShapeSelected: false,
  selectedShapesCount: 0,
  isGroup: false,
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
  setIsGroup: (grouped: boolean) => set({ isGroup: grouped }),
  unselectShapes: () =>
    set(
      produce((state: CanvasState) => {
        return {
          shapes: state.shapes.map((shape) => ({ ...shape, selected: false })),
        };
      })
    ),
  setShapes: (shapes: Shape[]) => {
    set(
      produce((state) => {
        return { shapes: shapes };
      })
    );
  },
  updateShape: (shapeToUpdate) => {
    set(
      produce((state: CanvasState) => {
        return {
          shapes: state.shapes.map((shape) => {
            if (shape.id !== shapeToUpdate.id) {
              return shape;
            }
          }),
        };
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

  deleteShapes: (ids: string[]) => {
    set(
      produce((state) => {
        return {
          shapes: state.shapes.filter(
            (shape: Shape) => !ids.includes(shape.id)
          ),
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
  resetSelectedShapesCount: () => {
    set({
      selectedShapesCount: 0,
    });
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
        let shapesCount = 0;
        return {
          shapes: state.shapes.map((shape: Shape) => {
            const selected = isShapeSelection(shape, selectionBox);

            if (selected) shapesCount++;

            return {
              ...shape,
              selected: selected,
            };
          }),
          selectedShapesCount: shapesCount,
        };
      })
    );
  },
}));
