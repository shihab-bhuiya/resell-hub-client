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
        await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/orders/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderStatus }),
            }
        );

        fetchOrders();
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Manage Orders
            </h1>

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
                                Buyer: {order.buyerName}
                            </p>

                            <p>
                                Seller: {order.sellerName}
                            </p>

                            <p>
                                Price: ৳ {order.productPrice}
                            </p>

                            <p>
                                Status:{" "}
                                {order.orderStatus}
                            </p>
                        </div>

                        <div className="flex gap-3 mt-4 flex-wrap">
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrdersPage;