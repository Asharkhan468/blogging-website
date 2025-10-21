import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("Token:", token);
  const { pathname } = req.nextUrl;

  // Allow public routes (like login and register)
  if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // If no token -> redirect to login
  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Run middleware for all routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
