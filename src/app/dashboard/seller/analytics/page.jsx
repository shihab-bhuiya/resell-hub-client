"use client";

import React, { useEffect, useState } from "react";

const AnalyticsPage = ({ user }) => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/analytics/seller/${user.id}`
            );

            const data = await res.json();

            if (data.success) {
                setAnalytics(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-6">Loading analytics...</div>;
    }

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold">Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Orders */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-gray-500 text-sm">
                        Total Orders
                    </h3>
                    <p className="text-3xl font-bold mt-3">
                        {analytics.totalOrders}
                    </p>
                </div>

                {/* Total Sales */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-gray-500 text-sm">
                        Total Sales
                    </h3>
                    <p className="text-3xl font-bold mt-3">
                        {analytics.totalSales}
                    </p>
                </div>

                {/* Pending Orders */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-gray-500 text-sm">
                        Pending Orders
                    </h3>
                    <p className="text-3xl font-bold mt-3">
                        {analytics.pendingOrders}
                    </p>
                </div>

                {/* Revenue */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-gray-500 text-sm">
                        Total Revenue
                    </h3>
                    <p className="text-3xl font-bold mt-3">
                        ৳ {analytics.totalRevenue}
                    </p>
                </div>
            </div>

            {/* Extra Insights */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Business Insights
                </h2>

                <ul className="space-y-3 text-gray-600">
                    <li>
                        Completed Sales: {analytics.totalSales}
                    </li>
                    <li>
                        Orders Waiting Action: {analytics.pendingOrders}
                    </li>
                    <li>
                        Average Revenue Per Sale: ৳{" "}
                        {analytics.totalSales > 0
                            ? Math.round(
                                analytics.totalRevenue /
                                analytics.totalSales
                            )
                            : 0}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AnalyticsPage;