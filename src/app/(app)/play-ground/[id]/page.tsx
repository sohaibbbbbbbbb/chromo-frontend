"use client";

import { useParams } from "next/navigation";
import PlaygroundFinal from "@/components/playground-final";

export default function PlayGroundFinal() {
  const params = useParams();
  const id = params.id as string;

  return <PlaygroundFinal id={id} />;
}
