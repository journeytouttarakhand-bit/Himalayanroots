import { NextRequest, NextResponse } from "next/server";

export async function middleware(
  request: NextRequest
) {
  const { pathname } = request.nextUrl;

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
  // Prevent Redirect Loop
  // =====================================

  if (
    pathname === "/maintenance"
  ) {
    return NextResponse.next();
  }

  try {

    const response = await fetch(
      `${request.nextUrl.origin}/api/settings`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.next();
    }

    const data = await response.json();

    const settings = data.settings;

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

    /*
     * Apply middleware to all pages except:
     * - API Routes
     * - Next.js Assets
     * - Images
     * - Static Files
     */

    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",

  ],
};