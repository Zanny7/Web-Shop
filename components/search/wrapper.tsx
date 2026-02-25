"use client";

import SearchBar from "@/components/search/search-bar";
import Filter from "@/components/search/filter";

export default function SearchFilterBar() {
	return (
		<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-6 py-4">
			<SearchBar />
			<Filter />
		</div>
	);
}
