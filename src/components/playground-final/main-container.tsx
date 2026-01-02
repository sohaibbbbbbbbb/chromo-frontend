"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import supabase from "@/lib/supabase-client";
import PaletteActionBar from "./palette-action-bar";
import AddColor from "./add-color";
import DraggableColorSwatch from "./draggable-color-swatch";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ColorItem {
  hex: string;
  name: string;
  role: string;
}

interface Palette {
  id: string;
  project_id: string;
  version: number;
  colors: ColorItem[];
  created_at: string;
  is_favourite: number;
}

interface ColorPaletteUIProps {
  id: string;
}

const ColorPaletteUI: React.FC<ColorPaletteUIProps> = ({ id }) => {
  const [colors, setColors] = useState<ColorItem[]>([
    { hex: "#EA7AF4", name: "Primary", role: "primary" },
    { hex: "#B43E8F", name: "Secondary", role: "secondary" },
    { hex: "#6200B3", name: "Surface", role: "surface" },
    { hex: "#3B0086", name: "Background", role: "background" },
    { hex: "#290628", name: "Error", role: "error" },
  ]);
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchAllPalettes = async () => {
      const { data, error } = await supabase
        .from("palettes")
        .select("*")
        .eq("project_id", id)
        .order("version", { ascending: false });

      if (!error && data && data.length > 0) {
        setPalettes(data);
        setCurrentIndex(0);
        setColors(data[0].colors);
        setIsFavorite(data[0].is_favourite === 1);
      }
    };

    if (!id) return;

    // Initial fetch
    fetchAllPalettes();

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`palettes:${id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "palettes",
          filter: `project_id=eq.${id}`,
        },
        (payload) => {
          console.log("🎨 New palette inserted:", payload);
          // Refetch all palettes when new one is inserted
          fetchAllPalettes();
        }
      )
      .subscribe((status) => {
        console.log("📡 Realtime subscription status:", status);
        if (status === "SUBSCRIBED") {
          console.log(
            "✅ Successfully subscribed to palette changes for project:",
            id
          );
        } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.error("❌ Realtime subscription failed:", status);
        }
      });

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const currentPalette = palettes[currentIndex] || null;

  const goToPrevious = () => {
    if (currentIndex < palettes.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setColors(palettes[newIndex].colors);
      setIsFavorite(palettes[newIndex].is_favourite === 1);
    }
  };

  const goToNext = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setColors(palettes[newIndex].colors);
      setIsFavorite(palettes[newIndex].is_favourite === 1);
    }
  };

  const toggleFavorite = async () => {
    if (!currentPalette) return;

    const newFavoriteValue = isFavorite ? 0 : 1;
    setIsFavorite(!isFavorite);

    const { error } = await supabase
      .from("palettes")
      .update({ is_favourite: newFavoriteValue })
      .eq("id", currentPalette.id);

    if (error) {
      console.error("Error updating favorite:", error);
      setIsFavorite(isFavorite);
    } else {
      setPalettes((prev) =>
        prev.map((p) =>
          p.id === currentPalette.id
            ? { ...p, is_favourite: newFavoriteValue }
            : p
        )
      );
    }
  };

  const addColor = (afterIndex: number) => {
    if (colors.length >= 10) return;

    const newColor: ColorItem = {
      hex: "#000000",
      name: `Color ${colors.length + 1}`,
      role: "custom",
    };
    const newColors = [...colors];
    newColors.splice(afterIndex + 1, 0, newColor);
    setColors(newColors);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = active.id;
      const newIndex = over.id;
      const newColors = arrayMove(colors, oldIndex, newIndex);
      setColors(newColors);
    }
  };

  const [showForeground, setShowForeground] = useState(false);

  const sidebarIcons = [
    { Icon: "/svg/drag.svg", label: "Grid" },
    { Icon: "/svg/circle-color.svg", label: "Circle" },
    { Icon: "/svg/test-tube.svg", label: "Droplet" },
    { Icon: "/svg/edit.svg", label: "Edit" },
    { Icon: "/svg/filter-white.svg", label: "Share" },
    { Icon: "/svg/bookmark.svg", label: "Bookmark" },
    { Icon: "/svg/copy.svg", label: "Copy" },
    { Icon: "/svg/lock.svg", label: "Lock" },
    { Icon: "/svg/delete-white.svg", label: "Delete" },
  ];

  const v1First = [
    { Icon: "/svg/eye-circle.svg", label: "Accessibility" },
    { Icon: "/svg/reasoning.svg", label: "Reasoning" },
    { Icon: "/svg/luma.svg", label: "Luma" },
  ];

  const v1Second = [
    { Icon: "/svg/eye.svg", label: "View" },
    { Icon: "/svg/share.svg", label: "Export" },
    { Icon: "/svg/screen.svg", label: "Palettes" },
  ];

  return (
    <div className="flex-1 py-2.5 px-3 bg-(--background-surface-secondary)">
      {/* Main Container */}
      <div
        className="w-full h-[calc(100vh-20px)] bg-(--surface-primary) rounded-2xl shadow-lg animate-slide-from-bottom"
        style={{
          border: "1px solid var(--dairy-cream)",
          boxShadow: "3px 4px 6.8px 0 var(--dairy-cream-2)",
        }}
      >
        {/* Header */}
        <div className="p-6 pt-6.5  pb-3.25 border-b border-(--line) ">
          <div className="flex flex-wrap items-center justify-between animate-fade-in-delayed">
            <div className="flex items-center gap-6 text-black">
              <h1 className="text-(--main-color)  text-[18px] font-semibold leading-normal">
                V{currentPalette?.version || 1}
              </h1>
              <div className="flex items-center flex-wrap gap-4 text-sm">
                <button className="flex items-center gap-2 text-(--slider-list-2) text-[16px] font-normal leading-normal">
                  ADA Compliance
                </button>
                {v1First?.map((v1) => {
                  return (
                    <div className="flex items-center gap-1 text-(--slider-list) text-[16px] font-normal leading-normal">
                      <Image
                        src={v1?.Icon}
                        alt=""
                        width={400}
                        height={400}
                        className="w-3.5 h-3.5 mx-auto"
                      />
                      {v1?.label}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {v1Second?.map((v1) => {
                return (
                  <div className="flex items-center gap-2.5 text-(--slider-list-2)  text-[16px] font-normal leading-normal">
                    <Image
                      src={v1?.Icon}
                      alt=""
                      width={400}
                      height={400}
                      className="w-5 h-4 mx-auto"
                    />
                    {v1?.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Version 1 Palette Card */}
        <div className="p-8 h-[calc(100vh-100px)] w-full flex justify-center items-end  flex-wrap animate-fade-in-delayed">
          <div
            className="bg-(--surface-primary) rounded-lg overflow-hidden w-full"
            style={{
              border: "1px solid #EBEBEB",
              boxShadow: "1px 4px 15.6px 0 rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Card Header */}
            <div className="pt-4.5 px-7.5 pb-2.75 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600 ">
                <span className="text-(--grey-9)  text-[18px] font-medium leading-normal">
                  Version {currentPalette?.version || 1}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-(--grey-8)" />

                <span className="text-(--grey-8)  text-[16px] font-medium leading-normal">
                  {colors.length} colors
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-(--grey-8)" />

                <span className="text-(--grey-8)  text-[16px] font-medium leading-normal">
                  {currentPalette?.created_at
                    ? new Date(currentPalette.created_at).toLocaleDateString()
                    : "12/4/2025"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={toggleFavorite} className="cursor-pointer">
                  <Image
                    src={isFavorite ? "/svg/filled-star.svg" : "/svg/star.svg"}
                    alt="Favorite"
                    width={400}
                    height={400}
                    className="w-3.5 h-3.5 mx-auto"
                  />
                </button>
                <Image
                  src={"/svg/filter.svg"}
                  alt=""
                  width={400}
                  height={400}
                  className="w-3.5 h-3.5 mx-auto"
                />
                <div className="flex">
                  <button
                    onClick={goToPrevious}
                    disabled={currentIndex >= palettes.length - 1}
                    className="flex flex-col w-6 h-7 p-1 justify-center items-center gap-2.5 border border-[#E7E7E7] bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Image
                      src="/svg/undo.svg"
                      alt="Previous version"
                      width={400}
                      height={400}
                      className="w-3.5 h-3.5 mx-auto"
                    />
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={currentIndex === 0}
                    className="flex flex-col w-6 h-7 p-1 justify-center items-center gap-2.5 border border-[#E7E7E7] bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Image
                      src="/svg/undo.svg"
                      alt="Next version"
                      width={400}
                      height={400}
                      className="w-3.5 h-3.5 mx-auto scale-x-[-1]"
                    />
                  </button>
                </div>
                <div className="p-2">
                  <Image
                    src={"/svg/menu.svg"}
                    alt=""
                    width={400}
                    height={400}
                    className="w-3.5 h-3.5  mx-auto"
                  />
                </div>
              </div>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="flex px-7.5">
                <SortableContext
                  items={colors.map((_, index) => index)}
                  strategy={horizontalListSortingStrategy}
                >
                  {colors.map((color, index) => (
                    <DraggableColorSwatch
                      key={index}
                      color={color}
                      index={index}
                      sidebarIcons={sidebarIcons}
                      onAddColor={addColor}
                      isLast={index === colors.length - 1}
                      hideAddButton={colors.length >= 10}
                    />
                  ))}
                </SortableContext>
              </div>
            </DndContext>

            {/* Footer */}
            <div className="px-7.5 py-4">
              <div
                className="flex items-center gap-3.5 text-(--grey-7) text-[16px] font-medium leading-normal"
                onClick={() => setShowForeground(!showForeground)}
              >
                Show Foreground Colors
                <svg
                  className={`w-4 h-4 transition-transform text-black ${
                    showForeground ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteUI;
