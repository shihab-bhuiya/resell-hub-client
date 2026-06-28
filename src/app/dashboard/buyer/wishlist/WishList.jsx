"use client";

import React, { useEffect, useState } from "react";

const WishlistPage = ({ user }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/wishlist/${user.id}`
        );

        const data = await res.json();
        console.log("Dataa", data);

        if (data.success) {
            setWishlist(data.data);
        }
    };

    const removeWishlist = async (id) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/wishlist/${id}`,
            {
                method: "DELETE"
            }
        );

        fetchWishlist();
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">
                Wishlist
            </h1>

            {wishlist.length === 0 ? (
                <p>No saved products</p>
            ) : (
                <div className="space-y-4">
                    {wishlist.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-xl shadow p-5"
                        >
                            <p>Product ID: {item.productId}</p>

                            <button
                                onClick={() =>
                                    removeWishlist(item._id)
                                }
                                className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;