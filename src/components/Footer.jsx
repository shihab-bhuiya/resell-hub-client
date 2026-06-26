/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
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
                {/* TOP ROW: Brand Context & Newsletter Subscriptions */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 pb-12 border-b border-white/5">

                    {/* Brand Meta Block */}
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

                    {/* Interactive Subscriptions Box */}
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

                {/* MIDDLE ROW: Deep Mapping Links Structuring */}
                <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-4">

                    {/* Column 1: Marketplace Actions */}
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

                    {/* Column 2: Core Platform Pages */}
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

                    {/* Column 3: Legal Safeguards */}
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

                    {/* Column 4: Control Core Dashboard Short links */}
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

                {/* BOTTOM ROW: Copyrights & Social Handles */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-8 border-t border-white/5 text-center sm:text-left">
                    <p className="text-xs text-white/30">
                        © {new Date().getFullYear()} ReSell Hub Inc. All absolute rights reserved.
                    </p>

                    {/* Social Media Vectors */}
                    <div className="flex items-center justify-center gap-4">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                            <Github size={16} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                            <Twitter size={16} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                            <Linkedin size={16} />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default ReSellHubFooter;