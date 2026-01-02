"use client";

import Image from "next/image";

interface ActionBarProps {
  onCopy?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onMore?: () => void;
}

const ActionBar = ({ onCopy, onLike, onDislike, onMore }: ActionBarProps) => {
  return (
    <div className="flex items-center gap-1.25 pt-2.5 pb-7.75">
      <button onClick={onCopy} className="flex items-center justify-center cursor-pointer">
        <Image
          src="/svg/copy-black.svg"
          alt="Copy"
          width={17}
          height={17}
          className="w-4.25 h-4.25"
        />
      </button>
      <button onClick={onLike} className="flex items-center justify-center w-6 h-6 cursor-pointer">
        <Image
          src="/svg/like.svg"
          alt="Like"
          width={18}
          height={17}
          className="w-4.5 h-4.25"
        />
      </button>
      <button onClick={onDislike} className="flex items-center justify-center w-6 h-6 cursor-pointer">
        <Image
          src="/svg/dislike.svg"
          alt="Dislike"
          width={18}
          height={17}
          className="w-4.5 h-4.25"
        />
      </button>
      <button onClick={onMore} className="flex items-center justify-center cursor-pointer">
        <Image
          src="/svg/three-dot.svg"
          alt="More options"
          width={18}
          height={4}
          className="w-4.5 h-1"
        />
      </button>
    </div>
  );
};

export default ActionBar;
