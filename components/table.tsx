import Link from "next/link";
import { Trash2, SquarePen } from "lucide-react";
import type { Product } from "@/types/product";

type Props = {
	products: Product[];
	total: number;
	page: number;
	pages: number;
};

export default function Table({ products, total, page, pages }: Props) {
	const getStatus = (stock?: number) => {
		if (!stock || stock === 0)
			return (
				<span className="text-red-600 font-medium">Out of stock</span>
			);
		if (stock < 20)
			return (
				<span className="text-orange-500 font-medium">Low stock</span>
			);
		return <span className="text-green-600 font-medium">In stock</span>;
	};

	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="bg-white rounded-xl border border-gray-200 shadow-sm">
				{/* ================= MOBILE CARDS ================= */}
				<div className="md:hidden divide-y divide-gray-200">
					{products.map((product) => (
						<div key={product.id} className="p-4">
							<div className="flex gap-4">
								<img
									src={
										product.thumbnail || product.images?.[0]
									}
									alt={product.title}
									className="h-16 w-16 rounded-lg object-cover"
								/>
								<div className="flex-1">
									<p className="font-medium text-gray-900">
										{product.title}
									</p>
									<p className="text-xs text-gray-500">
										SKU: {product.sku}
									</p>
								</div>
							</div>

							<div className="mt-3 text-sm space-y-1">
								<p>
									<span className="font-medium">
										Category:
									</span>{" "}
									{product.category?.name}
								</p>
								<p>
									<span className="font-medium">Price:</span>{" "}
									{product.price} kr
								</p>
								<p>
									<span className="font-medium">Stock:</span>{" "}
									{product.stock}
								</p>
								<p>{getStatus(product.stock)}</p>
							</div>

							<div className="mt-3 flex justify-end gap-2">
								<button className="p-2 rounded-md text-purple-600 hover:bg-purple-600 hover:text-white transition">
									<SquarePen size={18} />
								</button>
								<button className="p-2 rounded-md text-[#DC2626] hover:bg-[#DC2626] hover:text-white transition">
									<Trash2 size={18} />
								</button>
							</div>
						</div>
					))}
				</div>

				{/* ================= DESKTOP TABLE ================= */}
				<div className="hidden md:block overflow-x-auto">
					<table className="w-full text-sm">
						<thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
							<tr>
								<th className="px-6 py-4 text-left">Product</th>
								<th className="px-6 py-4 text-left">
									Category
								</th>
								<th className="px-6 py-4 text-left">Price</th>
								<th className="px-6 py-4 text-left">Stock</th>
								<th className="px-6 py-4 text-left">Status</th>
								<th className="px-6 py-4 text-right">
									Actions
								</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-gray-200">
							{products.map((product) => (
								<tr
									key={product.id}
									className="hover:bg-gray-50 transition"
								>
									<td className="px-6 py-5">
										<div className="flex items-center gap-4">
											<img
												src={
													product.thumbnail ||
													product.images?.[0]
												}
												alt={product.title}
												className="h-12 w-12 rounded-lg object-cover bg-gray-100"
											/>
											<div>
												<p className="font-medium text-gray-900">
													{product.title}
												</p>
												<p className="text-gray-500 text-xs">
													SKU: {product.sku}
												</p>
											</div>
										</div>
									</td>

									<td className="px-6 py-5 text-gray-700">
										{product.category?.name}
									</td>

									<td className="px-6 py-5 font-medium">
										{product.price} kr
									</td>

									<td className="px-6 py-5">
										{product.stock}
									</td>

									<td className="px-6 py-5">
										{getStatus(product.stock)}
									</td>

									<td className="px-6 py-5 text-right">
										<div className="flex justify-end gap-1">
											<button className="p-2 rounded-md text-purple-600 hover:bg-purple-600 hover:text-white transition">
												<SquarePen size={18} />
											</button>
											<button className="p-2 rounded-md text-[#DC2626] hover:bg-[#DC2626] hover:text-white transition">
												<Trash2 size={18} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* ================= PAGINATION ================= */}
				<footer className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-gray-50 text-sm text-gray-500">
					<p>
						Showing {(page - 1) * 6 + 1} to{" "}
						{Math.min(page * 6, total)} of {total} products
					</p>

					<div className="flex items-center gap-2 flex-wrap justify-center">
						{page > 1 && (
							<Link
								href={`?page=${page - 1}`}
								className="px-3 py-1 rounded-md border bg-white hover:bg-gray-100"
							>
								Previous
							</Link>
						)}

						{(() => {
							const visiblePages = 3;
							const pagesArray = [];
							const start = Math.max(1, page - visiblePages);
							const end = Math.min(pages, page + visiblePages);

							if (start > 1) {
								pagesArray.push(1);
								if (start > 2) pagesArray.push("...");
							}

							for (let i = start; i <= end; i++) {
								pagesArray.push(i);
							}

							if (end < pages) {
								if (end < pages - 1) pagesArray.push("...");
								pagesArray.push(pages);
							}

							return pagesArray.map((item, index) =>
								item === "..." ? (
									<span key={index} className="px-2">
										...
									</span>
								) : (
									<Link
										key={index}
										href={`?page=${item}`}
										className={`px-3 py-1 rounded-md ${
											Number(page) === Number(item)
												? "bg-purple-600 text-white"
												: "border bg-white hover:bg-gray-100"
										}`}
									>
										{item}
									</Link>
								),
							);
						})()}

						{page < pages && (
							<Link
								href={`?page=${page + 1}`}
								className="px-3 py-1 rounded-md border bg-white hover:bg-gray-100"
							>
								Next
							</Link>
						)}
					</div>
				</footer>
			</div>
		</div>
	);
}
