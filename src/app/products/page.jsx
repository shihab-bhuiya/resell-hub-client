"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

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
        let filtered = products.filter((product) => {
            const searchText = search.toLowerCase();

            return (
                product.title?.toLowerCase().includes(searchText) ||
                product.category?.toLowerCase().includes(searchText)
            );
        });

        switch (sort) {
            case "low-high":
                filtered.sort((a, b) => a.price - b.price);
                break;

            case "high-low":
                filtered.sort((a, b) => b.price - a.price);
                break;

            case "a-z":
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;

            case "z-a":
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;

            default:
                break;
        }

        return filtered;
    }, [products, search, sort]);

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Browse Products</h1>
                <p className="mt-2 text-gray-500">
                    Search and sort products to find exactly what you're looking
                    for.
                </p>
            </div>

            {/* Search & Sort */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <input
                    type="text"
                    placeholder="Search by product name or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-96 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                >
                    <option value="">Sort By</option>
                    <option value="low-high">Price: Low → High</option>
                    <option value="high-low">Price: High → Low</option>
                    <option value="a-z">Name: A → Z</option>
                    <option value="z-a">Name: Z → A</option>
                </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <img
                                src={
                                    product.images?.[0] ||
                                    "https://via.placeholder.com/300"
                                }
                                alt={product.title}
                                className="h-52 w-full object-cover"
                            />

                            <div className="p-5">
                                <h2 className="truncate text-lg font-bold">
                                    {product.title}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {product.category}
                                </p>

                                <p className="mt-3 text-2xl font-bold text-green-600">
                                    ৳ {product.price}
                                </p>

                                <Link
                                    href={`/products/${product._id}`}
                                    className="mt-5 block rounded-xl bg-black py-3 text-center font-semibold text-white transition hover:bg-gray-800"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-2xl bg-gray-50 py-20 text-center">
                        <h2 className="text-2xl font-bold text-gray-800">
                            No Products Found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Try another search term or choose a different sorting
                            option.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;