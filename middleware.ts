import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // const token = req.cookies.get("token")?.value;
  const cookieHeader = req.headers.get("cookie");
  const token =
    req.cookies.get("token")?.value ||
    (cookieHeader
      ? cookieHeader
          .split("; ")
          .find((c) => c.startsWith("token="))
          ?.split("=")[1]
      : null);
  const { pathname } = req.nextUrl;

  // Public routes allow
  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }
  console.log("Token in middleware:", req.cookies.get("token"));

  // If no token -> redirect to login
  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ If token exists and user is on login page, redirect to home
  if (token && pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
