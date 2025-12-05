import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  const isAuthPage = path === "/login" || path === "/register";
  const isPrivateRoute =
    path === "/cart" || path === "/place" || path === "/profile";

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/shop", "/cart", "/place", "/profile"],
};
