"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  search?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  const [internalQuery, setInternalQuery] = useState("");
  const router = useRouter();

  // Determine active search query and updater function
  const query = search !== undefined ? search : internalQuery;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (setSearch) {
      setSearch(value);
    } else {
      setInternalQuery(value);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setSearch && query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleSearchChange}
        className="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-4 pr-10 text-sm text-gray-900 focus:border-green-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-700"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-green-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
          />
        </svg>
      </button>
    </form>
  );
}