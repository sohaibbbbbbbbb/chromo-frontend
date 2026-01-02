"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { FaApple, FaGoogle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "@/schemas/auth";
import supabase from "@/lib/supabase-client";
import toast, { Toaster } from "react-hot-toast";
import SocialLoginButtons from "@/components/social-login-buttons";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SingUpModel = ({ onClose }: { onClose: any }) => {
  const [isClosing, setIsClosing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const [hideShowPassword, setHideShowPassword] = useState<boolean>(false);
  const [hideShowConfirmPassword, setHideConfirmShowPassword] =
    useState<boolean>(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };
  const onSubmit = async (payload: SignupFormData) => {
    const { data: existingUser, error: _error } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", payload.email);

    if (_error) {
      toast.error("Error checking existing user");
      return;
    }

    if (existingUser.length) {
      toast.error("User with this email already exists");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          name: payload.name,
        },
      },
    });

    if (error) {
      toast.error(error.message || "Error signing up");
    } else {
      await supabase.from("profiles").insert([
        {
          id: data.user?.id,
          full_name: payload.name,
          email: payload.email,
        },
      ]);
      toast.success("User signed up successfully!");
      handleClose();
    }
  };
  return (
    <div
      className={`bg-[#BBB4A699] fixed inset-0  ${
        isClosing
          ? "animate-[backdropFadeOut_0.4s_ease-in]"
          : "animate-[backdropFadeIn_0.4s_ease-out]"
      }`}
    >
      <>
        <Toaster position="top-right" />
        <div className="flex justify-center items-center h-screen">
          <div
            className={`w-full max-w-109.25 mx-auto shadow-shadowBox p-6 rounded-4xl bg-[#F6F2EA] relative ${
              isClosing
                ? "animate-[modalExit_0.4s_ease-in]"
                : "animate-[modalEnter_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="close w-8 h-8 absolute top-4.5 right-4.5 cursor-pointer  flex justify-center items-center"
              onClick={handleClose}
            >
              <IoClose className="text-2xl leading-normal" />
            </div>
            <div className="text-center">
              <Image
                src="/chromo-logo.png"
                alt=""
                width={400}
                height={400}
                className="w-16 h-16 mx-auto"
              />
              <h1 className="text-xl mt-5 leading-5 font-semibold tracking-[-0.6px] text-card-foreground font-inter ">
                Start Building.
              </h1>
              <p className=" font-geist font-normal text-sm leading-5 text-foreground mt-1.5">
                Create free account
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              autoFocus={false}
              className="mt-8"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="h-9"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="h-9"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <Input
                      type={hideShowPassword ? "text" : "password"}
                      placeholder="Password"
                      className="h-9"
                      {...register("password")}
                    />
                    <div
                      className="absolute top-2 right-2  cursor-pointer"
                      onClick={() => setHideShowPassword(!hideShowPassword)}
                    >
                      {hideShowPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </div>
                  </div>
                  {/* <Input
                    type="password"
                    placeholder="Password"
                    className="h-9"
                    {...register("password")}
                  /> */}
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <Input
                      type={hideShowConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="h-9"
                      {...register("confirmPassword")}
                    />{" "}
                    <div
                      className="absolute top-2 right-2  cursor-pointer"
                      onClick={() =>
                        setHideConfirmShowPassword(!hideShowConfirmPassword)
                      }
                    >
                      {hideShowConfirmPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className=" mt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-geist"
                  >
                    {isSubmitting ? "Loading..." : "Sign up"}
                  </Button>
                </div>
              </div>
            </form>
            <p className="font-geist font-normal font-sm  leading-5 text-muted-foreground relative before:content-[] before:top-2.5 before:bg-border before:w-[calc(50%-10px)] before:h-0.25 mx-auto w-full text-center before:block before:absolute after:content-[] after:top-2.5 after:bg-border after:w-[calc(50%-10px)] after:right-0 after:h-0.25 mx-auto w-full text-center after:block after:absolute my-6">
              or
            </p>

            <SocialLoginButtons />
            {/* <div className="grid sm:grid-cols-2 gap-2">
              <Button variant="outline" className="bg-white rounded-md">
                <FaApple className="text-base leading-4" />
                Continue with Apple
              </Button>
              <Button variant="outline" className="bg-white rounded-md">
                <FaGoogle className="text-base leading-4 " />
                Continue with Google
              </Button>
            </div> */}
            <p className=" w-full mx-auto max-w-57 font-geist text-xs leading-4 tracking-[1%] text-muted-foreground text-center mt-4">
              By clicking continue, you agree to our
              <Link href="#" className="underline">
                Terms of Service
              </Link>{" "}
              and
              <Link href="#" className="underline">
                {" "}
                Privacy Policy.
              </Link>
            </p>
          </div>
        </div>
      </>
    </div>
  );
};

export default SingUpModel;
