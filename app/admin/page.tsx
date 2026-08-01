"use client";

import { useState } from "react";
import { Lock, User, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMsg(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // Hard redirect to clear client cache and enforce server layout checks
      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-emerald-50 text-emerald-800 shadow-sm border border-emerald-100 mb-2">
            <ShieldCheck className="h-8 w-8" strokeWidth={2.2} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-green-950 tracking-tight">
            Himalayan Roots
          </h1>

          <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
            Admin Portal Access
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold p-3.5 rounded-xl text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Username Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:bg-white focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none transition"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-900 focus:bg-white focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white py-3.5 rounded-xl font-bold shadow-md shadow-emerald-900/10 transition duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <span>Access Dashboard →</span>
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-400">
            Protected area • Authorized Himalayan Roots admins only
          </p>
        </div>

      </div>
    </div>
  );
}