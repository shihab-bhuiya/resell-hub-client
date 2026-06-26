"use client";

import React, { useEffect, useState } from "react";

const OrdersPage = ({ user }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/orders/seller/${user.id}`
        );

        const data = await res.json();

        if (data.success) {
            setOrders(data.data);
        }
    };

    const updateStatus = async (id, status) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/orders/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderStatus: status,
                }),
            }
        );

        fetchOrders();
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Orders
            </h1>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-xl shadow p-5"
                    >
                        <h2 className="font-bold">
                            {order.productTitle}
                        </h2>

                        <p>Buyer: {order.buyerName}</p>
                        <p>Status: {order.orderStatus}</p>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() =>
                                    updateStatus(
                                        order._id,
                                        "confirmed"
                                    )
                                }
                            >
                                Accept
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        order._id,
                                        "shipped"
                                    )
                                }
                            >
                                Ship
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;