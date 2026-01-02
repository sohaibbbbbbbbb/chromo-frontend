"use client";

import Image from "next/image";

interface ChatInputFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
}

const ChatInputField = ({
  placeholder = "Describe your Palette's vibe...",
  value,
  onChange,
  onSubmit,
}: ChatInputFieldProps) => {
  return (
    <div className="-mt-px w-full rounded-2xl bg-(--chat-search-bg) border-[1.33px] border-(--chat-input-border) shadow-[0px_2px_8.1px_6px_var(--chat-input-glow)] backdrop-blur-[6px] z-10 px-4.75 py-3.25">
      <div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
          className="w-full h-4.75 bg-transparent border-none outline-none font-inter font-normal text-base leading-4.75 text-(--chat-search-placeholder) placeholder:text-(--chat-search-placeholder) placeholder:text-shadow-[2px_2px_8px_rgba(0,0,0,0.08)]"
        />
      </div>
      <div className="flex items-center justify-between mt-4">
        <button className="w-7 h-7 rounded-[26px] bg-(--chat-search-bg) border border-(--chat-search-border) flex items-center justify-center cursor-pointer">
          <Image
            src="/svg/plus-slim.svg"
            alt=""
            width={12}
            height={12}
            className="w-3 h-3"
          />
        </button>
        <button
          onClick={onSubmit}
          className="w-7 h-7 rounded-xl bg-(--chat-search-bg) border border-(--chat-search-border) flex items-center justify-center cursor-pointer"
        >
          <Image
            src="/svg/arrow-up.svg"
            alt=""
            width={12}
            height={14}
            className="w-3 h-3.5"
          />
        </button>
      </div>
    </div>
  );
};

export default ChatInputField;
