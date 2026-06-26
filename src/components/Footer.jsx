/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import toast from "react-hot-toast";

const ReSellHubFooter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;

        toast.success("Subscribed successfully! Welcome to the hub.");
        setEmail("");
    };

    const footerLinks = {
        marketplace: [
            { label: "All Products", href: "/products" },
            { label: "Categories", href: "/categories" },
            { label: "Top Deals", href: "/products?filter=deals" },
            { label: "Success Stories", href: "/stories" },
        ],
        company: [
            { label: "About Us", href: "/about" },
            { label: "Contact Us", href: "/contact" },
            { label: "Careers", href: "/careers" },
            { label: "Blog Feed", href: "/blog" },
        ],
        legal: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Escrow Rules", href: "/escrow-terms" },
        ]
    };

    return (
        <footer className="w-full bg-[#111111] px-4 pt-16 pb-8 border-t border-white/5 md:px-6 relative overflow-hidden">
            {/* Soft Ambient Radial Blur Background */}
            <div className="absolute bottom-0 left-1/2 -z-10 h-64 w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

            <div className="mx-auto max-w-7xl">
                {/* TOP ROW */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 pb-12 border-b border-white/5">
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-3 group w-fit">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md">
                                <ShoppingBag className="h-4 w-4 text-white" strokeWidth={2} />
                            </div>
                            <span className="text-md font-bold tracking-tight text-white">
                                ReSell Hub
                            </span>
                        </Link>
                        <p className="text-sm text-white/50 max-w-sm leading-relaxed">
                            The ultimate modern web interface for peer-to-peer commerce. Buy verified goods securely and build secondary market ecosystems effortlessly.
                        </p>
                    </div>

                    <div className="lg:col-span-7 flex flex-col gap-3 sm:max-w-md lg:ml-auto w-full">
                        <h4 className="text-sm font-semibold text-white tracking-wide">
                            Stay Updated with Dropping Stock
                        </h4>
                        <p className="text-xs text-white/40">
                            Get early alerts for verified deals and trending categories straight to your inbox.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex gap-2 mt-1">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email addresses"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11 flex-grow rounded-xl border border-white/5 bg-white/5 px-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                            />
                            <button
                                type="submit"
                                className="h-11 px-5 rounded-xl bg-white text-xs font-semibold text-black hover:bg-gray-200 transition-colors shrink-0"
                            >
                                Join List
                            </button>
                        </form>
                    </div>
                </div>

                {/* MIDDLE ROW */}
                <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <h5 className="text-xs font-bold text-white uppercase tracking-widest opacity-80">Marketplace</h5>
                        <ul className="flex flex-col gap-2.5">
                            {footerLinks.marketplace.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-xs text-white/50 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h5 className="text-xs font-bold text-white uppercase tracking-widest opacity-80">Platform</h5>
                        <ul className="flex flex-col gap-2.5">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-xs text-white/50 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h5 className="text-xs font-bold text-white uppercase tracking-widest opacity-80">Safety & Legal</h5>
                        <ul className="flex flex-col gap-2.5">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-xs text-white/50 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h5 className="text-xs font-bold text-white uppercase tracking-widest opacity-80">Seller Center</h5>
                        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 flex flex-col gap-2.5">
                            <p className="text-xs text-white/40 leading-normal">
                                Ready to scale up your store sales?
                            </p>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors group"
                            >
                                Open Dashboard Layout
                                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-8 border-t border-white/5 text-center sm:text-left">
                    <p className="text-xs text-white/30">
                        © {new Date().getFullYear()} ReSell Hub Inc. All absolute rights reserved.
                    </p>

                    {/* Raw Custom SVGs - No library imports required */}
                    <div className="flex items-center justify-center gap-4">
                        {/* GitHub */}
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="GitHub">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.061.069-.061 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                            </svg>
                        </a>
                        {/* Twitter / X */}
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Twitter">
                            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="LinkedIn">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ReSellHubFooter;