"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const PopularCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/categories`
            );

            const data = await res.json();

            if (data.success) {
                setCategories(data.data.slice(0, 6));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center">
                    Popular Categories
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Link
                                href={`/categories/${encodeURIComponent(category)}`}
                                className="block bg-white shadow rounded-2xl p-8 text-center"
                            >
                                <h3 className="text-xl font-bold">
                                    {category}
                                </h3>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;