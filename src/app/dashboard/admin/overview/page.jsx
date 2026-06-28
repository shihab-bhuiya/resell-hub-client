"use client";
import React, { useEffect, useState } from "react";

const AdminPage = () => {
    const [overview, setOverview] = useState(null);

    useEffect(() => {
        fetchOverview();
    }, []);

    const fetchOverview = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/admin/overview`
        );

        const data = await res.json();

        if (data.success) {
            setOverview(data.data);
        }
    };

    if (!overview) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">
                Admin Dashboard
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
                <Card
                    title="Total Users"
                    value={overview.totalUsers}
                />
                <Card
                    title="Total Products"
                    value={overview.totalProducts}
                />
                <Card
                    title="Total Orders"
                    value={overview.totalOrders}
                />
            </div>
        </div>
    );
};

const Card = ({ title, value }) => (
    <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500">{title}</p>
        <h2 className="text-4xl font-bold mt-3">{value}</h2>
    </div>
);

export default AdminPage;