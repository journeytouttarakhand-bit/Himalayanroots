"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart({ chartData }: { chartData: any[] }) {
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">No Sales Data Available for Chart</p>
      </div>
    );
  }

  return (
    <div className="h-80 w-full min-h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#15803d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#15803d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="date" tickLine={false} stroke="#6b7280" />
          <YAxis
            tickLine={false}
            stroke="#6b7280"
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip
            formatter={(value: any) => [`₹${value.toLocaleString()}`, "Revenue"]}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#15803d"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorSales)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}