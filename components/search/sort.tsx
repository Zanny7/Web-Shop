"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

type Props = {
	field: string;
	label: string;
};

export default function Sort({ field, label }: Props) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const currentSort = searchParams.get("_sort");
	const currentOrder = searchParams.get("_order") ?? "asc";
	const isActive = currentSort === field;

	const handleSort = () => {
		const params = new URLSearchParams(searchParams.toString());

		if (isActive && currentOrder === "asc") {
			params.set("_sort", field);
			params.set("_order", "desc");
		} else if (isActive && currentOrder === "desc") {
			params.delete("_sort");
			params.delete("_order");
		} else {
			params.set("_sort", field);
			params.set("_order", "asc");
		}

		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		<button
			type="button"
			onClick={handleSort}
			className="inline-flex items-center gap-1 uppercase tracking-wider hover:text-gray-700 transition cursor-pointer"
		>
			{label}
			{isActive ? (
				currentOrder === "asc" ? (
					<ArrowUp size={14} />
				) : (
					<ArrowDown size={14} />
				)
			) : (
				<ArrowUpDown size={14} className="text-gray-300" />
			)}
		</button>
	);
}
