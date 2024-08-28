import { LayersOptions } from "@/types/Layers";
import { Shape } from "@/types/Shapes";
import Konva from "konva";

export function handleShapeLayering(
  shapes: Shape[] | undefined,
  layerOption: LayersOptions
) {
  shapes?.forEach((shape) => {
    shape[layerOption]();
  });
}

export function handleGroupLayering(
  group: Konva.Group,
  layerOption: LayersOptions
) {
  group[layerOption]();
}
