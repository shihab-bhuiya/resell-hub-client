"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-gray-200 text-sm font-semibold mb-6">
                        Trusted Second-Hand Marketplace
                    </span>

                    <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                        Buy & Sell Quality
                        <span className="block text-green-600">
                            Pre-Owned Products
                        </span>
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                        Discover affordable second-hand products or sell your
                        unused items easily. Save money, reduce waste, and
                        support sustainable living with ReSell Hub.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/products"
                            className="rounded-xl bg-black px-6 py-4 text-white font-semibold hover:bg-gray-800 transition"
                        >
                            Browse Products
                        </Link>

                        <Link
                            href="/dashboard/seller/add-product"
                            className="rounded-xl border border-gray-300 px-6 py-4 font-semibold hover:bg-gray-100 transition"
                        >
                            Start Selling
                        </Link>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-3 gap-4 mt-12"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white shadow rounded-2xl p-5 text-center"
                        >
                            <h3 className="text-2xl font-bold text-green-600">
                                12K+
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Products
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white shadow rounded-2xl p-5 text-center"
                        >
                            <h3 className="text-2xl font-bold text-green-600">
                                5K+
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Sellers
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white shadow rounded-2xl p-5 text-center"
                        >
                            <h3 className="text-2xl font-bold text-green-600">
                                8K+
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Buyers
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"
                        alt="Second hand marketplace"
                        className="w-full rounded-3xl shadow-2xl object-cover"
                    />

                    {/* Floating Card */}
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                        }}
                        className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl px-6 py-4"
                    >
                        <p className="text-sm text-gray-500">
                            Completed Orders
                        </p>
                        <h3 className="text-2xl font-bold text-green-600">
                            9,500+
                        </h3>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;