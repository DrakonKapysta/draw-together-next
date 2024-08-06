import { getNewSelectedAreaSize } from "@/lib/getNewSelectedAreaSize";
import { getRelativePointerPosition } from "@/lib/getRelativePointerPosition";
import { SelectionBox } from "@/lib/isShapeSelection";
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
  selectShapesInArea: (selectionBox: SelectionBox) => void;
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

export const useMouseArea = ({
  defaultStyle,
  tool,
  appendShape,
  selectShape,
  selectShapesInArea,
}: MouseAreaProps) => {
  const [selectedArea, setSelectedArea] = useState(initialSelectedArea);
  const shapePreview = useRef<Shape | null>(null);
  const previewLayerRef = useRef<Konva.Layer | null>(null);
  const mouseDown = useRef(false);
  const shapeDragging = useRef(false);

  const onMouseDown = useCallback(
    (event: KonvaEventObject<MouseEvent>) => {
      mouseDown.current = true;
      if (tool === Tools.Grab) return;
      const stage = event.target.getStage();
      if (!stage) return;

      const pointerPosition = getRelativePointerPosition(stage);

      if (event.target !== stage) {
        const shapeId = event.target.attrs.id;
        selectShape(shapeId);
        shapeDragging.current = true;
        return;
      } else {
        selectShape("");
      }

      const shapeId = uuidv4();

      if (!pointerPosition) return;

      if (tool === Tools.Text) {
        const shape: Shape = {
          type: ShapeType.TEXT,
          id: shapeId,
          x: pointerPosition.x,
          y: pointerPosition.y,
          ...defaultStyle,
          text: "Hello World",
          moveToTop: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveToTop();
          },
          moveToBottom: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveToBottom();
          },
          moveUp: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveUp();
          },
          moveDown: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveDown();
          },
        };
        appendShape(shape);
        return;
      }
      const selectedArea = {
        visible: true,
        width: 0,
        height: 0,
        startX: pointerPosition.x,
        startY: pointerPosition.y,
        x: pointerPosition.x,
        y: pointerPosition.y,
      };

      setSelectedArea(selectedArea);

      let shape: Shape | null = null;

      if (tool === Tools.Rectangle) {
        shape = {
          type: ShapeType.RECTANGLE,
          id: shapeId,
          ...defaultStyle,
          ...selectedArea,
          moveToTop: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveToTop();
          },
          moveToBottom: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveToBottom();
          },
          moveUp: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveUp();
          },
          moveDown: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveDown();
          },
        };
      }

      if (tool === Tools.Circle) {
        shape = {
          type: ShapeType.CIRCLE,
          id: shapeId,
          ...defaultStyle,
          radiusX: 0,
          radiusY: 0,
          ...pointerPosition,
          moveToTop: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveToTop();
          },
          moveToBottom: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveToBottom();
          },
          moveUp: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveUp();
          },
          moveDown: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveDown();
          },
        };
      }

      if (tool === Tools.Pencil) {
        shape = {
          type: ShapeType.LINE,
          id: shapeId,
          ...defaultStyle,
          points: [pointerPosition.x, pointerPosition.y],
          ...pointerPosition,
          moveToTop: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveToTop();
          },
          moveToBottom: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveToBottom();
          },
          moveUp: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveUp();
          },
          moveDown: () => {
            if (!stage) return;
            stage
              .findOne((shape: Konva.Node) => shape.attrs.id === shapeId)
              ?.moveDown();
          },
        };
      }

      if (!shape) return;
      shapePreview.current = shape;

      switch (tool) {
        case Tools.Rectangle:
          previewLayerRef.current?.add(new Konva.Rect(shape));
          break;
        case Tools.Circle:
          previewLayerRef.current?.add(
            new Konva.Ellipse({ ...shape, radiusX: 0, radiusY: 0 })
          );
          break;
        case Tools.Pencil:
          previewLayerRef.current?.add(
            new Konva.Line({ ...shape, x: 0, y: 0, width: 0, height: 0 })
          );
          break;
      }
    },
    [tool, selectedArea]
  );

  const onMouseMove = useCallback(
    (event: KonvaEventObject<MouseEvent>) => {
      if (!mouseDown.current || shapeDragging.current) return;

      const stage = event.target.getStage();
      if (!stage) return;

      const pointerPosition = getRelativePointerPosition(stage);

      if (!pointerPosition) return;

      const { height, width, x, y } = getNewSelectedAreaSize(pointerPosition, {
        x: selectedArea.startX,
        y: selectedArea.startY,
      });

      const shape = shapePreview.current;
      const shapeToEdit = previewLayerRef.current?.findOne(`#${shape?.id}`);

      const rectSelection = ShapeSizing.getRectSize(
        { height, width },
        { x, y }
      );

      if (tool === Tools.MousePointer) {
        setSelectedArea({ ...selectedArea, ...rectSelection });
        selectShapesInArea(rectSelection);
      }

      if (!shapeToEdit || !shape) return;

      if (tool === Tools.Rectangle) {
        shapeToEdit.setAttrs(rectSelection);
        shapePreview.current = { ...shape, ...rectSelection };
      }

      if (tool === Tools.Circle) {
        const circleSelection = ShapeSizing.getElipseSize(
          { height, width },
          { x, y }
        );
        shapeToEdit.setAttrs(circleSelection);
        shapePreview.current = { ...shape, ...circleSelection };
      }

      if (tool === Tools.Pencil && shape.type === ShapeType.LINE) {
        const points = shape.points.concat([
          pointerPosition.x,
          pointerPosition.y,
        ]);
        shape.points = points;
        shapeToEdit.setAttrs({ points });
      }

      previewLayerRef.current?.batchDraw();
    },
    [tool, selectedArea]
  );

  const onMouseUp = useCallback(
    (event: KonvaEventObject<MouseEvent>) => {
      mouseDown.current = false;
      shapeDragging.current = false;

      if (tool !== Tools.MousePointer && tool !== Tools.Grab) {
        const shape = shapePreview.current;
        if (!shape) return;
        const shapeToEdit = previewLayerRef.current?.findOne(`#${shape.id}`);
        shapeToEdit?.destroy();

        previewLayerRef.current?.batchDraw();

        appendShape(shape);
        shapePreview.current = null;
      }

      setSelectedArea(initialSelectedArea);
    },
    [tool, selectedArea]
  );

  return {
    selectedArea,
    previewLayerRef,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
};
