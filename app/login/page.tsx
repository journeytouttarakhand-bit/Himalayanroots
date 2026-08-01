"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Hard redirect to profile so cookies and Header state get fresh load
      window.location.href = "/profile";
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-lg items-center justify-center px-6 py-16">
      <div className="w-full rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-green-900">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-700 py-4 font-bold text-white transition hover:bg-green-800 disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-green-700 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?
          <Link
            href="/signup"
            className="ml-2 font-bold text-green-700 hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}