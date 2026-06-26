/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";

const ReSellHubNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Simple, clean navigation links array
    const navItems = [
        { label: "Browse Products", href: "/products" },
        { label: "Categories", href: "/categories" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#111111] px-3 py-4 md:px-6">
            {/* Floating Glassmorphism Container */}
            <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[32px] border border-white/5 bg-white/5 px-5 py-4 backdrop-blur-xl">
                {/* LEFT - Logo */}
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg transition-transform group-hover:scale-105">
                            <ShoppingBag className="h-5 w-5 text-white" strokeWidth={2} />
                        </div>
                        <div className="leading-none">
                            <h1 className="text-lg font-bold tracking-tight text-white">
                                ReSell Hub
                            </h1>
                            <p className="text-xs font-medium text-white/50">Marketplace</p>
                        </div>
                    </Link>
                </div>

                {/* CENTER/RIGHT - DESKTOP NAV */}
                <div className="hidden items-center md:flex">
                    <div className="flex items-center gap-6 rounded-2xl border border-white/5 bg-white/5 px-6 py-2.5">
                        {/* Map through navigation links */}
                        {navItems.map((item, index) => (
                            <React.Fragment key={item.label}>
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium text-gray-300 transition hover:text-white">
                                    {item.label}
                                </Link>
                                {/* Visual divider line between links, hidden after the last link */}
                                {index < navItems.length - 1 && (
                                    <div className="h-5 w-px bg-white/10" />
                                )}
                            </React.Fragment>
                        ))}

                        <div className="h-5 w-px bg-white/10" />

                        {/* Static Action Buttons */}
                        <Link
                            href="/signin"
                            className="text-sm font-medium text-blue-400 transition hover:text-blue-300">
                            Sign In
                        </Link>

                        <Link
                            href="/signup"
                            className="flex h-9 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-black shadow-md hover:bg-gray-200 transition-colors">
                            Join Hub
                        </Link>
                    </div>
                </div>

                {/* MOBILE MENU TRIGGER */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center justify-center rounded-xl p-2 text-white transition hover:bg-white/5 md:hidden">
                    {isMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isMenuOpen && (
                <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/5 bg-[#18181b] p-5 md:hidden">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                                onClick={() => setIsMenuOpen(false)}>
                                {item.label}
                            </Link>
                        ))}

                        <div className="my-2 h-px bg-white/10" />

                        {/* Mobile Action Buttons */}
                        <Link
                            href="/login"
                            className="rounded-xl px-4 py-3 text-sm font-medium text-blue-400 transition hover:bg-white/5"
                            onClick={() => setIsMenuOpen(false)}>
                            Sign In
                        </Link>

                        <Link
                            href="/register"
                            className="mt-2 flex w-full items-center justify-center rounded-xl bg-white py-2.5 text-sm font-semibold text-black hover:bg-gray-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}>
                            Join Hub
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default ReSellHubNavBar;
