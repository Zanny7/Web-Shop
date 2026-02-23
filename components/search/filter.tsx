"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import type { Category } from "@/types/category";

type Props = {
	categories: Category[];
};

export default function Filter({ categories }: Props) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const currentCategory = searchParams.get("categoryId") ?? "";
	const currentStatus = searchParams.get("availabilityStatus") ?? "";
	const hasActiveFilters = currentCategory || currentStatus;

	const updateParam = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}
		params.delete("page");
		router.replace(`${pathname}?${params.toString()}`);
	};

	const clearAllFilters = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("categoryId");
		params.delete("availabilityStatus");
		params.delete("page");
		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		<>
			<select
				value={currentCategory}
				onChange={(e) => updateParam("categoryId", e.target.value)}
				className="rounded-lg border border-gray-200 bg-white py-2 px-4 text-sm text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
			>
				<option value="">All categories</option>
				{categories.map((cat) => (
					<option key={cat.id} value={String(cat.id)}>
						{cat.name}
					</option>
				))}
			</select>

			<select
				value={currentStatus}
				onChange={(e) => updateParam("availabilityStatus", e.target.value)}
				className="rounded-lg border border-gray-200 bg-white py-2 px-4 text-sm text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
			>
				<option value="">All status</option>
				<option value="In Stock">In stock</option>
				<option value="Low Stock">Low stock</option>
				<option value="Out of Stock">Out of stock</option>
			</select>

			<button
				type="button"
				onClick={hasActiveFilters ? clearAllFilters : undefined}
				className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition"
			>
				{hasActiveFilters ? <X size={16} /> : <SlidersHorizontal size={16} />}
				{hasActiveFilters ? "Clear" : "Filter"}
			</button>
		</>
	);
}
