import type { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function StatisticCards({ products }: Props) {
  const LOW_STOCK_THRESHOLD = 10;

  const totalProducts = products.length;

  const inStock = products.filter(
    (p) => (p.stock ?? 0) > LOW_STOCK_THRESHOLD
  ).length;

  const lowStock = products.filter((p) => {
    const stock = p.stock ?? 0;
    return stock > 0 && stock <= LOW_STOCK_THRESHOLD;
  }).length;

  const outOfStock = products.filter((p) => (p.stock ?? 0) === 0).length;

  return (
    <section className="bg-gray-50 px-6 py-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Total products</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              {totalProducts}
            </h3>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg text-xl">📦</div>
        </div>

        {/* In stock */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">In stock</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              {inStock}
            </h3>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-xl">✅</div>
        </div>

        {/* Low stock */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Low stock</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              {lowStock}
            </h3>
          </div>
          <div className="bg-orange-100 p-4 rounded-lg text-xl">⚠️</div>
        </div>

        {/* Out of stock */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Out of stock</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              {outOfStock}
            </h3>
          </div>
          <div className="bg-red-100 p-4 rounded-lg text-xl">❌</div>
        </div>
      </div>
    </section>
  );
}

// första utkast på statistik-kort, inte kopplat till någon databas än, hårdkodade värden

/* export default function StatisticCards() {
  
    const cards = [
    {
      title: "Total products",
      value: 248,
      color: "bg-purple-100",
      icon: "📦",
    },
    {
      title: "In stock",
      value: 189,
      color: "bg-green-100",
      icon: "✅",
    },
    {
      title: "Low stock",
      value: 34,
      color: "bg-orange-100",
      icon: "⚠️",
    },
    {
      title: "Out of stock",
      value: 25,
      color: "bg-red-100",
      icon: "❌",
    },
  ]; */// första utkast på statistik-kort, inte kopplat till någon databas än, hårdkodade värden

/* export default function StatisticCards() {
  
    const cards = [
    {
      title: "Total products",
      value: 248,
      color: "bg-purple-100",
      icon: "📦",
    },
    {
      title: "In stock",
      value: 189,
      color: "bg-green-100",
      icon: "✅",
    },
    {
      title: "Low stock",
      value: 34,
      color: "bg-orange-100",
      icon: "⚠️",
    },
    {
      title: "Out of stock",
      value: 25,
      color: "bg-red-100",
      icon: "❌",
    },
  ]; */