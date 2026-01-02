"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <header>
      <div className="flex justify-between items-center w-full max-w-360 px-5 md:px-10 py-7 mx-auto">
        <div>
          <Image
            alt="demo"
            width={500}
            height={500}
            className="w-auto max-h-16"
            src="/chromo-logo-with-text.png"
          />
        </div>
        {isLoading ? (
          <div className="flex gap-3 justify-end items-center w-full md:max-w-82.5">
            {/* Login button skeleton */}
            <div className="md:w-full">
              <div className="h-9 w-full rounded-md bg-gray-50 border border-gray-100" />
            </div>

            {/* Get Started button skeleton */}
            <div className="md:w-full">
              <div className="h-9 w-full rounded-md bg-gray-50 border border-gray-100" />
            </div>
          </div>
        ) : (
          <div className="flex gap-3 justify-end items-center w-full md:max-w-82.5">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-black rounded-md text-center py-1.5 px-4 shadow-none text-white font-poppins font-medium text-base leading-[150%]"
              >
                Logout
              </button>
            ) : (
              <>
                <div className="md:w-full">
                  <Link
                    href="/login"
                    className="block bg-black rounded-md text-center py-1.5 px-4 shadow-none md:w-full text-white font-poppins font-medium text-base leading-[150%]"
                  >
                    Login
                  </Link>
                </div>
                <div className="md:w-full">
                  <Button
                    variant="outline"
                    className="md:w-full h-9 bg-white shadow-none font-poppins text-base font-medium text-[#171717] border border-white"
                  >
                    Get Started
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
