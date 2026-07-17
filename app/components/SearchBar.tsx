"use client";

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="max-w-xl mx-auto mb-10">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border-2 border-green-700 rounded-xl px-5 py-3 text-lg outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}