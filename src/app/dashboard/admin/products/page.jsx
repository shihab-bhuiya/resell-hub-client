"use client";

import React, { useEffect, useState } from "react";

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/admin/products`
        );

        const data = await res.json();

        if (data.success) {
            setProducts(data.data);
        }
    };

    const updateStatus = async (id, status) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            }
        );

        fetchProducts();
    };

    const deleteProduct = async (id) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products/${id}`,
            {
                method: "DELETE",
            }
        );

        fetchProducts();
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Manage Products
            </h1>

            <div className="space-y-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-xl shadow p-5 flex justify-between"
                    >
                        <div>
                            <h2 className="font-bold text-lg">
                                {product.title}
                            </h2>
                            <p>Category: {product.category}</p>
                            <p>Price: ৳ {product.price}</p>
                            <p>Seller: {product.name}</p>
                            <p>
                                Status:{" "}
                                {product.status || "pending"}
                            </p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <button
                                onClick={() =>
                                    updateStatus(
                                        product._id,
                                        "approved"
                                    )
                                }
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Approve
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        product._id,
                                        "rejected"
                                    )
                                }
                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>

                            <button
                                onClick={() =>
                                    deleteProduct(product._id)
                                }
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProductsPage;