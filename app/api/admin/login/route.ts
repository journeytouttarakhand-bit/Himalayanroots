import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Environment variables with fallback defaults
    const validUsername = process.env.ADMIN_USERNAME || "admin@himalayanroots.in";
    const validPassword = process.env.ADMIN_PASSWORD || "123456";

    if (username === validUsername && password === validPassword) {
      const response = NextResponse.json({
        success: true,
        message: "Login successful",
      });

      response.cookies.set({
        name: "admin-auth",
        value: "authenticated",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid Username or Password",
      },
      {
        status: 401,
      }
    );
  } catch (error) {
    console.error("Login API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Login Failed",
      },
      {
        status: 500,
      }
    );
  }
}