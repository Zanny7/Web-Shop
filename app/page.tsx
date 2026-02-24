import { Suspense } from "react";
import SearchBar from "@/components/search/search-bar";
import type { ProductsResponse } from "@/types/product-response";
import Header from "@/components/header";
import Table from "@/components/table";

const API_URL = "http://localhost:4000";
const defaultLimit = "6";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { q } = await searchParams;
	const { page: urlPage } = await searchParams;

	const searchQuery = q && typeof q === "string" ? `&q=${q}` : "";
	const currentPage =
		urlPage && typeof urlPage === "string" ? Number(urlPage) : 1;

	// we use the fetch() method to get the products from the API
	// in this fetch we sort using _sort and _order and we limit the number of products using _limit
	// we also use _expand to get the relational category data
	// we can use the other destructed variables like page, total and so on to create pagination or show info

	const { products, total, page, pages, limit }: ProductsResponse =
		await fetch(
			`${API_URL}/products/?_limit=${defaultLimit}&_page=${currentPage}&_sort=id&_order=desc&_expand=category${searchQuery}`,
		).then((res) => res.json());

	console.log(products);

	return (
		<main>
			<h1>Products</h1>
			<Header />
			<Suspense>
				<SearchBar />
			</Suspense>
			<div>
				{products.map((product) => (
					<h2 key={product.id}>
						{product.title} - {product.category?.name}
					</h2>
				))}
			</div>

			<Table
				products={products}
				total={total}
				page={currentPage}
				pages={pages}
			/>
		</main>
	);
}
