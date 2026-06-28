"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (sessionId) {
            fetchPaymentSession();
        }
    }, [sessionId]);

    const fetchPaymentSession = async () => {
        try {
            const res = await fetch("/api/payment-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sessionId,
                }),
            });

            const data = await res.json();

            console.log("Stripe Session:", data);

            if (data.success) {
                await savePayment(data.session);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const savePayment = async (session) => {
        try {
            const paymentData = {
                transactionId: session.id,
                buyerId: session.metadata.buyerId,
                productId: session.metadata.productId,
                sellerId: session.metadata.sellerId,
                paymentAmount: session.amount_total / 100,
                paymentStatus: session.payment_status,
                paymentMethod: "card",
                paymentDate: new Date(),
            };
            console.log("payment Data", paymentData)
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/payments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paymentData),
                }
            );

            const data = await res.json();
            console.log("Saved Payment:", data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-10 text-center">
                <div className="flex justify-center">
                    <CheckCircle className="w-20 h-20 text-green-500" />
                </div>

                <h1 className="mt-6 text-4xl font-bold text-gray-800">
                    Payment Successful!
                </h1>

                <p className="mt-4 text-gray-600 leading-relaxed">
                    Thank you for your purchase. Your payment has been completed
                    successfully and your order has been placed.
                </p>

                <div className="mt-8 rounded-xl bg-green-50 border border-green-200 p-4">
                    <p className="text-green-700 font-medium">
                        ✔ Your order is now being processed.
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                        You will receive an email confirmation shortly with your
                        order details.
                    </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/"
                        className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                    >
                        Continue Shopping
                    </Link>

                    <Link
                        href="/dashboard/buyer/orders"
                        className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                    >
                        View Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}