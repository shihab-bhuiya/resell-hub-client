import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
    try {
        const { sessionId } = await req.json();

        const session =
            await stripe.checkout.sessions.retrieve(
                sessionId
            );

        return NextResponse.json({
            success: true,
            session,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}