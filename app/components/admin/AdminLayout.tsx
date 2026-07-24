"use client";

import { useState } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({
  children,
}: AdminLayoutProps) {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ========================= */}
      {/* Desktop Sidebar */}
      {/* ========================= */}

      <div className="hidden lg:block">

        <AdminSidebar />

      </div>

      {/* ========================= */}
      {/* Mobile Sidebar */}
      {/* ========================= */}

      {sidebarOpen && (

        <>

          <div
            onClick={() =>
              setSidebarOpen(false)
            }
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />

          <div className="fixed left-0 top-0 z-50 lg:hidden">

            <AdminSidebar />

          </div>

        </>

      )}

      {/* ========================= */}
      {/* Main Content */}
      {/* ========================= */}

      <div className="flex min-h-screen flex-1 flex-col">

        <AdminTopbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />
                <main className="flex-1 overflow-x-auto p-4 lg:p-8">

          <div className="mx-auto w-full max-w-[1700px]">

            {children}

          </div>

        </main>

      </div>

    </div>
      );
}