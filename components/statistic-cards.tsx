import type { ProductsResponse } from "@/types/product-response";
import { Package2, CircleCheckBig, TriangleAlert, CircleX } from "lucide-react";
import { API_URL } from "@/lib/config";


//Fetch all products from the API and calculate the statistics for the cards

export default async function StatisticCards() {
  const { products }: ProductsResponse = await fetch(
    `${API_URL}/products/?_expand=category`,
      { cache: "no-store" } // Always fetch fresh data so statistic cards update immediately when products change/adds(?) but don't know if this is the best way to do it
  ).then((res) => res.json());

  // Threshold for low stock can be adjusted as needed, currently set to 10 for demonstration purposes
  // const LOW_STOCK_THRESHOLD = 20; doesn't know if we need this since we have availabilityStatus in the db but can be useful if we want to calculate it on the fly instead of storing it in the db

  // Calcuate statistic based ib all products in the database
  const totalProducts = products.length;

  // Products with stock above the threshold
  const inStock = products.filter((p) => p.availabilityStatus === "In Stock").length;
  // Products with stock between 1 and the threshold
  const lowStock = products.filter((p) => p.availabilityStatus === "Low Stock").length;

  // Products with zero stock
  const outOfStock = products.filter((p) => p.availabilityStatus === "Out of Stock").length;
  
  // Create an array of stats to map over when rendering the cards, this way we can easily add more cards in the future if needed without changing the structure of the component
  const stats = [
    {
      title: "Total products",
      value: totalProducts,
      icon: Package2,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "In stock",
      value: inStock,
      icon: CircleCheckBig,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Low stock",
      value: lowStock,
      icon: TriangleAlert,
      bg: "bg-orange-100",
      iconColor: "text-orange-600",
  },
    {
      title: "Out of stock",
      value: outOfStock,
      icon: CircleX,
      bg: "bg-red-100",
      iconColor: "text-red-600",
  },
    
  ]

  return (
    <section className="bg-gray-50 px-6 py-6">

      {/* Grid layout for the cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Render the cards dynamically from stats array */}
        {stats.map((stat) => {

          {/* Assign icon component dynamically */}
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white p-6 rounded-md shadow-sm border border-gray-200 flex justify-between items-start"
            >
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>

              {/* Icon container with dynamic background and icon color */}
              <div className={`${stat.bg} p-4 rounded-lg`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


  // Threshold for low stock can be adjusted as needed, currently set to 10 for demonstration purposes
  // const LOW_STOCK_THRESHOLD = 10;

  // Calcuate statistic based ib all products in the database
  // const totalProducts = products.length;

  // Products with stock above the threshold
  //const inStock = products.filter(
  //  (p) => (p.stock ?? 0) > LOW_STOCK_THRESHOLD
  // ).length;

  // Products with stock between 1 and the threshold
  //const lowStock = products.filter((p) => {
  //  const stock = p.stock ?? 0;
  //  return stock > 0 && stock <= LOW_STOCK_THRESHOLD;
  // }).length;

  // Products with zero stock
  // const outOfStock = products.filter((p) => (p.stock ?? 0) === 0).length;