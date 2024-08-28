import { getLayeringActions } from "@/lib/commonShapeActions";
import { getNewSelectedAreaSize } from "@/lib/getNewSelectedAreaSize";
import { getRelativePointerPosition } from "@/lib/getRelativePointerPosition";
import { SelectionBox } from "@/lib/isShapeSelection";
import {
  CircleHelper,
  LineHelper,
  PencilHelper,
  RectHelper,
} from "@/lib/shapeHelpers";
import { ShapeSizing } from "@/lib/shapeSizing";
import { useCanvasStore } from "@/stores/CanvasStore";
import { Shape, ShapeStyle, ShapeType, Tools } from "@/types/Shapes";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
interface MouseAreaProps {
  defaultStyle: ShapeStyle;
  tool: Tools;
  appendShape: (shape: Shape) => void;
  selectShape: (id: string) => void;
  unselectShapes: () => void;
  selectShapesInArea: (SelectionBox: SelectionBox) => void;
}

const initialSelectedArea = {
  visible: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  startX: 0,
  startY: 0,
};

export const useMouse = ({
  defaultStyle,
  tool,
  appendShape,
  selectShape,
  selectShapesInArea,
}: MouseAreaProps) => {
  const [selectedArea, setSelectedArea] = useState<any>(initialSelectedArea);
  const shapePreview = useRef<any>(null);
  const previewLayerRef = useRef<Konva.Layer | null>(null);
  const mouseDown = useRef(false);
  const shapesSelecting = useRef(false);
  const groupRef = useRef<Konva.Group | null>(null);
  const {
    shapes,
    deleteSelectedShapes,
    deleteShape,
    selectedShapesCount,
    isGroup,
    setIsGroup,
    setShapes,
    unselectShapes,
    resetSelectedShapesCount,
  } = useCanvasStore((state) => state);

  const onMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    mouseDown.current = true;

    if (tool === Tools.Grab) return;

    const stage = event.target.getStage();
    if (!stage) {
      return;
    }

    //const pointerPosition = stage.getRelativePointerPosition(); // relative pointer position
    const { x, y } = getRelativePointerPosition(stage);

    switch (tool) {
      case Tools.Rectangle:
        const rect = RectHelper.createRect({ x, y }, 0, 0, defaultStyle);

        if (rect) {
          previewLayerRef.current?.add(new Konva.Rect(rect));
          shapePreview.current = rect;
        }

        break;
      case Tools.Circle:
        const circle = CircleHelper.createCircle({ x, y }, 0, 0, defaultStyle);

        if (circle) {
          previewLayerRef.current?.add(new Konva.Ellipse(circle));
          shapePreview.current = circle;
        }

        break;

      case Tools.Pencil:
        const line = PencilHelper.createPencil({ x, y }, defaultStyle);

        if (line) {
          previewLayerRef.current?.add(new Konva.Line(line));
          shapePreview.current = line;
        }

        break;

      case Tools.Line:
        const simpleLine = LineHelper.createLine({ x, y }, defaultStyle);

        if (simpleLine) {
          previewLayerRef.current?.add(new Konva.Line(simpleLine));
          shapePreview.current = simpleLine;
        }

        break;

      case Tools.MousePointer:
        if (event.target !== stage) {
          const children = groupRef.current?.getChildren();
          const ids = children?.map((child: any) => child.attrs.id);

          if (ids?.includes(event.target.attrs.id) && isGroup) {
            return;
          } else if (isGroup) {
            const children = groupRef.current?.getChildren();

            groupRef.current?.destroyChildren();

            const newShapes = children?.map((child: any) => {
              const {
                shadowBlur,
                shadowColor,
                shadowOpacity,
                ...initialAttrs
              } = child.attrs;
              const newId = uuidv4();

              const actions = {
                ...getLayeringActions(stage, newId),
              };

              return {
                ...initialAttrs,
                x: initialAttrs.x + groupRef.current?.x(),
                y: initialAttrs.y + groupRef.current?.y(),
                ...actions,
                id: newId,
              };
            });

            deleteSelectedShapes();

            setIsGroup(false);

            if (!newShapes) return;

            for (const newShape of newShapes) {
              appendShape(newShape);
            }

            groupRef.current?.x(0);
            groupRef.current?.y(0);
            resetSelectedShapesCount();
          }
          selectShape(event.target.attrs.id);
        } else {
          if (isGroup) {
            // Group remove selection logic
            const children = groupRef.current?.getChildren();

            groupRef.current?.destroyChildren();

            const newShapes = children?.map((child: any) => {
              const {
                shadowBlur,
                shadowColor,
                shadowOpacity,
                ...initialAttrs
              } = child.attrs;
              const newId = uuidv4();

              const actions = {
                ...getLayeringActions(stage, newId),
              };

              return {
                ...initialAttrs,
                x: initialAttrs.x + groupRef.current?.x(),
                y: initialAttrs.y + groupRef.current?.y(),
                ...actions,
                id: newId,
              };
            });

            deleteSelectedShapes();

            setIsGroup(false);

            if (!newShapes) return;

            for (const newShape of newShapes) {
              appendShape(newShape);
            }

            groupRef.current?.x(0);
            groupRef.current?.y(0);
            resetSelectedShapesCount();
          }
          // Default selection logic
          shapesSelecting.current = true;
          unselectShapes();
          const selectionBox = RectHelper.createRect({ x, y }, 0, 0, {
            visible: true,
          });
          if (selectionBox) {
            setSelectedArea(selectionBox);
          }
        }
        break;
    }
  };

  const onMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (!mouseDown.current) {
      return;
    }

    if (tool === Tools.Grab) return;

    const stage = event.target.getStage();
    if (!stage) {
      return;
    }

    const { x, y } = getRelativePointerPosition(stage);

    const preview = previewLayerRef.current?.findOne(
      (node: Konva.Node) => node.attrs.id === shapePreview.current.id
    );

    switch (tool) {
      case Tools.Rectangle:
        const rect = RectHelper.updateRect(shapePreview.current, x, y);

        preview?.setAttrs(rect);

        shapePreview.current = rect;

        break;

      case Tools.Circle:
        const circle = CircleHelper.updateCircle(shapePreview.current, x, y);

        preview?.setAttrs(circle);

        shapePreview.current = circle;

        break;
      case Tools.Pencil:
        const line = PencilHelper.updatePencil(shapePreview.current, x, y);

        preview?.setAttrs(line);

        shapePreview.current = line;

        break;
      case Tools.Line:
        const simpleLine = LineHelper.updateLine(shapePreview.current, {
          x,
          y,
        });

        preview?.setAttrs(simpleLine);

        shapePreview.current = simpleLine;

        break;
      case Tools.MousePointer:
        if (shapesSelecting.current) {
          const selectionBox = RectHelper.updateRect(selectedArea, x, y);

          if (selectionBox) {
            setSelectedArea(selectionBox);
            selectShapesInArea(
              RectHelper.getRectPositionProperties(selectionBox)
            );
            if (selectedShapesCount > 1 && !isGroup) {
              // Grouping logic
              const selectedIds = shapes.map((shape) => {
                if (shape.selected) return shape.id;
              });

              let selectedShapes = [];
              const layer = groupRef.current?.getLayer();
              if (layer) {
                for (const id of selectedIds) {
                  const shape = layer.findOne(`#${id}`);
                  shape?.draggable(false);
                  if (shape) {
                    selectedShapes.push(shape);
                  }
                }
              }
              for (const shape of selectedShapes) {
                groupRef.current?.add(shape);
              }
            }
          }
        }
        break;
    }
  };

  const onMouseUp = (event: KonvaEventObject<MouseEvent>) => {
    mouseDown.current = false;

    if (tool === Tools.Grab) return;
    if (tool === Tools.MousePointer) {
      setSelectedArea(initialSelectedArea);
      shapesSelecting.current = false;
      if (selectedShapesCount > 1 && !isGroup) {
        setIsGroup(true);
      }
    }

    const shape = shapePreview.current;

    if (!shape) return;

    const shapeToEdit = previewLayerRef.current?.findOne(`#${shape.id}`);

    const stage = event.target.getStage();

    if (!stage) {
      return;
    }

    const actions = {
      ...getLayeringActions(stage, shape.id),
    };

    shapeToEdit?.destroy(); // remove shape after getStage cause if stage was deleted before getStage func it will return
    // null, so !stage check will return function and won't appendShape.

    previewLayerRef.current?.batchDraw();

    appendShape({ ...shape, ...actions });

    shapePreview.current = null;
  };

  return {
    selectedArea,
    previewLayerRef,
    groupRef,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
};
