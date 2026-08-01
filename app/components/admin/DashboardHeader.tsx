"use client";

interface DashboardHeaderProps {
  onRefresh: () => void;
  onLogout: () => void;
}

export default function DashboardHeader({
  onRefresh,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-4xl font-bold text-green-800">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome to Himalayan Roots Admin Panel
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRefresh}
          className="rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          Refresh
        </button>

        <button
          onClick={onLogout}
          className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}