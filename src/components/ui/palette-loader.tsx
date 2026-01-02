"use client";

interface PaletteLoaderProps {
  isVisible: boolean;
}

export default function PaletteLoader({ isVisible }: PaletteLoaderProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-(--surface-primary) flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="w-27.5 h-27.5">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover mix-blend-multiply"
            style={{
              clipPath: "circle(33% at center)",
              transform: "scale(1.5)",
            }}
          >
            <source src="/video/chromos Orb.mp4" type="video/mp4" />
          </video>
        </div>

        <h2 className="font-inter font-normal text-[28px] text-center text-black">
          Creating your Palette...
        </h2>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 -bottom-32 w-[90%] max-w-[595px] h-[290px] bg-(--surface-primary) rounded-[32px] pt-[54.5px] px-6 md:px-[94.5px] shadow-loaderCard">
        <div className="flex flex-col gap-2 w-full max-w-[406px] mx-auto">
          <p className="text-black font-normal text-[18px] text-center">
            Calm morning meditation by a Japanese garden
          </p>
          <p className="text-black font-normal text-[18px] text-center opacity-50">
            Calm morning meditation by a Japanese garden
          </p>
          <p className="text-black font-normal text-[18px] text-center opacity-20">
            Calm morning meditation by a Japanese garden
          </p>
        </div>
      </div>
    </div>
  );
}