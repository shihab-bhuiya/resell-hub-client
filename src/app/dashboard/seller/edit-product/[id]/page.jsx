"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EditProductPage = () => {
    const params = useParams();
    const router = useRouter();
    const productId = params.id;

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Fetch existing product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products/${productId}`
                );

                const data = await res.json();

                if (data.success) {
                    reset({
                        title: data.data.title,
                        category: data.data.category,
                        condition: data.data.condition,
                        price: data.data.price,
                        phone: data.data?.sellerInfo?.phone || "",
                        description: data.data.description,
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId, reset]);

    const onSubmit = async (formData) => {
        try {
            setUpdating(true);

            const updatedProduct = {
                title: formData.title,
                category: formData.category,
                condition: formData.condition,
                price: Number(formData.price),
                description: formData.description,
                phone: formData.phone,
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products/${productId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProduct),
                }
            );

            const result = await response.json();

            if (result.success) {
                toast("Product updated successfully");
                router.push("/dashboard/seller/my-products");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="p-10 text-xl font-semibold">
                Loading product...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
            <h1 className="text-3xl font-bold mb-8">
                Edit Product
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Title */}
                <div>
                    <label className="block mb-2 font-medium">
                        Product Title
                    </label>

                    <input
                        {...register("title", {
                            required: "Title is required",
                        })}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-2 font-medium">
                        Category
                    </label>

                    <select
                        {...register("category", {
                            required: true,
                        })}
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        <option value="">Select Category</option>
                        <option>Electronics</option>
                        <option>Furniture</option>
                        <option>Books</option>
                        <option>Fashion</option>
                    </select>
                </div>

                {/* Condition */}
                <div>
                    <label className="block mb-2 font-medium">
                        Condition
                    </label>

                    <select
                        {...register("condition", {
                            required: true,
                        })}
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        <option value="">Select Condition</option>
                        <option>Like New</option>
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Fair</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-2 font-medium">
                        Price
                    </label>

                    <input
                        type="number"
                        {...register("price", {
                            required: true,
                        })}
                        className="w-full border rounded-lg px-4 py-3"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block mb-2 font-medium">
                        Phone Number
                    </label>

                    <input
                        {...register("phone")}
                        className="w-full border rounded-lg px-4 py-3"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-2 font-medium">
                        Description
                    </label>

                    <textarea
                        rows={6}
                        {...register("description", {
                            required: true,
                        })}
                        className="w-full border rounded-lg px-4 py-3"
                    />
                </div>

                <button
                    disabled={updating}
                    className="w-full bg-black text-white py-4 rounded-xl font-semibold disabled:opacity-50"
                >
                    {updating ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default EditProductPage;