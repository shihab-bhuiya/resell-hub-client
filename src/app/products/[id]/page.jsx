"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductDetailsPage = ({ params }) => {
    const { id } = useParams();
    console.log("IDDD", id);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products/${id}`
            );

            const data = await res.json();

            if (data.success) {
                setProduct(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!product) {
        return <div className="p-6">Product not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="grid md:grid-cols-2 gap-10">
                {/* Left Side */}
                <div>
                    <img
                        src={
                            product.images?.[0] ||
                            "https://via.placeholder.com/500"
                        }
                        alt={product.title}
                        className="w-full rounded-2xl shadow"
                    />
                </div>

                {/* Right Side */}
                <div className="space-y-5">
                    <h1 className="text-4xl font-bold">
                        {product.title}
                    </h1>

                    <p className="text-gray-500">
                        Category: {product.category}
                    </p>

                    <p className="text-gray-500">
                        Condition: {product.condition}
                    </p>

                    <h2 className="text-3xl font-bold">
                        ৳ {product.price}
                    </h2>

                    <div className="bg-gray-100 rounded-xl p-4">
                        <h3 className="font-semibold mb-2">
                            Seller Information
                        </h3>

                        <p>Name: {product.name}</p>
                        <p>Email: {product.email}</p>
                        <p>Phone: {product.phone}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">
                            Description
                        </h3>

                        <p className="text-gray-600">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 rounded-xl bg-black text-white py-4 font-semibold">
                            Buy Now
                        </button>

                        <button className="flex-1 rounded-xl border py-4 font-semibold">
                            Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;