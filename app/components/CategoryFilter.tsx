"use client";

import { Dispatch, SetStateAction } from "react";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>> | ((category: string) => void);
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => setSelectedCategory(category)}
          className={`px-5 py-2 rounded-full font-semibold transition cursor-pointer ${
            selectedCategory === category
              ? "bg-green-700 text-white shadow-sm"
              : "bg-white border border-green-700 text-green-700 hover:bg-green-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}