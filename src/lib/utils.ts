import { Shape } from "@/types/Shapes";
import { type ClassValue, clsx } from "clsx";
import Konva from "konva";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getShapeRefsFromArray(
  shapes: Shape[],
  layer: Konva.Layer | null
) {
  const shapeRefs = [];
  for (const shapeProps of shapes) {
    const shape = layer?.findOne(`#${shapeProps.id}`);
    if (shape) shapeRefs.push(shape);
    console.log("refts", shapeRefs);
  }
  return shapeRefs;
}
