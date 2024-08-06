import { LayersOptions } from "@/types/Layers";
import { Shape } from "@/types/Shapes";

export function handleShapeLayering(
  shapes: Shape[] | undefined,
  layerOption: LayersOptions
) {
  shapes?.forEach((shape) => {
    shape[layerOption]();
  });
}
