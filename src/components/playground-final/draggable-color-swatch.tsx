"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PaletteActionBar from "./palette-action-bar";
import AddColor from "./add-color";

interface ColorItem {
  hex: string;
  name: string;
  role: string;
}

interface DraggableColorSwatchProps {
  color: ColorItem;
  index: number;
  sidebarIcons: Array<{
    Icon: string;
    label: string;
  }>;
  onAddColor: (afterIndex: number) => void;
  isLast?: boolean;
  hideAddButton?: boolean;
}

const DraggableColorSwatch: React.FC<DraggableColorSwatchProps> = ({
  color,
  index,
  sidebarIcons,
  onAddColor,
  isLast = false,
  hideAddButton = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        backgroundColor: color.hex,
        height: "332px",
      }}
      className="flex-1 relative group"
    >
      <div {...attributes} {...listeners}>
        <PaletteActionBar sidebarIcons={sidebarIcons} />
      </div>

      {!isLast && !hideAddButton && <AddColor onAddColor={() => onAddColor(index)} />}

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p className="text-white text-[20px] font-normal leading-normal">
          {color.hex}
        </p>
        <p className="text-white text-[16px] font-normal leading-normal">
          {color.name}
        </p>
      </div>
    </div>
  );
};

export default DraggableColorSwatch;
