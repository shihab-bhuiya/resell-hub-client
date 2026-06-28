import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            productName,
            price,
            productId,
            buyerId,
        } = body;

        const session =
            await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",

                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: productName,
                            },
                            unit_amount: price * 100,
                        },
                        quantity: 1,
                    },
                ],

                success_url:
                    `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

                cancel_url:
                    `${process.env.NEXT_PUBLIC_BASE_URL}/checkout-cancel`,

                metadata: {
                    productId,
                    buyerId,
                },
            });

        return NextResponse.json({
            url: session.url,
        });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}