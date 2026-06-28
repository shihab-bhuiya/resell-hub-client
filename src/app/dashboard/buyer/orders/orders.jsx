"use client";

import React, { useEffect, useState } from "react";

const BuyerOrdersPage = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/orders/buyer/${user.id}`
            );

            const data = await res.json();
            console.log("Imagee", data);
            if (data.success) {
                setOrders(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                Loading orders...
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">
                My Orders
            </h1>

            {orders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow p-10 text-center">
                    <h2 className="text-2xl font-semibold">
                        No Orders Yet
                    </h2>

                    <p className="mt-2 text-gray-500">
                        You haven’t purchased anything yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-2xl shadow p-5"
                        >
                            <div className="flex flex-col md:flex-row gap-5">
                                <img
                                    src={
                                        order.productImage ||
                                        "https://via.placeholder.com/200"
                                    }
                                    alt={order.productTitle}
                                    className="w-full md:w-48 h-40 object-cover rounded-xl"
                                />

                                <div className="flex-1 space-y-2">
                                    <h2 className="text-xl font-bold">
                                        {order.productTitle}
                                    </h2>

                                    <p className="text-gray-600">
                                        Seller: {order.sellerName}
                                    </p>

                                    <p className="font-semibold">
                                        Price: ৳ {order.productPrice}
                                    </p>

                                    <p>
                                        Order Status:
                                        <span className="ml-2 font-medium">
                                            {order.orderStatus}
                                        </span>
                                    </p>

                                    <p>
                                        Payment:
                                        <span className="ml-2 font-medium">
                                            {order.paymentStatus}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BuyerOrdersPage;