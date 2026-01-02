"use client";

import ChatInputField from "./chat-input-field";

interface SuggestionsProps {
  label?: string;
  hint?: string;
  pills?: string[];
  inputValue?: string;
  onInputChange?: (value: string) => void;
  onSubmit?: () => void;
}

const Suggestions = ({
  label = "Suggestion",
  hint = "Try a warmer pink",
  pills = ["Startup workspace", "Vibrant summer fest"],
  inputValue,
  onInputChange,
  onSubmit,
}: SuggestionsProps) => {
  return (
    <div className=" w-full pb-6.5">
      <div className="w-full bg-(--chat-suggestion-bg) border border-(--chat-search-border) rounded-2xl">
        <div className="bg-(--chat-suggestion-bg) rounded-t-2xl">
          <div className="pl-6 pt-4.25">
            <span className="font-inter font-light text-base leading-4.75 text-(--suggestion-label)">
              {label}
            </span>
            <span className="font-inter font-light text-base leading-4.75 text-black ml-2">
              {hint}
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 pt-2.5 pb-4.25">
            {pills.map((pill, index) => (
              <button
                key={index}
                className="flex items-center px-2.5 h-8 bg-(--chat-search-bg) border border-(--chat-suggestion-pill-border) rounded-[38px] cursor-pointer"
              >
                <span className="font-inter font-normal text-sm leading-4.25 text-black">
                  {pill}
                </span>
              </button>
            ))}
          </div>
        </div>
        <ChatInputField
          value={inputValue}
          onChange={onInputChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default Suggestions;
