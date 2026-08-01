"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, CheckCircle2, Loader2 } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMsg(data.message || "Failed to reset password.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!email) {
    return (
      <div className="text-center py-10 text-red-600 font-bold">
        Invalid Password Reset Link.
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-lg items-center justify-center px-6 py-16">
      <div className="w-full rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        <h1 className="mb-2 text-center text-3xl font-bold text-emerald-950">
          Set New Password
        </h1>
        <p className="mb-8 text-center text-xs text-gray-500">
          Resetting password for <span className="font-bold text-emerald-900">{email}</span>
        </p>

        {success ? (
          <div className="rounded-xl bg-green-50 p-6 text-center border border-green-200 space-y-3">
            <CheckCircle2 size={40} className="mx-auto text-green-700" />
            <h3 className="font-bold text-green-950 text-base">Password Updated!</h3>
            <p className="text-xs text-green-800">
              Your password has been changed successfully. Redirecting to login page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="rounded-xl bg-red-50 p-3.5 text-xs font-medium text-red-700 border border-red-200">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3.5 pl-11 text-sm focus:border-emerald-700 focus:outline-none"
                  required
                />
                <Lock size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3.5 pl-11 text-sm focus:border-emerald-700 focus:outline-none"
                  required
                />
                <Lock size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-800 py-3.5 font-bold text-white transition hover:bg-emerald-900 disabled:bg-gray-400 cursor-pointer shadow-md mt-2"
            >
              {loading ? "Updating Password..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex h-96 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-emerald-800" /></div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}