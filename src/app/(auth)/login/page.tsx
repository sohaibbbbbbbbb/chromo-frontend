"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import supabase from "@/lib/supabase-client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import SocialLoginButtons from "@/components/social-login-buttons";

export default function Login() {
  const [hideShowPassword, setHideShowPassword] = useState<boolean>(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (payload: LoginFormData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }

    toast.success("Login successful!");
    router.push("/chat");
  };

  return (
    <div className="md:h-screen">
      <Toaster position="top-right" />
      <div className="flex justify-center items-center h-full md:h-[calc(100vh-60px)] w-full px-5 py-2.5 md:py-0">
        <div className="flex flex-col items-center gap-6 w-full max-w-[384px]">
          {/* Card */}
          <div className="flex flex-col justify-center items-center gap-8.25 w-full">
            {/* Logo and Header */}
            <div className="flex flex-col items-center gap-5.25 w-full">
              {/* Logo */}
              <div className="flex flex-row items-center justify-center">
                <Image
                  src="/chromo-logo.png"
                  alt="Chromos Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              {/* Title and Description */}
              <div className="flex flex-col items-center gap-1.5 w-full">
                <h1 className="font-inter font-semibold text-xl leading-[100%] tracking-[-0.6px] text-center text-auth-text">
                  Welcome to Chromos
                </h1>
                <p className="font-geist font-normal text-sm leading-5 text-center text-auth-text">
                  Don't have an account?{" "}
                  <Link href="/signup" className="underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>

            {/* Form Section */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              autoFocus={false}
              className="flex flex-col items-start gap-4 w-full"
            >
              <div className="w-full">
                <Input
                  type="email"
                  placeholder="Email"
                  className="h-9 w-full bg-card border border-auth-input-border shadow-shadow1Input rounded-lg px-3 py-2 font-geist text-sm text-auth-text placeholder:text-auth-placeholder"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 w-full">
                <div className="relative w-full">
                  <Input
                    type={hideShowPassword ? "text" : "password"}
                    placeholder="Password"
                    className="h-9 w-full bg-card border border-auth-input-border shadow-shadow1Input rounded-lg px-3 py-2 font-geist text-sm text-auth-text placeholder:text-auth-placeholder"
                    {...register("password")}
                  />
                  <div
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => setHideShowPassword(!hideShowPassword)}
                  >
                    {hideShowPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 w-full">
                    {errors.password.message}
                  </p>
                )}
                <Link
                  href="/forget-password"
                  className="font-poppins font-medium text-sm leading-[150%] tracking-[0.005em] text-right text-auth-text underline"
                >
                  Forgot your Password?
                </Link>
              </div>

              {/* Content Section */}
              <div className="flex flex-col items-center gap-6 w-full mt-4">
                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-9 bg-auth-button-bg shadow-shadow1Input rounded-lg font-geist font-medium text-sm leading-5 text-auth-button-text hover:bg-auth-button-bg/90 cursor-pointer"
                >
                  {isSubmitting ? "Loading..." : "Login"}
                </Button>

                {/* Or Separator */}
                <div className="flex flex-row justify-center items-center gap-2.5 w-full">
                  <div className="flex-1 h-px bg-auth-separator"></div>
                  <span className="font-geist font-normal text-sm leading-5 text-center text-auth-placeholder">
                    Or
                  </span>
                  <div className="flex-1 h-px bg-auth-separator"></div>
                </div>

                {/* Social Buttons */}
                <SocialLoginButtons variant="login" />
              </div>
            </form>
          </div>

          {/* Terms Text */}
          <p className="font-geist font-normal text-xs leading-4 tracking-[0.01em] text-center text-auth-terms-text max-w-57">
            By clicking continue, you agree to
            <br />
            our{" "}
            <Link href="#" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline">
              Privacy Policy.
            </Link>
          </p>
        </div>
      </div>
      <div className="py-4.25 border-t border-muted-foreground px-5 lg:px-15.5">
        <div className="flex justify-between items-center flex-col sm:flex-row">
          <p className="font-public-sans text-sm font-light text-muted-foreground">
            2025, Chromos. Ltd, All Rights Reserved
          </p>
          <ul className="flex justify-end items-center gap-2.5 lg:gap-5">
            {["Terms", "Privacy", "Security"].map((link, index) => {
              return (
                <li key={index}>
                  <Link
                    href={"#"}
                    className="font-inter font-normal text-base text-muted-foreground"
                  >
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
