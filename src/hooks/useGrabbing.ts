import { Tools } from "@/types/Shapes";
import { useEffect, useState } from "react";

export const useGrabbing = (currentTool: string) => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (currentTool === Tools.Grab) {
        setIsGrabbing(true);
        e.preventDefault();
      }
    };
    const handleMouseUp = (e: MouseEvent) => {
      if (currentTool === Tools.Grab) {
        setIsGrabbing(false);
        e.preventDefault();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [currentTool]);

  return { isGrabbing };
};
