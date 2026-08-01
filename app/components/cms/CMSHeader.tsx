"use client";

interface CMSHeaderProps {
  title: string;
  description: string;
}

export default function CMSHeader({
  title,
  description,
}: CMSHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-4 rounded-2xl border bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      <div>

        <h1 className="text-4xl font-bold text-green-900">
          {title}
        </h1>

        <p 
          className="mt-3 max-w-3xl text-gray-500"
          suppressHydrationWarning
        >
          {description}
        </p>

      </div>

      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-green-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 7h16M4 12h16M4 17h16"
          />
        </svg>

      </div>

    </div>
  );
}