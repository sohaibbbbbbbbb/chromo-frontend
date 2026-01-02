"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/schemas/auth";
import supabase from "@/lib/supabase-client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const router = useRouter();
  const [hideShowPassword, setHideShowPassword] = useState<boolean>(false);
  const [hideShowConfirmPassword, setHideConfirmShowPassword] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (payload: ResetPasswordFormData) => {
    const { error } = await supabase.auth.updateUser({
      password: payload.password,
    });

    if (error) {
      toast.error(error.message || "Failed to reset password");
      return;
    }

    toast.success("Password reset successfully!");
    router.push("/login");
  };
  return (
    <div className="md:h-screen ">
      <Toaster position="top-right" />
      <div className="flex justify-center items-center h-full  md:h-[calc(100vh-60px)] w-full px-5 py-2.5 md:py-0">
        <div className="w-full max-w-96 ">
          <div className="text-center">
            <Image
              src="/chromo-logo.png"
              alt=""
              width={400}
              height={400}
              className="w-16 h-16 mx-auto"
            />
            <h1 className="text-xl mt-5 leading-5 font-semibold tracking-[-0.6px] text-card-foreground font-inter ">
              Reset Your Password
            </h1>
            <p className=" font-geist font-normal text-sm leading-5 text-foreground mt-1.5">
              Enter your new password below to reset your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoFocus={false}
            className="mt-8"
          >
            <div className="flex flex-col gap-4">
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
                  />
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
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            </div>
          </form>
          <p className=" font-poppins text-center text-sm leading-[150%] text-foreground mt-8">
            <Link href="/login" className="underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResetPassword;
