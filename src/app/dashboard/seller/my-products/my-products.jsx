"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const MyProductsPage = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            fetchProducts();
        }
    }, [user]);

    const fetchProducts = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products/seller/${user.id}`
            );

            const data = await res.json();

            if (data.success) {
                setProducts(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.success) {
                setProducts((prev) =>
                    prev.filter((product) => product._id !== id)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <p className="text-lg font-semibold text-gray-600">
                    Loading products...
                </p>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">My Products</h1>
                    <p className="mt-1 text-gray-500">
                        Manage your listed products
                    </p>
                </div>

                <Link
                    href="/dashboard/seller/add-product"
                    className="rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
                >
                    + Add Product
                </Link>
            </div>

            {/* Empty State */}
            {products.length === 0 ? (
                <div className="rounded-2xl bg-white p-12 text-center shadow">
                    <h2 className="text-2xl font-bold">
                        No Products Found
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Start selling by adding your first product.
                    </p>

                    <Link
                        href="/dashboard/seller/add-product"
                        className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
                    >
                        Add Product
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="overflow-hidden rounded-2xl border bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            {/* Product Image */}
                            <div className="relative">
                                <img
                                    src={
                                        product.images?.[0] ||
                                        "https://via.placeholder.com/400x300"
                                    }
                                    alt={product.title}
                                    className="h-56 w-full object-cover"
                                />

                                {/* Status Badge */}
                                <span
                                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white ${product.sold
                                            ? "bg-red-500"
                                            : "bg-green-500"
                                        }`}
                                >
                                    {product.sold ? "Sold" : "Available"}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="p-5">
                                <h2 className="text-xl font-bold line-clamp-1">
                                    {product.title}
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    Category: {product.category}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Condition: {product.condition}
                                </p>

                                <p className="mt-4 text-2xl font-bold text-green-600">
                                    ৳ {product.price}
                                </p>

                                {/* Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <Link
                                        href={`/dashboard/seller/edit-product/${product._id}`}
                                        className={`flex-1 rounded-lg px-4 py-3 text-center font-semibold transition ${product.sold
                                                ? "pointer-events-none cursor-not-allowed bg-gray-300 text-gray-600"
                                                : "bg-blue-600 text-white hover:bg-blue-700"
                                            }`}
                                    >
                                        Edit
                                    </Link>

                                    {!product.sold && (
                                        <button
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                            className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProductsPage;