"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);

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
                setProducts(data.data.slice(0, 8));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center">
                    Featured Products
                </h2>

                <p className="text-gray-500 text-center mt-3 mb-12">
                    Discover top second-hand deals from trusted sellers
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <motion.div
                            key={product._id}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-2xl shadow overflow-hidden"
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
                                <h3 className="font-bold truncate">
                                    {product.title}
                                </h3>

                                <p className="text-gray-500 text-sm mt-1">
                                    {product.category}
                                </p>

                                <p className="text-green-600 font-bold text-2xl mt-3">
                                    ৳ {product.price}
                                </p>

                                <Link
                                    href={`/products/${product._id}`}
                                    className="block mt-4 bg-black text-white text-center py-3 rounded-xl"
                                >
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;