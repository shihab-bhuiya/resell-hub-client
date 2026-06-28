import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            productName,
            productPrice,
            productId,
            buyerId,
            sellerId,
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
                            unit_amount:
                                productPrice * 100,
                        },
                        quantity: 1,
                    },
                ],

                success_url:
                    `${process.env.BETTER_AUTH_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

                cancel_url:
                    `${process.env.BETTER_AUTH_URL}/payment-cancel`,

                metadata: {
                    productId,
                    buyerId,
                    sellerId,
                },
            });

        return NextResponse.json({
            url: session.url,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}