import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/auth";

export async function middleware(
  request: NextRequest
) {
  const { pathname } =
    request.nextUrl;

  // =====================================
  // Allow Admin Panel
  // =====================================

  if (
    pathname.startsWith("/admin")
  ) {
    return NextResponse.next();
  }

  // =====================================
  // Allow API Routes
  // =====================================

  if (
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // =====================================
  // Allow Next.js Assets
  // =====================================

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // =====================================
  // Customer Protected Routes
  // =====================================

  const protectedRoutes = [
    "/profile",
    "/checkout",
    "/my-orders",
  ];

  const isProtected =
    protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

  if (isProtected) {

    const token =
      request.cookies.get("token")
        ?.value;

    if (!token) {

      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );

    }

    const decoded =
      verifyToken(token);

    if (!decoded) {

      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );

    }

  }

  // =====================================
  // Prevent Redirect Loop
  // =====================================

  if (
    pathname === "/maintenance"
  ) {
    return NextResponse.next();
  }

  // =====================================
  // Maintenance Mode
  // =====================================

  try {

    const response =
      await fetch(
        `${request.nextUrl.origin}/api/settings`,
        {
          cache: "no-store",
        }
      );

    if (!response.ok) {
      return NextResponse.next();
    }

    const data =
      await response.json();

    const settings =
      data.settings;

    if (
      settings?.maintenanceMode
    ) {

      return NextResponse.redirect(
        new URL(
          "/maintenance",
          request.url
        )
      );

    }

    return NextResponse.next();

  } catch (error) {

    console.error(
      "Maintenance Middleware Error:",
      error
    );

    return NextResponse.next();

  }

}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};