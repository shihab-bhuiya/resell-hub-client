"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const BuyerOverviewPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (user?.id) {
            fetchOverview();
        }
    }, [user]);

    const fetchOverview = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/buyer/overview/${user.id}`
            );

            const data = await res.json();

            if (data.success) {
                setStats(data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (!stats) {
        return (
            <div className="p-6 text-xl">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">
                Buyer Dashboard
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                />

                <StatCard
                    title="Pending Orders"
                    value={stats.pendingOrders}
                />

                <StatCard
                    title="Wishlist Items"
                    value={stats.wishlistItems}
                />

                <StatCard
                    title="Payments Done"
                    value={stats.paidOrders}
                />
            </div>

            <div className="mt-10 bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Welcome Back
                </h2>

                <p className="text-gray-600">
                    Manage your orders, wishlist, payments, and
                    profile from your buyer dashboard.
                </p>
            </div>
        </div>
    );
};

const StatCard = ({ title, value }) => {
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">{title}</p>
            <h2 className="text-4xl font-bold mt-3">
                {value}
            </h2>
        </div>
    );
};

export default BuyerOverviewPage;