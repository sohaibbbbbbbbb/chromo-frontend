"use client";

import React from "react";
import Image from "next/image";

interface AddColorProps {
  onAddColor: () => void;
}

const AddColor: React.FC<AddColorProps> = ({ onAddColor }) => {
  return (
    <button
      onClick={onAddColor}
      className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 border-2 border-white bg-[#FFF9E6] rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 z-[1000]"
      title="Add new color"
    >
      <Image
        src="/svg/plus-circular.svg"
        alt="Add color"
        width={32}
        height={32}
        className="w-full h-full"
      />
    </button>
  );
};

export default AddColor;
