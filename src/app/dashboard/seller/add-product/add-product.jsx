"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddProductPage = ({ user }) => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // Get selected image
            const imageFile = data.image[0];

            if (!imageFile) {
                toast.error("Please select an image");
                return;
            }

            // Upload image to ImgBB
            const formData = new FormData();
            formData.append("image", imageFile);

            const imageUploadResponse = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const imageResult = await imageUploadResponse.json();

            if (!imageResult.success) {
                throw new Error("Image upload failed");
            }

            // Image URL from ImgBB
            const imageUrl = imageResult.data.url;

            // Product Data
            const productData = {
                title: data.title,
                category: data.category,
                condition: data.condition,
                price: Number(data.price),
                description: data.description,
                userId: user.id,
                name: user.name,
                email: user.email,
                phone: data.phone,
                images: [imageUrl], // Store image URL
            };

            console.log(productData);

            // Save product to database
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/products`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(productData),
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Failed to add product");
            }

            toast.success("Product Added Successfully");
            reset();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
            <h1 className="text-3xl font-bold mb-8">
                Add New Product
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Product Title */}
                <div>
                    <label className="block mb-2 font-medium">
                        Product Title
                    </label>
                    <input
                        {...register("title", {
                            required: "Title is required",
                        })}
                        className="w-full border rounded-lg px-4 py-3"
                        placeholder="Used Dell Laptop"
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
                        placeholder="35000"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block mb-2 font-medium">
                        Phone Number
                    </label>

                    <input
                        {...register("phone", {
                            required: true,
                        })}
                        className="w-full border rounded-lg px-4 py-3"
                        placeholder="+8801XXXXXXXXX"
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="block mb-2 font-medium">
                        Product Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", {
                            required: "Product image is required",
                        })}
                        className="w-full"
                    />

                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.image.message}
                        </p>
                    )}
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
                        placeholder="Write detailed product description..."
                    />
                </div>

                {/* Button */}
                <button
                    disabled={loading}
                    className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? "Adding Product..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;