"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/schemas/auth";
import supabase from "@/lib/supabase-client";
import toast, { Toaster } from "react-hot-toast";

const ForgetPasswordScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (payload: ForgotPasswordFormData) => {
    const { error } = await supabase.auth.resetPasswordForEmail(payload.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error(error.message || "Failed to send reset link");
      return;
    }

    toast.success("Password reset link sent to your email!");
  };

  return (
    <div className="md:h-screen">
      <Toaster position="top-right" />
      <div className="flex justify-center items-center h-full md:h-[calc(100vh-60px)] w-full px-5 py-2.5 md:py-0">
        <div className="flex flex-col justify-center items-center gap-8.25 w-full max-w-[384px]">
          {/* Logo and Text Section */}
          <div className="flex flex-col items-start gap-3 w-full">
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
            </div>
            {/* Title and Description */}
            <div className="flex flex-col items-center gap-2 w-full">
              <h1 className="font-poppins font-semibold text-[28px] leading-[150%] tracking-[0.005em] text-center text-auth-text">
                Forgot Your Password?
              </h1>
              <p className="font-poppins font-normal text-sm leading-[150%] tracking-[0.005em] text-center text-auth-text">
                Don't worry! Fill in your email and we wil send you a link to
                reset your password
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-6 w-full"
          >
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="flex flex-col items-start gap-4 w-full">
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
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-9 min-h-9 bg-auth-button-bg rounded-lg font-poppins font-medium text-base leading-[150%] tracking-[0.005em] text-auth-button-text hover:bg-auth-button-bg/90 cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </form>

          {/* Back to Login Link */}
          <Link
            href="/login"
            className="w-full font-poppins font-medium text-sm leading-[150%] tracking-[0.005em] text-center text-auth-text underline"
          >
            Back to Login
          </Link>
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
};

export default ForgetPasswordScreen;
