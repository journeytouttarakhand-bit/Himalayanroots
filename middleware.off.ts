import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // =====================================
  // 1. Next.js Static Assets & Favicon Exclude
  // =====================================
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // =====================================
  // 2. Admin Panel Authentication Guard
  // =====================================
  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin-auth")?.value;
    const isLoginPage = pathname === "/admin" || pathname === "/admin/login";

    // Agar token NAHI hai aur user protected admin dashboard/CMS khol raha hai
    if (!adminToken && !isLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // Agar token PAILE SE HAI aur user login page khol raha hai
    if (adminToken && isLoginPage) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  }

  // =====================================
  // 3. Customer Protected Routes Guard
  // =====================================
  const protectedRoutes = ["/profile", "/checkout", "/my-orders"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // =====================================
  // 4. Maintenance Mode Guard
  // =====================================
  if (pathname === "/maintenance" || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  try {
    const response = await fetch(`${request.nextUrl.origin}/api/settings`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.next();
    }

    const data = await response.json();
    const settings = data.settings;

    if (settings?.maintenanceMode) {
      return NextResponse.redirect(new URL("/maintenance", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Maintenance Middleware Error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};