"use client";
import Header from "@/layout/header";
import AttachmentModel from "@/model/attachment-model";
import SingUpModel from "@/model/sing-up-model";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FiArrowUp } from "react-icons/fi";
import supabase from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import PaletteLoader from "@/components/ui/palette-loader";

export default function Home() {
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [isAttachementModel, setIsAttachementModel] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onToggleModel = () => {
    setModelIsOpen(!modelIsOpen);
  };
  const onAttachementModel = () => {
    setIsAttachementModel(!isAttachementModel);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .insert([{ prompt, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error("Error creating project:", error);
        return;
      }

      if (data) {
        // Call AI to generate initial palette
        const response = await fetch("/api/project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ projectId: data.id, prompt }),
        });

        if (!response.ok) {
          console.error("Error calling AI API");
        }

        router.push(`/play-ground/${data.id}`);
      }
    } finally {
      setIsLoading(false);
      return;
    }
  };

  const onSubmitHandler = async () => {
    // Check if prompt exists and is not empty/whitespace
    if (!prompt.trim()) {
      return; // Don't submit if prompt is empty
    }

    // Check if user is logged in
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // User is logged in, create project and redirect
      await handleSubmit();
    } else {
      // User is not logged in, show signup modal
      onToggleModel();
    }
  };
  return (
    <>
      <PaletteLoader isVisible={isLoading} />
      <div className="flex flex-col justify-between min-h-screen h-auto">
        <Header />
        <div className="py-7 md:py-12 px-5">
          <div className="max-w-223.5 w-full mx-auto">
            <h2 className="font-inter text-3xl sm:text-6xl  md:text-[78px] leading-[normal] md:h-47 font-extralight text-center">
              Turn inspiration into{" "}
              <span className="title  text-transparent font-semibold  ">
                Palettes, &nbsp;
              </span>
              Effortlessly.
            </h2>
          </div>

          <div className="">
            <div className="border border-[#B87D00] h-15 md:h-20   rounded-[48px] max-w-250 w-full mx-auto relative pl-11 md:pl-14 pr-17 chat-input mt-14 md:mt-46.75 mb-5">
              <span
                className="absolute top-0 bottom-0 md:bottom-auto h-fit my-auto md:top-8 text-base leading-4 left-5 md:left-7 cursor-pointer transition-all duration-200 hover:scale-125 active:scale-90 hover:rotate-90"
                onClick={onAttachementModel}
              >
                <FiPlus />
              </span>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-full border-0 outline-0 bg-transparent"
                placeholder="Describe the mood, style or inspiration for your color palette... "
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSubmitHandler();
                  }
                }}
              />
              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className={`border h-10 w-10 flex justify-center items-center rounded-full absolute md:top-5 md:right-7 bottom-0 top-0 my-auto right-3 sm:my-0 md:bottom-auto transition-all duration-200 ${
                  prompt.trim() && !isLoading
                    ? "border-[#fecf12] cursor-pointer hover:scale-125 active:scale-90"
                    : "border-gray-300 cursor-not-allowed opacity-50"
                }`}
                onClick={onSubmitHandler}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiArrowUp className="text-base leading-4" />
                )}
              </button>
            </div>
            <div className=" ">
              <h2 className="font-inter font-medium text-lg sm:text-2xl leading-[100%] text-black text-center mt-10 sm:mt-17 ">
                Not sure where to start? Try one of these
              </h2>
              <ul className="flex flex-wrap gap-2.5 sm:gap-4 justify-center max-w-242.5 mx-auto w-full sm:mt-5 mt-2.5">
                {[
                  "Calm morning meditation by a Japanese garden",
                  "Energetic startup office workspace",
                  "Warm cozy autumn coffee shop",
                  "Minimalist Scandinavian bedroom",
                  "Vibrant summer music festival",
                ].map((tag, index) => {
                  return (
                    <li
                      key={index}
                      className="p-2.5 border border-[#B87D00] leading-[100%] rounded-[37px] font-inter text-sm md:text-base font-normal text-black text-center cursor-pointer hover:bg-[#B87D00]/10 transition-colors"
                      onClick={() => setPrompt(tag)}
                    >
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        {modelIsOpen && <SingUpModel onClose={onToggleModel} />}
        {isAttachementModel && <AttachmentModel onClose={onAttachementModel} />}
      </div>
    </>
  );
}
