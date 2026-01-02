// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import Image from "next/image";
// import { FaApple, FaGoogle } from "react-icons/fa";
// import Footer from "@/layout/footer";

// const LoginScreen = () => {
//   return (
//     <div className=" md:h-screen ">
//       <div className="flex justify-center items-center h-full  md:h-[calc(100vh-60px)] w-full px-5 py-2.5 md:py-0">
//         <div className="w-full max-w-96 ">
//           <div className="text-center">
//             <Image
//               src="/chromo-logo.png"
//               alt=""
//               width={400}
//               height={400}
//               className="w-16 h-16 mx-auto"
//             />
//             <h1 className="text-xl mt-5 leading-5 font-semibold tracking-[-0.6px] text-card-foreground font-inter ">
//               Welcome to Chromos
//             </h1>
//             <p className=" font-geist font-normal text-sm leading-5 text-foreground mt-1.5">
//               Don't have an account?{" "}
//               <Link href="/signup" className="underline">
//                 Sign up
//               </Link>
//             </p>
//           </div>

//           <form autoFocus={false} className="mt-8">
//             <div className="flex flex-col gap-4">
//               <div>
//                 <Input type="email" placeholder="Email" className="h-9" />
//               </div>
//               <div>
//                 <Input type="password" placeholder="Password" className="h-9" />
//               </div>
//               <div className="-mt-2">
//                 <p className="font-medium text-sm leading-[150%] underline text-foreground text-end font-poppins">
//                   <Link href="/forget-password">Forgot your Password?</Link>
//                 </p>
//               </div>
//               <div className=" mt-4">
//                 <Button className="w-full font-geist">Login</Button>
//               </div>
//             </div>
//           </form>
//           <p className="font-geist font-normal font-sm  leading-5 text-muted-foreground relative before:content-[] before:top-2.5 before:bg-border before:w-[calc(50%-10px)] before:h-0.25  before:block before:absolute after:content-[] after:top-2.5 after:bg-border after:w-[calc(50%-10px)] after:right-0 after:h-0.25 mx-auto w-full text-center after:block after:absolute my-6">
//             or
//           </p>

//           <div className="grid sm:grid-cols-2 gap-2">
//             <Button variant="outline" className="bg-white rounded-md">
//               <FaApple className="text-base leading-4" />
//               Continue with Apple
//             </Button>
//             <Button variant="outline" className="bg-white rounded-md">
//               <FaGoogle className="text-base leading-4 " />
//               Continue with Google
//             </Button>
//           </div>
//           <p className=" w-full mx-auto max-w-57 font-geist text-xs leading-4 tracking-[1%] text-muted-foreground text-center mt-4">
//             By clicking continue, you agree to our
//             <Link href="#" className="underline">
//               Terms of Service
//             </Link>{" "}
//             and
//             <Link href="#" className="underline">
//               {" "}
//               Privacy Policy.
//             </Link>
//           </p>
//         </div>
//       </div>
//       {/* <div className="py-4.25 border-t border-muted-foreground px-5 lg:px-15.5">
//         <div className="flex justify-between items-center flex-col sm:flex-row">
//           <p className="font-public-sans text-sm font-light text-muted-foreground">
//             2025, Chromos. Ltd, All Rights Reserved
//           </p>
//           <ul className="flex justify-end items-center gap-2.5 lg:gap-5">
//             {["Terms", "Privacy", "Security"].map((link, index) => {
//               return (
//                 <li key={index}>
//                   <Link
//                     href={"#"}
//                     className="font-inter font-normal text-base text-muted-foreground"
//                   >
//                     {link}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div> */}
//       <Footer />
//     </div>
//   );
// };
// export default LoginScreen;
