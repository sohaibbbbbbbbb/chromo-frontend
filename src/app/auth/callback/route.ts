import { supabaseServer } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // if "next" is in param, use it as the redirect URL
    let next = searchParams.get("next") ?? "/chat";
    if (!next.startsWith("/")) {
        // if "next" is not a relative URL, use the default
        next = "/chat";
    }

    if (code) {
        const supabase = await supabaseServer();
        const { error, data } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Handle profile creation
            if (data.user) {
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

            const forwardedHost = request.headers.get("x-forwarded-host");
            const isLocalEnv = process.env.NODE_ENV === "development";

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`);
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`);
            } else {
                return NextResponse.redirect(`${origin}${next}`);
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
