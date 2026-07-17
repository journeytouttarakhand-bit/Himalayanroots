"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");

    if (loggedIn === "true") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const adminEmail = "admin@himalayanroots.in";
    const adminPassword = "123456";

    if (
      email.trim().toLowerCase() === adminEmail &&
      password.trim() === adminPassword
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          Himalayan Roots
        </h1>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

        </form>

        <div className="mt-8 text-sm text-gray-600 text-center">
          <p>
            Demo Email:
            <span className="font-semibold">
              {" "}admin@himalayanroots.in
            </span>
          </p>

          <p>
            Demo Password:
            <span className="font-semibold">
              {" "}123456
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}