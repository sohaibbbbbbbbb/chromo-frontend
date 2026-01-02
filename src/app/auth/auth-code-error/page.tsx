"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase-client";

export default function AuthCodeError() {
    const router = useRouter();

    useEffect(() => {
        // Check if there are tokens in the URL hash (implicit flow)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (accessToken && refreshToken) {
            // Set the session with the tokens from the hash
            supabase.auth
                .setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                })
                .then(async ({ data, error }) => {
                    if (error) {
                        console.error("Error setting session:", error);
                        return;
                    }

                    if (data.user) {
                        // Create profile if doesn't exist
                        const { data: existingProfile } = await supabase
                            .from("profiles")
                            .select("id")
                            .eq("id", data.user.id)
                            .single();

                        if (!existingProfile) {
                            await supabase.from("profiles").insert({
                                id: data.user.id,
                                email: data.user.email,
                                full_name: data.user.user_metadata.full_name,
                            });
                        }
                    }

                    // Redirect to chat
                    router.push("/chat");
                });
        }
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Completing sign in...</h1>
                <p className="text-muted-foreground">Please wait</p>
            </div>
        </div>
    );
}
