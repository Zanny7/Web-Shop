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

  const currentPage = urlPage && typeof urlPage === "string" ? Number(urlPage) : 1;

  const { categoryId, availabilityStatus, _order } = await searchParams;
  const order = typeof _order === "string" ? _order : "desc";

  const params = new URLSearchParams({
    _limit: defaultLimit,
    _page: String(currentPage),
    _sort: "id",
    _order: order,
    _expand: "category",
  });
  if (q && typeof q === "string") params.set("q", q);
  if (categoryId && typeof categoryId === "string") params.set("categoryId", categoryId);
  if (availabilityStatus && typeof availabilityStatus === "string")
    params.set("availabilityStatus", availabilityStatus);

  // we use the fetch() method to get the products from the API
  // in this fetch we sort using _sort and _order and we limit the number of products using _limit
  // we also use _expand to get the relational category data
  // we can use the other destructed variables like page, total and so on to create pagination or show info

  const { products, total, page, pages, limit }: ProductsResponse = await fetch(
    `${API_URL}/products/?${params.toString()}`,
  ).then((res) => res.json());

  console.log(products);

  return (
    <main className="w-full p-5">
      <Header />
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
    </main>
  );
}
