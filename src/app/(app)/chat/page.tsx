"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiPlus, FiArrowUp } from "react-icons/fi";
import Image from "next/image";
import axios from "axios";
import supabase from "@/lib/supabase-client";
import SingUpModel from "@/model/sing-up-model";
import AttachmentModel from "@/model/attachment-model";
import PaletteLoader from "@/components/ui/palette-loader";
import Home from "@/app/page";

export default function ChatPage() {
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [isAttachementModel, setIsAttachementModel] = useState(false);

  const onToggleModel = () => {
    setModelIsOpen(!modelIsOpen);
  };

  const onAttachementModel = () => {
    setIsAttachementModel(!isAttachementModel);
  };

  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        try {
          const response = await axios.post(
            "/api/project",
            {
              projectId: data.id,
              prompt,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );

          console.log("AI API response:", response.data);
        } catch (error) {
          console.log(error);
          console.error("Error calling AI API:", error);
        }

        router.push(`/play-ground/${data.id}`);
      }
    } finally {
      setIsLoading(false);
      return;
    }
  };

  return (
    <>
      <PaletteLoader isVisible={isLoading} />
      <div className="flex flex-col min-h-screen h-auto">
        <div className="flex-1 py-7 md:py-12 px-5">
          <div className="flex justify-center mb-8">
            <Image
              src="/chromo-logo.png"
              alt="Chromo Logo"
              width={500}
              height={500}
              className="w-27.5 h-auto"
            />
          </div>
          <div className="max-w-223.5 w-full mx-auto">
            <h2 className="font-inter text-3xl sm:text-6xl md:text-[78px] leading-[normal] h-auto lg:h-47 font-extralight text-center">
              Turn inspiration into{" "}
              <span className="title text-transparent font-semibold">
                Palettes, &nbsp;
              </span>
              Effortlessly.
            </h2>
          </div>

          <div>
            <div className="border border-[#B87D00] h-15 md:h-20 rounded-[48px] max-w-250 w-full mx-auto relative pl-11 md:pl-14 pr-17 chat-input mt-14 md:mt-46.75 mb-5">
              <span
                className="absolute top-0 bottom-0 md:bottom-auto h-fit my-auto md:top-8 text-base leading-4 left-5 md:left-7 transition-all duration-200 hover:scale-125 active:scale-90 hover:rotate-90"
                onClick={onAttachementModel}
              >
                <FiPlus />
              </span>
              <input
                type="text"
                className="w-full h-full border-0 outline-0 bg-transparent"
                placeholder="Describe the mood, style or inspiration for your color palette... "
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              {/* <button
                type="submit"
                className="border border-[#fecf12] h-10 w-10 flex justify-center items-center rounded-full absolute md:top-5 md:right-7 bottom-0 top-0 my-auto right-3 md:my-0 md:bottom-auto disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 hover:scale-125 active:scale-90 "
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiArrowUp className="text-base leading-4" />
                )}
              </button> */}
              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className={`border h-10 w-10 flex justify-center items-center rounded-full absolute md:top-5 md:right-7 bottom-0 top-0 my-auto right-3 sm:my-0 md:bottom-auto transition-all duration-200 ${
                  prompt.trim() && !isLoading
                    ? "border-[#fecf12] cursor-pointer hover:scale-125 active:scale-90"
                    : "border-gray-300 cursor-not-allowed opacity-50"
                }`}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiArrowUp className="text-base leading-4" />
                )}
              </button>
            </div>
            <div>
              <h2 className="font-inter font-medium text-lg sm:text-2xl leading-[100%] text-black text-center mt-10 sm:mt-17">
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
                      className="p-2.5 border border-[#B87D00] leading-[100%] rounded-[37px] font-inter text-sm md:text-base font-normal text-black text-center"
                    >
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {modelIsOpen && <SingUpModel onClose={onToggleModel} />}
      {isAttachementModel && <AttachmentModel onClose={onAttachementModel} />}
    </>
  );
}
