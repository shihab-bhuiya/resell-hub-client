"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products`
        );

        const data = await res.json();

        if (data.success) {
            setProducts(data.data);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">
                Browse Products
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-2xl shadow overflow-hidden"
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
                            <h2 className="font-bold">
                                {product.title}
                            </h2>

                            <p className="text-gray-500 mt-1">
                                {product.category}
                            </p>

                            <p className="mt-2 font-semibold">
                                ৳ {product.price}
                            </p>

                            <Link
                                href={`/products/${product._id}`}
                                className="mt-4 block rounded-xl bg-black text-white text-center py-3"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;