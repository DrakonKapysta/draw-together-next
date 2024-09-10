"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import Loading from "./Loading";
import LoaderPortal from "./LoaderPortals";

const CanvasKonva = dynamic(() => import("./CanvasKonva"), {
  ssr: false,
  loading: () => (
    <LoaderPortal>
      <Loading />
    </LoaderPortal>
  ),
});

export default function Canvas(props: any) {
  useEffect(() => {
    document.body.classList.add("select-none");

    return () => {
      document.body.classList.remove("select-none");
    };
  }, []);

  return <CanvasKonva {...props} />;
}
