"use client";

import React, { useEffect, useMemo, useState } from "react";

const BuyerPaymentsPage = ({ user }) => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            fetchPayments();
        }
    }, [user]);

    const fetchPayments = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/payments/${user.id}`
            );

            const data = await res.json();

            if (data.success) {
                setPayments(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const totalSpent = useMemo(() => {
        return payments.reduce(
            (sum, payment) => sum + payment.paymentAmount,
            0
        );
    }, [payments]);

    const successfulPayments = useMemo(() => {
        return payments.filter(
            (payment) => payment.paymentStatus === "paid"
        ).length;
    }, [payments]);

    const getStatusClass = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "failed":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    if (loading) {
        return (
            <div className="p-6 text-center text-lg">
                Loading payments...
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">
                Payment History
            </h1>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-xl p-5">
                    <p className="text-gray-500">
                        Total Payments
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {payments.length}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-5">
                    <p className="text-gray-500">
                        Total Spent
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        ৳ {totalSpent}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-5">
                    <p className="text-gray-500">
                        Successful Payments
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {successfulPayments}
                    </h2>
                </div>
            </div>

            {/* Payments Table */}
            {payments.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                    No payment history found.
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 text-left">
                                    Transaction ID
                                </th>
                                <th className="p-4 text-left">
                                    Amount
                                </th>
                                <th className="p-4 text-left">
                                    Method
                                </th>
                                <th className="p-4 text-left">
                                    Status
                                </th>
                                <th className="p-4 text-left">
                                    Date
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((payment) => (
                                <tr
                                    key={payment._id}
                                    className="border-t"
                                >
                                    <td className="p-4">
                                        <span className="font-mono text-sm">
                                            {payment.transactionId.slice(
                                                0,
                                                18
                                            )}
                                            ...
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        ৳ {payment.paymentAmount}
                                    </td>

                                    <td className="p-4 capitalize">
                                        {payment.paymentMethod}
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                                                payment.paymentStatus
                                            )}`}
                                        >
                                            {
                                                payment.paymentStatus
                                            }
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            payment.paymentDate
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BuyerPaymentsPage;