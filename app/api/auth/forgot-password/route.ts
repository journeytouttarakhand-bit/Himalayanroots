import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import User from "@/database/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email address is required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "No account found with this email address." },
        { status: 404 }
      );
    }

    // 1. Nodemailer Transporter Configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // 2. Generate Reset Link
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${appUrl}/reset-password?email=${encodeURIComponent(user.email)}`;

    // 3. Email Template
    const mailOptions = {
      from: `"Himalayan Roots" <${process.env.EMAIL_SERVER_USER}>`,
      to: user.email,
      subject: "Password Reset Request - Himalayan Roots",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px;">
          <h2 style="color: #064e3b; text-align: center;">Himalayan Roots</h2>
          <p>Hello <b>${user.name}</b>,</p>
          <p>We received a request to reset your password. Click the button below to set a new password for your account:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #065f46; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">Reset Password</a>
          </div>
          <p style="font-size: 12px; color: #666;">If you didn't request this password reset, you can safely ignore this email.</p>
        </div>
      `,
    };

    // 4. Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Password reset link has been sent to your Gmail inbox.",
    });
  } catch (error: any) {
    console.error("Forgot password email error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to send email. Check SMTP settings.",
      },
      { status: 500 }
    );
  }
}