import type { Product } from "@/types/product";
import { Package2, CircleCheckBig, TriangleAlert, CircleX } from "lucide-react";

export default function StatisticCards({ products, totalProducts }: { products: Product[]; totalProducts: number }) {

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
      bg: "bg-accent-soft",
      iconColor: "text-accent",
    },
    {
      title: "In stock",
      value: inStock,
      icon: CircleCheckBig,
      bg: "bg-success-soft",
      iconColor: "text-success",
    },
    {
      title: "Low stock",
      value: lowStock,
      icon: TriangleAlert,
      bg: "bg-warning-soft",
      iconColor: "text-warning",
  },
    {
      title: "Out of stock",
      value: outOfStock,
      icon: CircleX,
      bg: "bg-danger-soft",
      iconColor: "text-danger",
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