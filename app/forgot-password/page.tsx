"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMsg(data.message || "Failed to send reset link.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-lg items-center justify-center px-6 py-16">
      <div className="w-full rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        <div className="mb-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-bold text-green-800 hover:underline"
          >
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </div>

        <h1 className="mb-2 text-center text-3xl font-bold text-green-950">
          Forgot Password?
        </h1>
        <p className="mb-8 text-center text-xs text-gray-500">
          Enter your registered email address to receive password reset instructions.
        </p>

        {submitted ? (
          <div className="rounded-xl bg-green-50 p-6 text-center border border-green-200 space-y-3">
            <CheckCircle2 size={40} className="mx-auto text-green-700" />
            <h3 className="font-bold text-green-950 text-base">Reset Link Sent!</h3>
            <p className="text-xs text-green-800">
              We've sent password reset instructions to <span className="font-bold">{email}</span>. Please check your inbox.
            </p>
            <Link
              href="/login"
              className="inline-block mt-4 rounded-xl bg-green-800 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-green-900"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="rounded-xl bg-red-50 p-3.5 text-xs font-medium text-red-700 border border-red-200">
                {errorMsg}
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-4 pl-11 text-sm focus:border-green-700 focus:outline-none"
                required
              />
              <Mail size={18} className="absolute left-4 top-4 text-gray-400" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-800 py-4 font-bold text-white transition hover:bg-green-900 disabled:bg-gray-400 cursor-pointer shadow-md"
            >
              {loading ? "Sending Link..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}