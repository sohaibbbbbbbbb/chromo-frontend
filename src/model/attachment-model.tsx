"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

const AttachmentModel = ({ onClose }: { onClose: any }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const [selectType, setSelectType] = useState<string>("image");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };
  const attachs = [
    {
      img: "/svg/image.svg",
      type: "Image",
      tag: "Upload Image",
      id: "image",
    },
    {
      img: "/svg/brand-guide.svg",

      type: "Brand guide",
      tag: "Brand PDF / color guide upload",
      id: "upload-image",
    },
  ];
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept:
      selectType === "image"
        ? {
            "image/jpeg": [],
            "image/png": [],
            "image/webp": [],
          }
        : {
            "application/pdf": [],
          },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
  });
  return (
    <>
      <div
        className={`bg-[#BBB4A699] fixed inset-0 min-h-screen overflow-x-hidden z-10  ${
          isClosing
            ? "animate-[backdropFadeOut_0.4s_ease-in]"
            : "animate-[backdropFadeIn_0.4s_ease-out]"
        }`}
      >
        <div className="flex justify-center items-center min-h-screen py-5 h-auto">
          <div
            className={`w-full md:max-w-186.25 max-w-[calc(100%-30px)] shadow-shadowBox mx-auto rounded-lg bg-[#F6F2EA] relative ${
              isClosing
                ? "animate-[modalExit_0.4s_ease-in]"
                : "animate-[modalEnter_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="border-b border-[#D1D1D1] md:pt-7 md:pb-5 md:px-6.25 pt-5 pb-5 px-5">
              <div
                className="close w-8 h-8 absolute top-4.5 right-4.5 cursor-pointer flex justify-center items-center transition-transform duration-200 hover:rotate-90 hover:scale-110"
                onClick={handleClose}
              >
                <IoClose className="text-2xl leading-normal" />
              </div>
              <h2 className="text-xl sm:text-2xl flex justify-center items-center text-center leading-7.5 font-semibold tracking-[-0.6px] text-card-foreground font-inter gap-2">
                <Image
                  src="/upload.svg"
                  width={50}
                  height={60}
                  alt="upload"
                  className="size-5 "
                />{" "}
                Upload for Inspiration
              </h2>
              <p className="text-center font-geist font-normal text-sm leading-5 text-foreground mt-1.5">
                Extract colors from images or brand guidelines
              </p>
            </header>
            <div className="md:pt-16 md:pb-13 md:px-13.75 pt-10 pb-10 px-5">
              <ul className="grid sm:grid-cols-2 gap-4 ">
                {attachs.map((attch, index) => {
                  return (
                    <li
                      onClick={() => setSelectType(attch.id)}
                      key={index}
                      className={`${
                        selectType === attch.id
                          ? "border-[#B87D00] bg-[#b87e0014]"
                          : "border-[#D8D8D8] bg-[#f9f9f948]"
                      } rounded-lg border  flex items-center gap-3 md:py-4 py-2.5 px-2.5 md:px-5 transition-all`}
                    >
                      <div className="w-7 h-7 flex justify-center items-center">
                        <Image
                          src={attch.img}
                          alt={attch.type}
                          width={50}
                          height={50}
                          className="w-auto max-h-6.25"
                        />
                      </div>
                      <div>
                        <h2 className="font-inter text-black text-base font-normal leading-5">
                          {attch.type}
                        </h2>
                        <p className="font-inter text-[#838383] font-normal text-sm leading-5">
                          {attch.tag}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {/* HERE CAN UPLOAD THE DOCS OR IAMGE */}
              <div
                {...getRootProps()}
                className={`bg-[#b87e0014] border border-[#C4C4C4] rounded-lg p-7.5 md:p-10 md:mt-12.5 mt-7.5 cursor-pointer ${
                  isDragActive ? "shadow-shadowBox" : ""
                }`}
              >
                <input {...getInputProps()} />

                <div className="w-full max-w-55 mx-auto text-center">
                  <div className="w-9 h-9 flex justify-center items-center bg-[#C4C4C4] rounded-full mx-auto">
                    <Image
                      src="/upload-2.svg"
                      width={50}
                      height={50}
                      alt="upload"
                      className="w-3.5 h-3.5"
                    />
                  </div>

                  <h2 className="font-inter text-base font-normal text-[#414141] mt-2">
                    Drop your file here
                  </h2>
                  <p className="font-inter text-[#6D6D6D] text-sm">
                    Supported:{" "}
                    {selectType === "image" ? "JPG, PNG, WebP" : "PDF"}
                  </p>
                  <p className="font-inter text-base font-normal underline text-[#414141]">
                    Browse
                  </p>
                </div>
              </div>

              {file && (
                <p className="font-inter text-base font-normal underline text-[#414141] mt-3">
                  {file.name}
                </p>
              )}
              {/*  */}
              <div className="grid grid-cols-2 gap-2 md:mt-12.5 pt-7.5">
                <Button
                  onClick={handleClose}
                  variant={"outline"}
                  className="border-black cursor-pointer"
                >
                  Cancel
                </Button>
                <Button variant={"default"} className="cursor-pointer">
                  Create Palette
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttachmentModel;
