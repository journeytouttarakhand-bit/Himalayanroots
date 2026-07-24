"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  LogOut,
  ChevronRight,
  Mountain,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const router = useRouter();

  const menu = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "Products",
      href: "/admin/products",
      icon: Package,
    },

    {
      title: "Categories",
      href: "/admin/categories",
      icon: FolderTree,
    },

    {
      title: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
    },

    {
      title: "Customers",
      href: "/admin/customers",
      icon: Users,
    },

    {
      title: "Website Settings",
      href: "/admin/settings",
      icon: Settings,
    },

    {
      title: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
    },
  ];

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      router.push("/admin/login");

      router.refresh();

    } catch (error) {
      console.error(error);

      alert("Logout Failed");
    }
  }

  return (
    <aside className="flex h-screen w-72 flex-col bg-green-900 text-white shadow-2xl">

      <div className="border-b border-green-800 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-white p-2 text-green-800">

            <Mountain size={30} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Himalayan Roots
            </h2>

            <p className="text-sm text-green-200">
              Admin Panel
            </p>

          </div>

        </div>

      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-5">
                {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 ${
                active
                  ? "bg-white text-green-800 shadow-lg"
                  : "text-green-100 hover:bg-green-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-4">

                <Icon size={21} />

                <span className="font-medium">
                  {item.title}
                </span>

              </div>

              <ChevronRight
                size={18}
                className={`transition-transform duration-300 ${
                  active
                    ? "translate-x-1"
                    : "group-hover:translate-x-1"
                }`}
              />

            </Link>
          );
        })}

      </nav>

      <div className="border-t border-green-800 p-5">

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>
          </aside>
  );
}