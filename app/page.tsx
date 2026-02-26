import { Suspense } from "react";
import Header from "@/components/header";
import SearchBarWrapper from "@/components/search/wrapper";
import StatisticCards from "@/components/statistic-cards";
import Table from "@/components/table";
import type { ProductsResponse } from "@/types/product-response";

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
  const currentPage = urlPage && typeof urlPage === "string" ? Number(urlPage) : 1;

  const { categoryId, availabilityStatus, _order } = await searchParams;
  const order = typeof _order === "string" ? _order : "desc";
  const categoryQuery = categoryId && typeof categoryId === "string" ? `&categoryId=${categoryId}` : "";
  const statusQuery =
    availabilityStatus && typeof availabilityStatus === "string" ? `&availabilityStatus=${availabilityStatus}` : "";

  // we use the fetch() method to get the products from the API
  // in this fetch we sort using _sort and _order and we limit the number of products using _limit
  // we also use _expand to get the relational category data
  // we can use the other destructed variables like page, total and so on to create pagination or show info

  const { products, total, page, pages, limit }: ProductsResponse = await fetch(
    `${API_URL}/products/?_limit=${defaultLimit}&_page=${currentPage}&_sort=id&_order=${order}&_expand=category${searchQuery}${categoryQuery}${statusQuery}`,
  ).then((res) => res.json());

  console.log(products);

	return (
    
      <main className="w-full p-5">
        <Header />

        <div className="">
        <StatisticCards products={products} />
        <Suspense>
          <SearchBarWrapper />
        </Suspense>

        <Table
          products={products}
          total={total}
          page={currentPage}
          pages={pages}
        />
        </div>
      </main>
  
  );
}
