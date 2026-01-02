// import Header from "@/layout/header";
// import SingUpModel from "@/model/sing-up-model";
// import React, { useState } from "react";
// import { FiArrowUp, FiPlus } from "react-icons/fi";

// const HomeScreen = () => {
//   const [modelIsOpen, setModelIsOpen] = useState(false);
//   const onToggleModel = () => {
//     setModelIsOpen(!modelIsOpen);
//   };
//   return (
//     <div className="flex flex-col justify-between min-h-screen h-auto">
//       <Header />
//       <div className="py-7 md:py-12 px-5">
//         <div className="max-w-223.5 w-full mx-auto">
//           <h2 className="font-inter text-3xl sm:text-6xl  md:text-[78px] leading-[normal] md:h-47 font-extralight text-center">
//             Turn inspiration into{" "}
//             <span className="title  text-transparent font-semibold  ">
//               Palettes, &nbsp;
//             </span>
//             Effortlessly.
//           </h2>
//         </div>

//         <div className="">
//           <div className="border border-[#B87D00] h-15 md:h-20   rounded-[48px] max-w-250 w-full mx-auto relative pl-11 md:pl-14 pr-17 chat-input mt-14 md:mt-46.75 mb-5">
//             <span className="absolute top-0 bottom-0 md:bottom-auto  h-fit my-auto md:top-8 text-base leading-4 left-5 md:left-7 ">
//               <FiPlus />
//             </span>
//             <input
//               type="text"
//               className="w-full h-full border-0 outline-0 bg-transparent"
//               placeholder="Describe the mood, style or inspiration for your color palette... "
//             />
//             <button
//               type="submit"
//               className="border border-[#fecf12] h-10 w-10 flex justify-center items-center rounded-full absolute md:top-5 md:right-7 bottom-0 top-0 my-auto right-3 sm:my-0 md:bottom-auto"
//               onClick={onToggleModel}
//             >
//               <FiArrowUp className="text-base leading-4" />
//             </button>
//           </div>
//           <div className=" ">
//             <h2 className="font-inter font-medium text-lg sm:text-2xl leading-[100%] text-black text-center mt-10 sm:mt-17 ">
//               Not sure where to start? Try one of these
//             </h2>
//             <ul className="flex flex-wrap gap-2.5 sm:gap-4 justify-center max-w-242.5 mx-auto w-full sm:mt-5 mt-2.5">
//               {[
//                 "Calm morning meditation by a Japanese garden",
//                 "Energetic startup office workspace",
//                 "Warm cozy autumn coffee shop",
//                 "Minimalist Scandinavian bedroom",
//                 "Vibrant summer music festival",
//               ].map((tag, index) => {
//                 return (
//                   <li
//                     key={index}
//                     className="p-2.5 border border-[#B87D00] leading-[100%] rounded-[37px] font-inter text-sm md:text-base font-normal text-black text-center"
//                   >
//                     {tag}
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       </div>
//       {modelIsOpen && <SingUpModel onClose={onToggleModel} />}
//     </div>
//   );
// };

// export default HomeScreen;
