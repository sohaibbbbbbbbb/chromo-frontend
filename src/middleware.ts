import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export default async function middleware(request: NextRequest) {
  // Create Supabase client for middleware
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/forget-password",
    "/reset-password",
  ];
  const authRoutes = ["/auth/callback", "/auth/auth-code-error"];
  const apiRoutes = pathname.startsWith("/api");
  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    authRoutes.some((route) => pathname.startsWith(route));

  // If user is not logged in
  if (!user) {
    // Allow access to public routes and API routes
    if (isPublicRoute || apiRoutes) {
      return response;
    }
    // Redirect to home page for all other routes
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is logged in, don't allow access to login/signup pages
  if (pathname === "/login" || pathname === "/signup") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is logged in, allow access to all other routes
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
