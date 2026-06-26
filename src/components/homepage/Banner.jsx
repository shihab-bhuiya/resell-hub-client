/** @format */

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, ShieldCheck, Zap } from "lucide-react";

const ReSellHubHero = () => {
    return (
        <section className="relative min-h-[80vh] w-full overflow-hidden bg-[#111111] px-4 py-20 md:px-6 lg:py-32 flex items-center justify-center">

            {/* Background Ambient Glow Effects */}
            <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />

            <div className="mx-auto max-w-5xl text-center">

                {/* Top Announcement Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6 animate-fade-in">
                    <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-xs font-medium text-gray-300 tracking-wide">
                        The Next-Gen Peer-to-Peer Marketplace
                    </span>
                </div>

                {/* Main Hero Headline */}
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                    Turn Your Pre-Loved Items <br />
                    Into <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Instant Cash</span>
                </h1>

                {/* Sub-headline description text */}
                <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg md:text-xl font-normal leading-relaxed">
                    Join ReSell Hub—the secure, glass-fast ecosystem where buyers find premium items at unbeatable prices, and sellers earn seamlessly.
                </p>

                {/* Interactive Action Triggers */}
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href="/products"
                        className="group flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-sm font-semibold text-black shadow-lg shadow-white/5 hover:bg-gray-200 transition-all w-full sm:w-auto"
                    >
                        Browse Products
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                        href="/login"
                        className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 text-sm font-medium text-white backdrop-blur-md hover:bg-white/[0.08] transition-all w-full sm:w-auto"
                    >
                        Start Selling
                    </Link>
                </div>

                {/* Trust Metrics / Value Propositions Grid */}
                <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 border-t border-white/5 pt-10 max-w-4xl mx-auto">

                    <div className="flex items-center justify-center gap-3 text-left sm:justify-start px-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-blue-400">
                            <Zap size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">Instant Listing</h3>
                            <p className="text-xs text-white/40 mt-0.5">Post items in under 60 seconds.</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 text-left sm:justify-start px-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-cyan-400">
                            <ShieldCheck size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">Secure Escrow</h3>
                            <p className="text-xs text-white/40 mt-0.5">Your funds remain fully protected.</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 text-left sm:justify-start px-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-indigo-400">
                            <ShoppingBag size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">Verified Traders</h3>
                            <p className="text-xs text-white/40 mt-0.5">Zero scam policy enforced layout.</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ReSellHubHero;