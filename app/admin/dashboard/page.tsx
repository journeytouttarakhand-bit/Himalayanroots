"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import DashboardHeader from "@/app/components/admin/DashboardHeader";
import DashboardStats from "@/app/components/admin/DashboardStats";
import RecentOrders from "@/app/components/admin/RecentOrders";
import TopProducts from "@/app/components/admin/TopProducts";
import LowStockProducts from "@/app/components/admin/LowStockProducts";
import QuickActions from "@/app/components/admin/QuickActions";

// Recharts Next.js Hydration & SSR issue se bachne ke liye dynamic import
const SalesChart = dynamic(() => import("@/app/components/admin/SalesChart"), {
  ssr: false,
  loading: () => (
    <div className="flex h-80 items-center justify-center rounded-2xl bg-gray-50 text-gray-400 font-semibold border border-gray-200">
      Loading Sales Analytics Chart...
    </div>
  ),
});

type DashboardData = {
  success: boolean;

  overview: {
    totalRevenue: number;
    todayRevenue: number;
    averageOrderValue: number;
    todayOrdersCount: number;
    totalOrders: number;
    totalProducts: number;
    totalCategories: number;
    totalCustomers: number;
    pendingOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    activeCoupons: number;
    totalReviews: number;
    averageRating: number;
  };

  monthlySales: {
    month: number;
    revenue: number;
    orders: number;
  }[];

  recentOrders: any[];
  lowStockProducts: any[];
  outOfStockProducts: any[];

  topProducts: {
    name: string;
    image: string;
    sold: number;
    revenue: number;
  }[];
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      const res = await fetch("/api/admin/dashboard", {
        cache: "no-store",
      });

      const json = await res.json();
      if (json.success) {
        setData(json);
      } else {
        console.error("API returned failure:", json.message);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function handleRefresh() {
    setLoading(true);
    await loadDashboard();
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      window.location.href = "/admin/login";
    } catch (error) {
      console.error(error);
      alert("Logout Failed");
    }
  }

  // Monthly Sales Chart Data Formatting (0-11 numbers to Month Names)
  const formattedChartData =
    data?.monthlySales && data.monthlySales.length > 0
      ? data.monthlySales.map((item) => {
          const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];
          return {
            date: monthNames[item.month] || `M${item.month + 1}`,
            sales: item.revenue || 0,
          };
        })
      : [];

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-72 rounded bg-gray-200" />

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-36 rounded-2xl bg-gray-200"
              />
            ))}
          </div>

          <div className="h-[420px] rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!data?.success) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-red-700">
            Dashboard Load Failed
          </h2>
          <p className="mt-2 text-gray-600">
            Unable to fetch dashboard data or database is unreachable.
          </p>
          <button
            onClick={handleRefresh}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <DashboardHeader
        onRefresh={handleRefresh}
        onLogout={handleLogout}
      />

      {/* 1. Overview Cards */}
      <DashboardStats overview={data.overview} />

      {/* 2. Sales Chart Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Sales Analytics
        </h2>
        <SalesChart chartData={formattedChartData} />
      </div>

      {/* 3. Recent Orders & Quick Actions Grid */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentOrders orders={data.recentOrders} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* 4. Low Stock Alerts */}
      <LowStockProducts
        lowStockProducts={data.lowStockProducts}
        outOfStockProducts={data.outOfStockProducts}
      />

      {/* 5. Top Products */}
      <TopProducts products={data.topProducts} />
    </div>
  );
}