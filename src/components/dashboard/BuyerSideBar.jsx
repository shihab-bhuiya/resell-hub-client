"use client";

import Link from "next/link";
import { buyerLinks, sellerLinks, adminLinks } from "@/lib/sidebarLinks";

const DashboardSidebar = ({ user }) => {
    let links = [];

    if (user.role === "seller") {
        links = sellerLinks;
    } else if (user.role === "buyer") {
        links = buyerLinks;
    } else if (user.role === "admin") {
        links = adminLinks;
    }

    return (
        <aside className="w-72 min-h-screen border-l-2 p-6">
            <h2 className="text-2xl font-bold mb-8">
                Dashboard
            </h2>

            <div className="space-y-3">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-xl px-4 py-3 hover:bg-white/10"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </aside>
    );
};

export default DashboardSidebar;