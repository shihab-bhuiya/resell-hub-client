"use client";

import React, { useEffect, useState } from "react";

const BuyerOverviewPage = ({ user }) => {
    const [overview, setOverview] = useState(null);

    useEffect(() => {
        fetchOverview();
    }, []);

    const fetchOverview = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/buyer-overview/${user.id}`
        );

        const data = await res.json();

        if (data.success) {
            setOverview(data.data);
        }
    };

    if (!overview) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold">
                Buyer Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                <Card title="Total Orders" value={overview.totalOrders} />
                <Card title="Pending Orders" value={overview.pendingOrders} />
                <Card title="Completed" value={overview.completedOrders} />
                <Card title="Wishlist" value={overview.wishlistCount} />
                <Card title="Total Spent" value={`৳ ${overview.totalSpent}`} />
            </div>
        </div>
    );
};

const Card = ({ title, value }) => {
    return (
        <div className="rounded-2xl bg-white shadow p-6">
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-3xl font-bold mt-3">
                {value}
            </h2>
        </div>
    );
};

export default BuyerOverviewPage;