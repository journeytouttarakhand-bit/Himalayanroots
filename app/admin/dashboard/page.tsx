"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/app/components/admin/DashboardHeader";
import DashboardStats from "@/app/components/admin/DashboardStats";
import SalesChart from "@/app/components/admin/SalesChart";
import RecentOrders from "@/app/components/admin/RecentOrders";
import TopProducts from "@/app/components/admin/TopProducts";
import LowStockProducts from "@/app/components/admin/LowStockProducts";
import QuickActions from "@/app/components/admin/QuickActions";

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
  const [data, setData] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadDashboard() {
    try {
      const res = await fetch(
        "/api/admin/dashboard",
        {
          cache: "no-store",
        }
      );

      const json = await res.json();

      setData(json);

    } catch (error) {

      console.error(error);

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

      window.location.href =
        "/admin/login";

    } catch (error) {

      console.error(error);

      alert("Logout Failed");

    }
  }

  if (loading) {
    return (
      <div className="p-8">

        <div className="animate-pulse space-y-6">

          <div className="h-10 w-72 rounded bg-gray-200" />

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {Array.from({ length: 8 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-36 rounded-2xl bg-gray-200"
                />
              )
            )}

          </div>

          <div className="h-[420px] rounded-2xl bg-gray-200" />

        </div>

      </div>
    );
  }

  if (!data?.success) {
    return (
      <div className="flex h-[60vh] items-center justify-center">

        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">

          <h2 className="text-xl font-bold text-red-700">
            Dashboard Load Failed
          </h2>

          <p className="mt-2 text-gray-600">
            Unable to fetch dashboard data.
          </p>

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

      <DashboardStats
        overview={data.overview}
      />

      <div className="grid grid-cols-1 gap-8">

        <SalesChart
          data={data.monthlySales}
        />

      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

        <RecentOrders
          orders={data.recentOrders}
        />

        <QuickActions />

      </div>

      <LowStockProducts
        lowStockProducts={data.lowStockProducts}
        outOfStockProducts={data.outOfStockProducts}
      />

      <TopProducts
        products={data.topProducts}
      />

    </div>
  );
}