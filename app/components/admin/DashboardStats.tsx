"use client";

import {
  IndianRupee,
  ShoppingCart,
  Package,
  FolderTree,
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import StatCard from "./StatCard";

type Overview = {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCategories: number;
  totalCustomers: number;
  pendingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
};

type Props = {
  overview: Overview;
};

export default function DashboardStats({
  overview,
}: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Revenue"
        value={`₹${overview.totalRevenue.toLocaleString()}`}
        icon={IndianRupee}
        
        color="bg-green-600"
      />

      <StatCard
        title="Total Orders"
        value={overview.totalOrders}
        icon={ShoppingCart}
        color="bg-blue-600"
      />

      <StatCard
        title="Total Products"
        value={overview.totalProducts}
        icon={Package}
        color="bg-purple-600"
      />

      <StatCard
        title="Categories"
        value={overview.totalCategories}
        icon={FolderTree}
        color="bg-orange-600"
      />

      <StatCard
        title="Customers"
        value={overview.totalCustomers}
        icon={Users}
        color="bg-pink-600"
      />

      <StatCard
        title="Pending Orders"
        value={overview.pendingOrders}
        icon={Clock3}
        color="bg-yellow-500"
      />

      <StatCard
        title="Delivered Orders"
        value={overview.deliveredOrders}
        icon={CheckCircle2}
        color="bg-green-500"
      />

      <StatCard
        title="Cancelled Orders"
        value={overview.cancelledOrders}
        icon={XCircle}
        color="bg-red-600"
      />

    </div>
  );
}