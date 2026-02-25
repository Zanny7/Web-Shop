"use client";

import { ArrowUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CategoryFilter from "@/components/search/category-filter";
import SearchBar from "@/components/search/search-bar";
import StatusFilter from "@/components/search/status-filter";

export default function SearchBarWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentOrder = searchParams.get("_order") ?? "desc";

  const toggleOrder = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("_order", currentOrder === "asc" ? "desc" : "asc");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-6 py-4">
      <SearchBar />
      <CategoryFilter />
      <StatusFilter />
      <button
        type="button"
        onClick={toggleOrder}
        className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition"
      >
        <ArrowUpDown size={16} />
        Filter
      </button>
    </div>
  );
}
