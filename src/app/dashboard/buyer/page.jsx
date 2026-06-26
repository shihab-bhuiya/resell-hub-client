import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

const BuyerPage = async () => {
    const user = await getUserSession();

    if (user.role !== "buyer") {
        redirect("/unauthorized");
    }

    return (
        <div className="space-y-8 p-6">
            <h1 className="text-3xl font-bold">
                Buyer Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <Link
                    href="/dashboard/buyer/orders"
                    className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition"
                >
                    <h2 className="text-xl font-semibold">
                        My Orders
                    </h2>
                    <p className="mt-2 text-gray-500">
                        View purchased products
                    </p>
                </Link>

                <Link
                    href="/dashboard/buyer/wishlist"
                    className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition"
                >
                    <h2 className="text-xl font-semibold">
                        Wishlist
                    </h2>
                    <p className="mt-2 text-gray-500">
                        Saved products
                    </p>
                </Link>

                <Link
                    href="/dashboard/buyer/tracking"
                    className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition"
                >
                    <h2 className="text-xl font-semibold">
                        Tracking
                    </h2>
                    <p className="mt-2 text-gray-500">
                        Track delivery status
                    </p>
                </Link>

                <Link
                    href="/dashboard/buyer/profile"
                    className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition"
                >
                    <h2 className="text-xl font-semibold">
                        Profile
                    </h2>
                    <p className="mt-2 text-gray-500">
                        Manage account
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default BuyerPage;