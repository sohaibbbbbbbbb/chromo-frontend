"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import LeftSideBar from "./left-side-bar";
import MainContainer from "./main-container";
import supabase from "@/lib/supabase-client";
import { Palette } from "@/types/project";

interface PlaygroundFinalProps {
  id: string;
}

export default function PlaygroundFinal({ id }: PlaygroundFinalProps) {
  const [palettes, setPalettes] = useState<Palette[]>([]);

  useEffect(() => {
    const fetchPalettes = async () => {
      console.log("testing 🔥🔥🔥");
      const { data, error } = await supabase
        .from("palettes")
        .select("*")
        .eq("project_id", id);

      if (!error && data) {
        setPalettes(data);
      }
    };

    if (!id) return;

    fetchPalettes();

    const channel = supabase
      .channel(`palettes:${id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "palettes",
          filter: `project_id=eq.${id}`,
        },
        () => {
          fetchPalettes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  if (palettes.length === 0) {
    return (
      <div className="flex h-screen">
        <AppSidebar />
        <LeftSideBar id={id} className="w-full" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-(--background-surface-secondary)">
      <div className="flex animate-slide-from-left">
        <AppSidebar />
        <LeftSideBar id={id} />
      </div>
      {/* Main Content Area */}
      <MainContainer id={id} />
    </div>
  );
}
