"use client";

import React, { useEffect, useState } from "react";

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/orders`
        );

        const data = await res.json();

        if (data.success) {
            setOrders(data.data);
        }
    };

    const updateStatus = async (id, orderStatus) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/orders/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderStatus }),
            }
        );

        const data = await res.json();

        if (data.success) {
            // Remove from UI only
            setOrders((prevOrders) =>
                prevOrders.filter((order) => order._id !== id)
            );
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Manage Orders
            </h1>

            {orders.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    No orders available.
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-xl shadow p-5"
                        >
                            <div className="space-y-1">
                                <h2 className="font-bold text-lg">
                                    {order.productTitle}
                                </h2>

                                <p>
                                    <span className="font-semibold">
                                        Buyer:
                                    </span>{" "}
                                    {order.buyerName}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Seller:
                                    </span>{" "}
                                    {order.sellerName}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Price:
                                    </span>{" "}
                                    ৳ {order.productPrice}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Status:
                                    </span>{" "}
                                    {order.orderStatus}
                                </p>
                            </div>

                            {/* <div className="flex gap-3 mt-4 flex-wrap">
                                <button
                                    onClick={() =>
                                        updateStatus(
                                            order._id,
                                            "confirmed"
                                        )
                                    }
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Confirm
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            order._id,
                                            "shipped"
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                                >
                                    Ship
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            order._id,
                                            "delivered"
                                        )
                                    }
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Deliver
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            order._id,
                                            "cancelled"
                                        )
                                    }
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div> */}
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() =>
                                        updateStatus(order._id, "confirmed")
                                    }
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Confirm
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(order._id, "cancelled")
                                    }
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;