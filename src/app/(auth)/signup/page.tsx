"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "@/schemas/auth";
import supabase from "@/lib/supabase-client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import SocialLoginButtons from "@/components/social-login-buttons";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [hideShowPassword, setHideShowPassword] = useState<boolean>(false);
  const [hideShowConfirmPassword, setHideConfirmShowPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

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
      router.push("/login");
    }
  };

  return (
    <div className="md:h-screen">
      <Toaster position="top-center" />
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
                  Create your Account
                </h1>
                <p className="font-geist font-normal text-sm leading-5 text-center text-auth-text">
                  Already have an account?{" "}
                  <Link href="/login" className="underline">
                    Sign in
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
                  type="text"
                  placeholder="Name"
                  className="h-9 w-full bg-card border border-auth-input-border shadow-shadow1Input rounded-lg px-3 py-2 font-geist text-sm text-auth-text placeholder:text-auth-placeholder"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
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
              <div className="w-full">
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <div className="relative w-full">
                  <Input
                    type={hideShowConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="h-9 w-full bg-card border border-auth-input-border shadow-shadow1Input rounded-lg px-3 py-2 font-geist text-sm text-auth-text placeholder:text-auth-placeholder"
                    {...register("confirmPassword")}
                  />
                  <div
                    className="absolute top-2 right-2 cursor-pointer"
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

              {/* Content Section */}
              <div className="flex flex-col items-center gap-6 w-full mt-4">
                {/* Sign Up Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-9 bg-auth-button-bg shadow-shadow1Input rounded-lg font-geist font-medium text-sm leading-5 text-auth-button-text hover:bg-auth-button-bg/90 cursor-pointer"
                >
                  {isSubmitting ? "Loading..." : "Sign up"}
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
                <SocialLoginButtons variant="signup" />
              </div>
            </form>
          </div>

          {/* Terms Text */}
          <p className="font-geist font-normal text-xs leading-4 tracking-[0.01em] text-center text-auth-signup-terms-text max-w-57">
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
