"use client";

import { getSession } from "@/lib/core/session";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductDetailsPage = ({ params, user }) => {
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

    const handleWishlist = async () => {
        if (!user) {
            alert("Please login first");
            return;
        }

        const wishlistData = {
            buyerId: user.id,
            productId: product._id,
        };

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/wishlist`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(wishlistData),
            }
        );

        const data = await res.json();

        toast(data.message);
    };

    const handleBuyNow = async () => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        const orderData = {
            buyerId: user.id,
            buyerName: user.name,
            sellerId: product.userId,
            sellerName: product.name,
            productId: product._id,
            productTitle: product.title,
            productPrice: product.price,
        };

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/orders`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            }
        );

        const data = await res.json();

        if (data.success) {
            toast.success("Order created successfully");
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
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 rounded-xl bg-black text-white py-4 font-semibold"
                        >
                            Buy Now
                        </button>

                        <button
                            onClick={handleWishlist}
                            className="flex-1 rounded-xl border py-4 font-semibold"
                        >
                            Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;