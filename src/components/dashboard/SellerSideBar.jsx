"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    {
        label: "Overview",
        href: "/dashboard/seller",
    },
    {
        label: "Add Product",
        href: "/dashboard/seller/add-product",
    },
    {
        label: "My Products",
        href: "/dashboard/seller/my-products",
    },
    {
        label: "Orders",
        href: "/dashboard/seller/orders",
    },
    {
        label: "Analytics",
        href: "/dashboard/seller/analytics",
    },
    {
        label: "Profile",
        href: "/dashboard/seller/profile",
    },
];

export default function SellerSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 min-h-screen border-r bg-white p-5">
            <h2 className="text-2xl font-bold mb-8">
                Seller Dashboard
            </h2>

            <div className="space-y-2">
                {menuItems.map((item) => {
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block rounded-lg px-4 py-3 ${active
                                    ? "bg-black text-white"
                                    : "hover:bg-gray-100"
                                }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}