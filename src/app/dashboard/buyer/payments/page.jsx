"use client";

import React, { useEffect, useState } from "react";

const PaymentsPage = ({ user }) => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
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

    if (loading) {
        return <div className="p-6">Loading payments...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">
                Payment History
            </h1>

            {payments.length === 0 ? (
                <div className="bg-white rounded-2xl shadow p-8 text-center">
                    No payment history found
                </div>
            ) : (
                <div className="space-y-4">
                    {payments.map((payment) => (
                        <div
                            key={payment._id}
                            className="bg-white rounded-2xl shadow p-6"
                        >
                            <h2 className="text-xl font-semibold">
                                {payment.productTitle}
                            </h2>

                            <div className="mt-4 space-y-2 text-gray-600">
                                <p>
                                    Amount: ৳ {payment.amount}
                                </p>

                                <p>
                                    Method: {payment.paymentMethod}
                                </p>

                                <p>
                                    Status: {payment.paymentStatus}
                                </p>

                                <p>
                                    Transaction ID: {payment.transactionId}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PaymentsPage;