import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-start justify-between border-b border-gray-200 bg-white px-6 py-6">
      
      {/* vänster sida */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Product management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your store inventory</p>
      </div>

      {/* höger sida */}
      <Link className="bg-purple-700 rounded p-4" href="/products/create">+ Add Product</Link>
      {/* <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
        <span className="text-lg leading-none">+</span>
        Add Product
        </button> */}
    </header>
  );
}