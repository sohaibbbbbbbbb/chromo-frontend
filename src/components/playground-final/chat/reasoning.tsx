"use client";

import { useState } from "react";
import Image from "next/image";

interface ReasoningProps {
  content?: string;
  defaultExpanded?: boolean;
}

const Reasoning = ({
  content = "Concept & emotional goal: The phrase conveys a space that's bright, high-velocity, and creative — the kind of UI that sparks ideas and momentum. Colors chosen under this theme should feel alive and optimistic, encouraging fast exploration and playful experimentation.\nTarget user & context: Geared toward startup founders, product designers, and fast-moving teams who want tools that feel modern and action-oriented.\nThe4 bold accents for attention, clear neutrals for focus, and lively supporting tones for mood and differentiation.\nVisual hierarchy & clarity: Use saturated, energetic hues for primary actions and backgrounds and surfaces.",
  defaultExpanded = true,
}: ReasoningProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="pt-5.75">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1.5 pb-2.5 cursor-pointer"
      >
        <span className="font-inter font-medium text-lg leading-5.5 text-black">
          Reasoning
        </span>
        <Image
          src="/svg/collapse-down-icon.svg"
          alt=""
          width={10}
          height={6}
          className={`w-2.5 h-1.5 transition-transform ${isExpanded ? "" : "-rotate-90"}`}
        />
      </button>
      {isExpanded && (
        <p className="font-inter font-normal text-base leading-[144%] text-(--grey-9) whitespace-pre-line">
          {content}
        </p>
      )}
    </div>
  );
};

export default Reasoning;
