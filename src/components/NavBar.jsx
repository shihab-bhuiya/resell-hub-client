/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Menu,
    X,
    ShoppingBag,
    LogOut,
    User,
    LayoutDashboard,
    ChevronDown,
    Settings,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const ReSellHubNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
        setIsMenuOpen(false);
        setIsProfileDropdownOpen(false);
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
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg transition-transform group-hover:scale-105">
                            <ShoppingBag className="h-5 w-5 text-white" />
                        </div>

                        <div className="leading-none">
                            <h1 className="text-lg font-bold text-white">ReSell Hub</h1>
                            <p className="text-xs text-white/50">Marketplace</p>
                        </div>
                    </Link>

                    {/* Desktop */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium text-gray-300 hover:text-white transition">
                                {item.label}
                            </Link>
                        ))}

                        <div className="h-5 w-px bg-white/10" />

                        {isPending ? (
                            <span className="text-gray-400 text-sm">Loading...</span>
                        ) : user ? (
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setIsProfileDropdownOpen(!isProfileDropdownOpen)
                                    }
                                    className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5">
                                    <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center overflow-hidden">
                                        {user.image ? (
                                            <img
                                                src={user.image}
                                                alt={user.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <User size={16} className="text-blue-400" />
                                        )}
                                    </div>

                                    <span className="text-white text-sm">{user.name}</span>

                                    <ChevronDown
                                        size={16}
                                        className={`text-white transition ${isProfileDropdownOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/5 bg-[#18181b] p-2 shadow-2xl">
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                                            <LayoutDashboard size={16} />
                                            Dashboard
                                        </Link>

                                        <Link
                                            href="/dashboard/seller/profile"
                                            className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                                            <User size={16} />
                                            My Profile
                                        </Link>

                                        <Link
                                            href="/settings"
                                            className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                                            <Settings size={16} />
                                            Settings
                                        </Link>

                                        <div className="my-2 h-px bg-white/10" />

                                        <button
                                            onClick={handleSignOut}
                                            className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-sm text-red-400 hover:bg-red-500/10">
                                            <LogOut size={16} />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/signin"
                                    className="text-sm font-medium text-violet-400 hover:text-violet-300">
                                    Sign In
                                </Link>

                                <Link
                                    href="/signup"
                                    className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-xl p-2 text-white md:hidden">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="mt-4 rounded-3xl border border-white/5 bg-[#18181b] p-5 md:hidden">
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                                    {item.label}
                                </Link>
                            ))}

                            <div className="my-2 h-px bg-white/10" />

                            {user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5">
                                        Dashboard
                                    </Link>

                                    <Link
                                        href="/profile"
                                        className="rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5">
                                        Profile
                                    </Link>

                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10">
                                        <LogOut size={16} />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/signin"
                                        className="rounded-xl px-4 py-3 text-blue-400 hover:bg-white/5">
                                        Sign In
                                    </Link>

                                    <Link
                                        href="/signup"
                                        className="rounded-xl bg-white px-4 py-3 text-center text-black font-semibold">
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
