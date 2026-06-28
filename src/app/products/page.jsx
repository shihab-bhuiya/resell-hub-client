"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products`
            );

            const data = await res.json();

            if (data.success) {
                setProducts(data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const searchText = search.toLowerCase();

            return (
                product.title?.toLowerCase().includes(searchText) ||
                product.category?.toLowerCase().includes(searchText)
            );
        });
    }, [products, search]);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Browse Products
            </h1>

            {/* Search Input */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search by product name or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-96 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition"
                        >
                            <img
                                src={
                                    product.images?.[0] ||
                                    "https://via.placeholder.com/300"
                                }
                                alt={product.title}
                                className="w-full h-52 object-cover"
                            />

                            <div className="p-5">
                                <h2 className="font-bold text-lg">
                                    {product.title}
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    {product.category}
                                </p>

                                <p className="mt-2 font-semibold text-xl">
                                    ৳ {product.price}
                                </p>

                                <Link
                                    href={`/products/${product._id}`}
                                    className="mt-4 block rounded-xl bg-black text-white text-center py-3 hover:bg-gray-800 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <h2 className="text-2xl font-semibold">
                            No products found
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Try searching with another product name or category.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;