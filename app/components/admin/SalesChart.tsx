"use client";

import { useMemo, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type MonthlySale = {
  month: number;
  revenue: number;
  orders: number;
};

type Props = {
  data: MonthlySale[];
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function SalesChart({
  data,
}: Props) {

  const [view, setView] = useState<
    "revenue" | "orders"
  >("revenue");

  const chartData = useMemo(() => {

    return months.map(
      (month, index) => {

        const item = data.find(
          (m) => m.month === index
        );

        return {

          month,

          revenue:
            item?.revenue || 0,

          orders:
            item?.orders || 0,

        };

      }
    );

  }, [data]);

  const totalRevenue =
    chartData.reduce(
      (sum, item) =>
        sum + item.revenue,
      0
    );

  const totalOrders =
    chartData.reduce(
      (sum, item) =>
        sum + item.orders,
      0
    );

  const averageOrderValue =
    totalOrders > 0
      ? Math.round(
          totalRevenue /
            totalOrders
        )
      : 0;

  return (

    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="flex flex-col gap-6 border-b p-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Sales Analytics
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Revenue & Orders Overview
          </p>

        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() =>
              setView("revenue")
            }
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              view === "revenue"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Revenue
          </button>

          <button
            onClick={() =>
              setView("orders")
            }
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              view === "orders"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Orders
          </button>

        </div>

      </div>

      <div className="grid grid-cols-3 gap-6 border-b p-6">
                <div>

          <p className="text-xs uppercase tracking-wide text-gray-500">
            Revenue
          </p>

          <h3 className="mt-1 text-2xl font-bold text-green-600">
            ₹{totalRevenue.toLocaleString()}
          </h3>

        </div>

        <div>

          <p className="text-xs uppercase tracking-wide text-gray-500">
            Orders
          </p>

          <h3 className="mt-1 text-2xl font-bold text-blue-600">
            {totalOrders}
          </h3>

        </div>

        <div>

          <p className="text-xs uppercase tracking-wide text-gray-500">
            Avg Order
          </p>

          <h3 className="mt-1 text-2xl font-bold text-orange-600">
            ₹{averageOrderValue.toLocaleString()}
          </h3>

        </div>

      </div>

      <div className="h-[430px] w-full p-5">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 25,
              left: 0,
              bottom: 0,
            }}
          >

            <defs>

              <linearGradient
                id="salesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor={
                    view === "revenue"
                      ? "#16a34a"
                      : "#2563eb"
                  }
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor={
                    view === "revenue"
                      ? "#16a34a"
                      : "#2563eb"
                  }
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#6b7280",
                fontSize: 13,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{
                fill: "#6b7280",
                fontSize: 13,
              }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                view === "revenue"
                  ? `₹${Number(value).toLocaleString()}`
                  : String(value)
              }
            />

            <Tooltip
              cursor={{
                stroke:
                  view === "revenue"
                    ? "#16a34a"
                    : "#2563eb",
                strokeDasharray: "5 5",
              }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [

                view === "revenue"
                  ? `₹${Number(value).toLocaleString()}`
                  : Number(value),

                view === "revenue"
                  ? "Revenue"
                  : "Orders",

              ]}
            />

            <Area
              type="monotone"
              dataKey={view}
              stroke={
                view === "revenue"
                  ? "#16a34a"
                  : "#2563eb"
              }
              strokeWidth={3}
              fill="url(#salesGradient)"
              activeDot={{
                r: 6,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      <div className="border-t px-6 py-5">

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {chartData.map((item) => (

            <div
              key={item.month}
              className="rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:border-green-500 hover:shadow-sm"
            >

              <p className="text-sm font-medium text-gray-500">
                {item.month}
              </p>

              <h4 className="mt-2 text-lg font-bold text-gray-800">

                {view === "revenue"
                  ? `₹${item.revenue.toLocaleString()}`
                  : item.orders}

              </h4>

              <p className="mt-1 text-sm text-gray-500">

                {view === "revenue"
                  ? `${item.orders} Orders`
                  : `₹${item.revenue.toLocaleString()}`}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}