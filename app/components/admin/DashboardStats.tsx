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
  CalendarDays,
  BadgePercent,
  Star,
  FileText,
} from "lucide-react";

import StatCard from "./StatCard";

type Overview = {
  totalRevenue?: number;
  todayRevenue?: number;
  averageOrderValue?: number;
  todayOrdersCount?: number;
  totalOrders?: number;
  totalProducts?: number;
  totalCategories?: number;
  totalCustomers?: number;
  pendingOrders?: number;
  deliveredOrders?: number;
  cancelledOrders?: number;
  activeCoupons?: number;
  totalReviews?: number;
  averageRating?: number;
};

type Props = {
  overview?: Overview;
};

export default function DashboardStats({ overview }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value={`₹${(overview?.totalRevenue ?? 0).toLocaleString()}`}
        icon={IndianRupee}
        color="bg-green-600"
      />

      <StatCard
        title="Today's Revenue"
        value={`₹${(overview?.todayRevenue ?? 0).toLocaleString()}`}
        icon={CalendarDays}
        color="bg-emerald-600"
      />

      <StatCard
        title="Average Order"
        value={`₹${(overview?.averageOrderValue ?? 0).toLocaleString()}`}
        icon={IndianRupee}
        color="bg-lime-600"
      />

      <StatCard
        title="Today's Orders"
        value={overview?.todayOrdersCount ?? 0}
        icon={ShoppingCart}
        color="bg-cyan-600"
      />

      <StatCard
        title="Total Orders"
        value={overview?.totalOrders ?? 0}
        icon={ShoppingCart}
        color="bg-blue-600"
      />

      <StatCard
        title="Total Products"
        value={overview?.totalProducts ?? 0}
        icon={Package}
        color="bg-purple-600"
      />

      <StatCard
        title="Categories"
        value={overview?.totalCategories ?? 0}
        icon={FolderTree}
        color="bg-orange-600"
      />

      <StatCard
        title="Customers"
        value={overview?.totalCustomers ?? 0}
        icon={Users}
        color="bg-pink-600"
      />

      <StatCard
        title="Pending Orders"
        value={overview?.pendingOrders ?? 0}
        icon={Clock3}
        color="bg-yellow-500"
      />

      <StatCard
        title="Delivered Orders"
        value={overview?.deliveredOrders ?? 0}
        icon={CheckCircle2}
        color="bg-green-500"
      />

      <StatCard
        title="Cancelled Orders"
        value={overview?.cancelledOrders ?? 0}
        icon={XCircle}
        color="bg-red-600"
      />

      <StatCard
        title="Active Coupons"
        value={overview?.activeCoupons ?? 0}
        icon={BadgePercent}
        color="bg-indigo-600"
      />

      <StatCard
        title="Total Reviews"
        value={overview?.totalReviews ?? 0}
        icon={FileText}
        color="bg-teal-600"
      />

      <StatCard
        title="Average Rating"
        value={`${overview?.averageRating ?? 0} ⭐`}
        icon={Star}
        color="bg-amber-500"
      />
    </div>
  );
}