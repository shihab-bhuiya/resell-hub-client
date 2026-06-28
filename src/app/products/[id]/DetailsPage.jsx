/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const ProductDetailsPage = ({ user }) => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products/${id}`
            );

            const data = await res.json();

            if (data.success) {
                setProduct(data.data);
            } else {
                toast.error("Product not found");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load product");
        } finally {
            setLoading(false);
        }
    };

    const handleWishlist = async () => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/wishlist`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        buyerId: user.id,
                        productId: product._id,
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const handlePayment = async () => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        setProcessing(true);

        try {
            const response = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: product._id,
                    productName: product.title,
                    productPrice: product.price,
                    buyerId: user.id,
                    buyerName: user.name,
                    buyerEmail: user.email,
                    sellerId: product.userId,
                    sellerName: product.name,
                }),
            });
            console.log("product.userId", product.userId)

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error(data.message || "Unable to create payment session");
                console.log(data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Payment failed");
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    if (!product) {
        return <div className="p-6 text-center">Product not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="grid md:grid-cols-2 gap-10">
                {/* Product Image */}
                <div>
                    <img
                        src={
                            product.images?.[0] ||
                            "https://via.placeholder.com/500"
                        }
                        alt={product.title}
                        className="w-full rounded-2xl shadow-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-5">
                    <h1 className="text-4xl font-bold">{product.title}</h1>

                    <p className="text-gray-500">
                        Category: {product.category}
                    </p>

                    <p className="text-gray-500">
                        Condition: {product.condition}
                    </p>

                    <h2 className="text-3xl font-bold text-green-600">
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
                        <h3 className="font-semibold mb-2">Description</h3>

                        <p className="text-gray-600">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handlePayment}
                            disabled={processing}
                            className="flex-1 rounded-xl bg-black text-white py-4 font-semibold disabled:opacity-50"
                        >
                            {processing ? "Processing..." : "Buy Now"}
                        </button>

                        <button
                            onClick={handleWishlist}
                            className="flex-1 rounded-xl border py-4 font-semibold hover:bg-gray-100"
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