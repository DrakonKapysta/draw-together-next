"use client";
import dynamic from "next/dynamic";

const CanvasKonva = dynamic(() => import("./CanvasKonva"), {
  ssr: false,
});

export default function Canvas(props: any) {
  return <CanvasKonva {...props} />;
}
