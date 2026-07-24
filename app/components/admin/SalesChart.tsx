"use client";

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
  const chartData = months.map((month, index) => {
    const item = data.find(
      (m) => m.month === index
    );

    return {
      month,
      revenue: item?.revenue || 0,
      orders: item?.orders || 0,
    };
  });

  const totalRevenue = chartData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const totalOrders = chartData.reduce(
    (sum, item) => sum + item.orders,
    0
  );

  const averageRevenue =
    totalOrders > 0
      ? Math.round(totalRevenue / totalOrders)
      : 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="flex flex-col gap-6 border-b p-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-xl font-bold text-gray-800">
            Sales Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Monthly revenue & orders
          </p>

        </div>

        <div className="grid grid-cols-3 gap-6">

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
              ₹{averageRevenue.toLocaleString()}
            </h3>

          </div>

        </div>

      </div>

      <div className="h-[420px] w-full p-5">

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
                  stopColor="#16a34a"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#16a34a"
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
              tickFormatter={(value) =>
                `₹${Number(value).toLocaleString()}`
              }
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                stroke: "#16a34a",
                strokeDasharray: "5 5",
              }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
              }}
              formatter={(value, name) => {
                if (String(name) === "revenue") {
                  return [
                    `₹${Number(value).toLocaleString()}`,
                    "Revenue",
                  ] as const;
                }

                return [
                  Number(value),
                  "Orders",
                ] as const;
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#16a34a"
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
              className="rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:border-green-500"
            >
              <p className="text-sm font-medium text-gray-500">
                {item.month}
              </p>

              <h4 className="mt-2 text-lg font-bold text-gray-800">
                ₹{item.revenue.toLocaleString()}
              </h4>

              <p className="mt-1 text-sm text-gray-500">
                {item.orders} Orders
              </p>
            </div>
          ))}

        </div>

      </div>
          </div>
  );
}