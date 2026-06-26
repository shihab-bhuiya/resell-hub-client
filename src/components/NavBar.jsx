"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const ReSellHubNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Browse Products", href: "/products" },
        { label: "Categories", href: "/categories" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#111111] px-3 py-4 md:px-6">
            <div className="mx-auto max-w-7xl rounded-[32px] border border-white/5 bg-white/5 px-5 py-4 backdrop-blur-xl">
                {/* Top Row */}
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg transition-transform group-hover:scale-105">
                            <ShoppingBag
                                className="h-5 w-5 text-white"
                                strokeWidth={2}
                            />
                        </div>

                        <div className="leading-none">
                            <h1 className="text-lg font-bold tracking-tight text-white">
                                ReSell Hub
                            </h1>
                            <p className="text-xs font-medium text-white/50">
                                Marketplace
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium text-gray-300 transition hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="h-5 w-px bg-white/10" />

                        {isPending ? (
                            <span className="text-sm text-gray-400">
                                Loading...
                            </span>
                        ) : user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-white">
                                    Hi, {user.name}
                                </span>

                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/signin"
                                    className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    href="/signup"
                                    className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-lg transition hover:bg-gray-200"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-xl p-2 text-white hover:bg-white/5 md:hidden"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="mt-4 rounded-3xl border border-white/5 bg-[#18181b] p-5 md:hidden">
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="my-2 h-px bg-white/10" />

                            {isPending ? (
                                <span className="px-4 py-2 text-gray-400">
                                    Loading...
                                </span>
                            ) : user ? (
                                <>
                                    <span className="px-4 py-2 text-white">
                                        Hi, {user.name}
                                    </span>

                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10"
                                    >
                                        <LogOut size={16} />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/signin"
                                        className="rounded-xl px-4 py-3 text-sm font-medium text-blue-400 hover:bg-white/5"
                                        onClick={() =>
                                            setIsMenuOpen(false)
                                        }
                                    >
                                        Sign In
                                    </Link>

                                    <Link
                                        href="/signup"
                                        className="mt-2 flex w-full items-center justify-center rounded-xl bg-white py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200"
                                        onClick={() =>
                                            setIsMenuOpen(false)
                                        }
                                    >
                                        Join Hub
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default ReSellHubNavBar;