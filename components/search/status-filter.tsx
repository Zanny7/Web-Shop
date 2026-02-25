"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function StatusFilter() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const currentStatus = searchParams.get("availabilityStatus") ?? "";

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

	return (
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
	);
}
