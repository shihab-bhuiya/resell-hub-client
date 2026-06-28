"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StatisticsSection = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/stats`
            );

            const data = await res.json();

            if (data.success) {
                setStats(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const statCards = stats
        ? [
            { label: "Products", value: stats.totalProducts },
            { label: "Sellers", value: stats.totalSellers },
            { label: "Buyers", value: stats.totalBuyers },
            { label: "Orders", value: stats.completedOrders },
        ]
        : [];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center">
                    Marketplace Statistics
                </h2>

                <div className="grid md:grid-cols-4 gap-6 mt-12">
                    {statCards.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl shadow p-8 text-center"
                        >
                            <h3 className="text-4xl font-bold text-green-600">
                                {item.value}
                            </h3>

                            <p className="mt-3 text-gray-500">
                                {item.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatisticsSection;