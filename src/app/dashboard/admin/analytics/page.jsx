"use client";

import React from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const userGrowthData = [
    { month: "Jan", users: 40 },
    { month: "Feb", users: 80 },
    { month: "Mar", users: 130 },
    { month: "Apr", users: 190 },
    { month: "May", users: 260 },
];

const monthlyOrders = [
    { month: "Jan", orders: 20 },
    { month: "Feb", orders: 45 },
    { month: "Mar", orders: 60 },
    { month: "Apr", orders: 80 },
    { month: "May", orders: 100 },
];

const categoryPerformance = [
    { category: "Electronics", sales: 80 },
    { category: "Furniture", sales: 40 },
    { category: "Books", sales: 25 },
    { category: "Fashion", sales: 50 },
];

const revenueData = [
    { name: "Electronics", value: 400 },
    { name: "Furniture", value: 300 },
    { name: "Books", value: 150 },
    { name: "Fashion", value: 250 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const AnalyticsPage = () => {
    return (
        <div className="p-6 space-y-10">
            <h1 className="text-3xl font-bold">
                Platform Analytics
            </h1>

            {/* User Growth */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    User Growth Chart
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="users"
                            stroke="#3B82F6"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Monthly Orders */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Monthly Orders Chart
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyOrders}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="orders" fill="#10B981" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Category Performance
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryPerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#F59E0B" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Top Categories */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Top Categories
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={revenueData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label
                        >
                            {revenueData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsPage;