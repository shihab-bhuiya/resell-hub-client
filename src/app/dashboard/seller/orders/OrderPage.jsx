/** @format */

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Package, User as UserIcon, Calendar, CheckCircle2, Truck, AlertCircle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const OrdersPage = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(null); // Track which order ID is being updated

    const fetchOrders = useCallback(async () => {
        if (!user?.id) return;

        setIsLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/orders/seller/${user.id}`
            );
            const data = await res.json();

            if (data.success) {
                setOrders(data.data || []);
            } else {
                toast.error(data.message || "Failed to load orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Network error while loading orders");
        } finally {
            setIsLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const updateStatus = async (id, status) => {
        setIsUpdating(id);
        const loadingToast = toast.loading(`Updating order status to ${status}...`);

        try {
            const res = await fetch(
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
            const data = await res.json();

            if (res.ok || data.success) {
                toast.success(`Order marked as ${status}`, { id: loadingToast });
                await fetchOrders();
            } else {
                toast.error(data.message || "Failed to modify order status", { id: loadingToast });
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Network error modifying order status", { id: loadingToast });
        } finally {
            setIsUpdating(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "confirmed":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "shipped":
                return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "pending":
                return "bg-amber-500/10 text-amber-400 border-amber-500/20";
            default:
                return "bg-white/5 text-white/60 border-white/10";
        }
    };

    return (
        <div className="min-h-screen bg-[#111111] text-white p-4 md:p-8">
            <div className="mx-auto max-w-5xl">

                {/* Header Block */}
                <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold md:text-3xl tracking-tight">Seller Dashboard</h1>
                        <p className="text-xs text-white/40 mt-1">Manage inbound item orders and fulfillment actions</p>
                    </div>
                    <button
                        onClick={fetchOrders}
                        disabled={isLoading || !user?.id}
                        className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-40"
                    >
                        <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                    </button>
                </div>

                {/* State: No User Session Yet */}
                {!user?.id ? (
                    <div className="flex flex-col items-center justify-center p-12 rounded-3xl border border-white/5 bg-white/[0.02] text-center">
                        <AlertCircle className="h-10 w-10 text-amber-500/80 mb-3" />
                        <h3 className="font-semibold text-sm">Authentication Required</h3>
                        <p className="text-xs text-white/40 mt-1 max-w-xs">Please verify your session credentials or reload the portal workspace.</p>
                    </div>
                ) : isLoading && orders.length === 0 ? (
                    /* Loading State Skeleton skeleton */
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-40 w-full rounded-2xl border border-white/5 bg-white/[0.01] animate-pulse" />
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    /* Clean Empty State view block */
                    <div className="flex flex-col items-center justify-center p-16 rounded-3xl border border-white/5 bg-white/[0.02] text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white/30 mb-4">
                            <Package size={22} />
                        </div>
                        <h3 className="font-medium text-sm text-white">No active orders found</h3>
                        <p className="text-xs text-white/40 mt-1 max-w-xs">When buyers purchase your listed goods, your active fulfillment requests manifest here.</p>
                    </div>
                ) : (
                    /* Orders Interactive Deck Mapping Grid */
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition hover:border-white/10 hover:bg-white/[0.03]"
                            >
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                                    {/* Order Thumbnail Element */}
                                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                        {order.productImage || order.image ? (
                                            <img
                                                src={order.productImage || order.image}
                                                alt={order.productTitle || "Product thumbnail"}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-white/20">
                                                <Package size={24} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info details */}
                                    <div className="flex-grow min-w-0">
                                        <div className="flex flex-wrap items-start justify-between gap-2">
                                            <div>
                                                <h2 className="font-semibold text-white tracking-tight truncate text-base max-w-md">
                                                    {order.productTitle || "Listing Title Undefined"}
                                                </h2>
                                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                                                    <span className="flex items-center gap-1.5">
                                                        <UserIcon size={13} className="text-white/30" />
                                                        Buyer: <span className="text-white/80">{order.buyerName || "Anonymous User"}</span>
                                                    </span>
                                                    {order.createdAt && (
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar size={13} className="text-white/30" />
                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Status Badge component */}
                                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide ${getStatusColor(order.orderStatus)}`}>
                                                {order.orderStatus || "Pending"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Conditional Actions footer pipeline layout */}
                                <div className="mt-5 flex items-center justify-end gap-3 border-t border-white/5 pt-4">
                                    <button
                                        disabled={isUpdating !== null || order.orderStatus === "confirmed" || order.orderStatus === "shipped"}
                                        onClick={() => updateStatus(order._id, "confirmed")}
                                        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-20 disabled:pointer-events-none"
                                    >
                                        <CheckCircle2 size={13} />
                                        Accept Order
                                    </button>

                                    <button
                                        disabled={isUpdating !== null || order.orderStatus === "shipped" || order.orderStatus === "pending"}
                                        onClick={() => updateStatus(order._id, "shipped")}
                                        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 text-xs font-semibold text-blue-400 hover:bg-blue-500/20 transition-all disabled:opacity-20 disabled:pointer-events-none"
                                    >
                                        <Truck size={13} />
                                        Mark as Shipped
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;