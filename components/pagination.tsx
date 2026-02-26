import Link from "next/link";


type Props = {
  
  total: number;
  page: number;
  pages: number;
};

export default function Pagination({ page, total, pages }: Props) {
	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-gray-50 text-sm text-gray-500">
			<p>
				Showing {(page - 1) * 6 + 1} to {Math.min(page * 6, total)} of{" "}
				{total} products
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
										? "bg-accent text-white"
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
		</div>
	);
}