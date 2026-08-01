"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminLayout from "@/app/components/admin/AdminLayout";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Check karein ki user Login screen par hai ya nahi
  const isLoginPage = pathname === "/admin" || pathname === "/admin/login";

  // Agar user login page par hai, toh Admin Sidebar/Header bilkul mat dikhao
  if (isLoginPage) {
    return <main className="min-h-screen bg-slate-100">{children}</main>;
  }

  // Logged-in admin routes (/admin/dashboard, /admin/cms, etc.) ke liye hi Sidebar & Header dikhao
  return <AdminLayout>{children}</AdminLayout>;
}