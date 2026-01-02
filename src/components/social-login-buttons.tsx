"use client";

import React from "react";
import { Button } from "./ui/button";
import { FaApple, FaGoogle } from "react-icons/fa";
import supabase from "@/lib/supabase-client";

interface SocialLoginButtonsProps {
  className?: string;
  variant?: "login" | "signup";
}

const SocialLoginButtons = ({
  className,
  variant = "login",
}: SocialLoginButtonsProps) => {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: "consent select_account",
        },
      },
    });
  };

  const googleButtonText =
    variant === "signup" ? "Sign up with Google" : "Continue with Google";
  const appleButtonText =
    variant === "signup" ? "Sign up with Apple" : "Continue with Apple";

  return (
    <div className={`flex flex-row items-start gap-2 w-full ${className || ""}`}>
      {/* <Button
        variant="outline"
        className="flex-1 h-9 bg-card border border-auth-input-border shadow-shadow1Input rounded-lg font-geist font-medium text-sm leading-5 text-auth-text cursor-pointer"
      >
        <FaApple className="w-4 h-4" />
        {appleButtonText}
      </Button> */}
      <Button
        variant="outline"
        className="flex-1 h-9 bg-card border border-auth-input-border shadow-shadow1Input rounded-lg font-geist font-medium text-sm leading-5 text-auth-text cursor-pointer"
        onClick={handleGoogleLogin}
      >
        <FaGoogle className="w-4 h-4" />
        {googleButtonText}
      </Button>
    </div>
  );
};

export default SocialLoginButtons;
