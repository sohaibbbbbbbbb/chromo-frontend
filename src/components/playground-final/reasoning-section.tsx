import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function ReasoningSection() {
    const [isReasoningExpanded, setIsReasoningExpanded] = useState(true);

    return (
        <div className="pl-5 py-4 pr-2 pt-6 w-full max-w-86 rounded-3xl border bg-(--porcelain-1)">
            <button
                onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
                className="flex items-center gap-2 mb-2 font-medium text-(--grey-9)"
            >
                <span>Reasoning</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isReasoningExpanded ? "" : "-rotate-90"
                        }`}
                />
            </button>

            {isReasoningExpanded && (
                <div className="text-sm text-(--grey-9) leading-relaxed space-y-2">
                    <p>
                        <span className="font-medium">Concept & emotional goal:</span> The phrase conveys
                        a space that's bright, high-velocity, and creative — the kind of UI that sparks
                        ideas and momentum. Colors chosen under this theme should feel alive and
                        optimistic, encouraging fast exploration and playful experimentation.
                        <span className="font-medium">Target user & context:</span> Geared toward startup
                        founders, product designers, and fast-moving teams who want tools that feel modern
                        and action-oriented. The palette should support quick decision-making: bold
                        accents for attention, clear neutrals for focus, and lively supporting tones for
                        mood and differentiation.
                    </p>
                </div>
            )}
            <button className="mx-auto mb-4 flex w-9 h-9 aspect-square justify-center items-center gap-2.5 px-2 py-2 rounded-[70px] bg-(--grey-8) shadow-[2px_5px_6.4px_0_rgba(0,0,0,0.35)]">
                <Image
                    src="/svg/upload-white.svg"
                    alt=""
                    width={400}
                    height={400}
                    className="w-3.5 h-4 mx-auto"
                />
            </button>
        </div>
    );
}
