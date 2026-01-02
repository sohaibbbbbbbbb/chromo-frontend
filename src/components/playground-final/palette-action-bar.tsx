"use client";

import React from "react";
import Image from "next/image";

interface PaletteActionBarProps {
  sidebarIcons: Array<{
    Icon: string;
    label: string;
  }>;
}

const PaletteActionBar: React.FC<PaletteActionBarProps> = ({ sidebarIcons }) => {
  return (
    <div className="absolute left-3 top-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {sidebarIcons.map(({ Icon, label }, iconIndex) => (
        <button key={iconIndex} className="cursor-pointer" title={label}>
          <Image
            src={Icon}
            alt=""
            width={400}
            height={400}
            className="w-3.5 h-3.5 mx-auto"
          />
        </button>
      ))}
    </div>
  );
};

export default PaletteActionBar;
