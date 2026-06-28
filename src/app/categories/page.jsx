"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

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
                setCategories(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-10 text-center">
                Loading categories...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    Browse Categories
                </h1>

                <p className="text-gray-500 mt-2">
                    Explore products by category.
                </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        href={`/categories/${encodeURIComponent(category)}`}
                        className="bg-white rounded-2xl shadow p-8 hover:shadow-xl transition text-center"
                    >
                        <h2 className="text-2xl font-bold">
                            {category}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;