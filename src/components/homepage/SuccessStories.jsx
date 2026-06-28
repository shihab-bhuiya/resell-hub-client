"use client";

import { motion } from "framer-motion";

const stories = [
    {
        name: "Rakib Hasan",
        role: "Buyer",
        text: "I bought a laptop at half the original price. Great experience!",
    },
    {
        name: "Nusrat Jahan",
        role: "Seller",
        text: "Sold my old phone within 2 days and earned extra money.",
    },
    {
        name: "Siam Ahmed",
        role: "Buyer",
        text: "ReSell Hub helped me find affordable furniture for my hostel.",
    },
];

const SuccessStories = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center">
                    Success Stories
                </h2>

                <p className="text-center text-gray-500 mt-3">
                    Real stories from buyers and sellers
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    {stories.map((story, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -6 }}
                            className="bg-gray-50 rounded-2xl shadow p-6"
                        >
                            <p className="text-gray-600 italic">
                                "{story.text}"
                            </p>

                            <div className="mt-6">
                                <h3 className="font-bold">
                                    {story.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {story.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;