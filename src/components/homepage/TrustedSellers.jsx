"use client";

import { motion } from "framer-motion";

const sellers = [
    {
        name: "Soikat Hasan",
        products: 45,
    },
    {
        name: "Rakib Hasan",
        products: 31,
    },
    {
        name: "Siam Ahmed",
        products: 28,
    },
];

const TrustedSellers = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center">
                    Trusted Sellers
                </h2>

                <p className="text-center text-gray-500 mt-3">
                    Reliable sellers with strong marketplace reputation
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    {sellers.map((seller, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -8 }}
                            className="bg-gray-50 rounded-2xl shadow p-8 text-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto"></div>

                            <h3 className="mt-5 text-xl font-bold">
                                {seller.name}
                            </h3>

                            <p className="text-gray-500 mt-2">
                                {seller.products} Products Sold
                            </p>

                            <span className="inline-block mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                                Verified Seller
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedSellers;