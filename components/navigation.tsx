"use client"
import { useState, useRef, useEffect } from "react";
import { Package2, User, Users, ChartLine, ShoppingCart, Settings, Menu } from "lucide-react";
import Link from "next/link";


export default function Navigation() {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event:MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { name: "Products", icon: <Package2 size={20} />, href: "" },
        { name: "Analytics", icon: <ChartLine size={20} />, href: "" },
        { name: "Orders", icon: <ShoppingCart size={20} />, href: "" },
        { name: "Customers", icon: <Users size={20} />, href: "" },
        { name: "Settings", icon: <Settings size={20} />, href: "" },
    ];

    return (
		<>
			{/* Hamburger Menu */}
			<div ref={menuRef} className="absolute m-2">
				<button
					className="block md:hidden cursor-pointer p-1 focus:bg-black focus:text-white focus:rounded-sm"
					type="button"
					onClick={() => setIsOpen(!isOpen)}
				>
					<Menu size={28} />
				</button>

				{isOpen && (
					<div className="relative top-2 -left-3 border-r border-y bg-white shadow-lg rounded-md p-4">
						<ul>
							{menuItems.map((item) => (
								<li key={item.name}>
									<Link
										href={item.href}
										className="flex items-center py-1 px-2 rounded-md focus:outline-none focus:bg-[rgb(117,73,148)] focus:text-white"
									>
										<span className="mr-3">
											{item.icon}
										</span>
										<span className="text-xl">
											{item.name}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			{/* Normal Navigation */}
            <nav className="hidden md:flex flex-col w-50 min-h-screen border-r border-gray-300 bg-white">
                {/* Added border and padding instead of margin and a div for the line */}
				<header className="p-5 flex flex-col border-b border-gray-300">
					<h1 className="text-2xl font-bold">Webbutiken</h1>
					<span className=" text-md text-black/50">Admin panel</span>
                </header>
                
                {/* <div className="w-full h-px bg-gray-300" /> */}
                
				<ul className="p-5 flex flex-col gap-3 flex-1">
					{menuItems.map((item) => (
						<li key={item.name}>
							<Link
								href={item.href}
								className="flex items-center py-1 px-2 rounded-md focus:outline-none focus:bg-[rgb(117,73,148)] focus:text-white"
							>
								<span className="mr-3">{item.icon}</span>
								<span className="text-xl">{item.name}</span>
							</Link>
						</li>
					))}
				</ul>
				{/* <div className="w-full h-px bg-gray-300"/> */}

				{/* Added border and padding instead of a div and margin */}
				<footer className="py-5 px-3 flex gap-3 border-t border-gray-300">
					<div className="flex my-auto ring-1 rounded-full">
						<User size={40} className="" />
					</div>
					<div className="flex flex-col">
						<span className="text-lg h-6">Admin User</span>
						<span className="text-xs text-black/70">
							admin@webbutiken.se
						</span>
					</div>
				</footer>
			</nav>
		</>
	);
}


