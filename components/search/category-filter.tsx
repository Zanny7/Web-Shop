"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Category } from "@/types/category";

const API_URL = "http://localhost:4000";

export default function CategoryFilter() {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		fetch(`${API_URL}/categories`)
			.then((res) => res.json())
			.then(setCategories);
	}, []);

	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const currentCategory = searchParams.get("categoryId") ?? "";

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
			value={currentCategory}
			onChange={(e) => updateParam("categoryId", e.target.value)}
			className="rounded-lg border border-gray-200 bg-white py-2 px-4 text-sm text-gray-700 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
		>
			<option value="">All categories</option>
			{categories.map((cat) => (
				<option key={cat.id} value={String(cat.id)}>
					{cat.name}
				</option>
			))}
		</select>
	);
}
