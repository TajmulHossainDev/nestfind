"use client";

import { FiSearch } from "react-icons/fi";

export interface Filters {
  search: string;
  category: string;
  maxPrice: number;
  sort: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const categories = ["all", "apartment", "house", "room", "studio", "villa"];
const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-4 sm:flex-row sm:items-center sm:gap-3">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-foreground/10 px-3 py-2">
        <FiSearch className="text-foreground/40" />
        <input
          type="text"
          placeholder="Search by title or location..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
        />
      </div>

      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
        className="rounded-xl border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground outline-none"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c === "all"
              ? "All categories"
              : c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>

      <div className="flex min-w-[180px] items-center gap-2">
        <label className="whitespace-nowrap text-xs text-foreground/60">
          Up to ৳{filters.maxPrice.toLocaleString()}
        </label>
        <input
          type="range"
          min={500}
          max={50000}
          step={500}
          value={filters.maxPrice}
          onChange={(e) =>
            onChange({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="w-full accent-accent"
        />
      </div>

      <select
        value={filters.sort}
        onChange={(e) => onChange({ ...filters, sort: e.target.value })}
        className="rounded-xl border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground outline-none"
      >
        {sortOptions.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
