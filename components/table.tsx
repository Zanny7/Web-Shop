"use client";

import Link from "next/link";
import { Trash2, SquarePen } from "lucide-react";
import type { Product } from "@/types/product";
import Pagination from "./pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
	products: Product[];
	total: number;
	page: number;
	pages: number;
};

export default function Table({ products, total, page, pages }: Props) {
	const router = useRouter();

	const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

	const handleEdit = (product: Product) => {
		setEditingId(product.id);
		setFormData({ ...product });
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!formData) return;

    const { name, value } = e.target;
    
		if (name === "categoryName") {
			setFormData({
				...formData,
				category: formData.category
					? {
							...formData.category,
							name: value,
						}
					: undefined,
			});
			return;
		}

		setFormData({
			...formData,
			[name]:
				name === "price" || name === "stock" ? Number(value) : value,
		});
	};

	const handleSave = async () => {
   
    	if (!editingId || !formData) return;

		const original = products.find((p) => p.id === editingId);

		const updatedProduct = {
			...original,
			...formData,
		};

		await fetch(`http://localhost:4000/products/${editingId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedProduct),
		});

    setEditingId(null);
    setFormData(null);
		router.refresh();
  };

  const handleDelete = async () => {
		if (!deleteId) return;

		await fetch(`http://localhost:4000/products/${deleteId}`, {
			method: "DELETE",
		});

		// if the deleted row was being edited
		if (editingId === deleteId) {
			setEditingId(null);
			setFormData(null);
		}

		setDeleteId(null);
		router.refresh();
  };
  

	const handleCancel = () => {
		setEditingId(null);
	};

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
								<button
									type="button"
									onClick={() => handleEdit(product)}
									className="p-2 rounded-md text-purple-600 hover:bg-purple-600 hover:text-white transition"
								>
									<SquarePen size={18} />
								</button>
								<button
									type="button"
									onClick={() => setDeleteId(product.id)}
									className="p-2 rounded-md text-[#DC2626] hover:bg-[#DC2626] hover:text-white transition"
								>
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
											{editingId === product.id ? (
												<input
													name="thumbnail"
													value={
														formData?.thumbnail ??
														""
													}
													onChange={handleChange}
													placeholder="Image URL"
													className="border rounded px-2 py-1 text-xs w-32"
												/>
											) : (
												<img
													src={
														product.thumbnail ||
														product.images?.[0]
													}
													alt={product.title}
													className="h-12 w-12 rounded-lg object-cover bg-gray-100"
												/>
											)}
											<div>
												{editingId === product.id ? (
													<input
														name="title"
														value={
															formData?.title ??
															""
														}
														onChange={handleChange}
														className="border rounded px-2 py-1 text-sm w-full"
													/>
												) : (
													<p className="font-medium text-gray-900">
														{product.title}
													</p>
												)}

												{editingId === product.id ? (
													<input
														name="sku"
														value={
															formData?.sku ?? ""
														}
														onChange={handleChange}
														className="border rounded px-2 py-1 text-xs w-40 mt-1"
													/>
												) : (
													<p className="text-gray-500 text-xs">
														SKU: {product.sku}
													</p>
												)}
											</div>
										</div>
									</td>

									<td className="px-6 py-5 text-gray-700">
										{editingId === product.id ? (
											<input
												name="categoryName"
												value={
													formData?.category?.name ||
													""
												}
												onChange={handleChange}
												className="border rounded px-2 py-1 text-sm w-40"
											/>
										) : (
											product.category?.name
										)}
									</td>

									<td className="px-6 py-5 font-medium">
										{editingId === product.id ? (
											<input
												name="price"
												value={formData?.price ?? ""}
												onChange={handleChange}
												className="border rounded px-2 py-1 text-sm w-24"
											/>
										) : (
											`${product.price} kr`
										)}
									</td>

									<td className="px-6 py-5">
										{editingId === product.id ? (
											<input
												name="stock"
												value={formData?.stock ?? ""}
												onChange={handleChange}
												className="border rounded px-2 py-1 text-sm w-20"
											/>
										) : (
											product.stock
										)}
									</td>

									<td className="px-6 py-5">
										{getStatus(product.stock)}
									</td>

									<td className="px-6 py-5 text-right">
										<div className="flex justify-end gap-1">
											{editingId === product.id ? (
												<>
													<button
														type="button"
														onClick={handleSave}
														className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded"
													>
														Save
													</button>
													<button
														type="button"
														onClick={handleCancel}
														className="px-2 py-1 text-xs bg-gray-400 hover:bg-gray-500 text-white rounded"
													>
														Cancel
													</button>
												</>
											) : (
												<button
													type="button"
													onClick={() =>
														handleEdit(product)
													}
													className="p-2 rounded-md text-purple-600 hover:bg-purple-600 hover:text-white transition"
												>
													<SquarePen size={18} />
												</button>
											)}

											<button
												type="button"
												onClick={() =>
													setDeleteId(product.id)
												}
												className="p-2 rounded-md text-[#DC2626] hover:bg-[#DC2626] hover:text-white transition"
											>
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
				<Pagination page={page} total={total} pages={pages} />

				{/* ================= DELETE CONFIRMATION MODAL ================= */}
				{deleteId && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
						<div className="bg-white rounded-lg shadow-lg w-96 p-6">
							<h2 className="text-lg font-semibold text-gray-900">
								Delete product?
							</h2>
							<p className="text-sm text-gray-600 mt-2">
								This action cannot be undone.
							</p>

							<div className="mt-6 flex justify-end gap-3">
								<button
									onClick={() => setDeleteId(null)}
									className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
								>
									Cancel
								</button>

								<button
									onClick={handleDelete}
									className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
