"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const MyProductsPage = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchProducts();
    }, []);

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
            <div className="p-6 text-lg font-semibold">
                Loading products...
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">
                    My Products
                </h1>

                <Link
                    href="/dashboard/seller/add-product"
                    className="rounded-lg bg-black px-5 py-3 text-white"
                >
                    Add Product
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="rounded-xl bg-white p-10 text-center shadow">
                    <h2 className="text-2xl font-semibold">
                        No products found
                    </h2>
                    <p className="mt-2 text-gray-500">
                        Add your first product.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="overflow-hidden rounded-2xl bg-white shadow"
                        >
                            <img
                                src={
                                    product.images?.[0] ||
                                    "https://via.placeholder.com/400x300"
                                }
                                alt={product.title}
                                className="h-56 w-full object-cover"
                            />

                            <div className="p-5">
                                <h2 className="text-xl font-bold">
                                    {product.title}
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    {product.category}
                                </p>

                                <p className="mt-1 text-gray-500">
                                    Condition: {product.condition}
                                </p>

                                <p className="mt-4 text-2xl font-bold">
                                    ৳ {product.price}
                                </p>

                                <div className="mt-5 flex gap-3">
                                    <Link
                                        href={`/dashboard/seller/edit-product/${product._id}`}
                                        className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-center text-white"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handleDelete(product._id)
                                        }
                                        className="flex-1 rounded-lg bg-red-600 px-4 py-3 text-white"
                                    >
                                        Delete
                                    </button>
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