"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Simulated Auth State (You will replace this with your Better Auth hooks later)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("seller"); // buyer, seller, admin

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    {/* Left Side: Logo & Public Links */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-2xl font-bold text-blue-600">
                                ReSell Hub
                            </Link>
                        </div>

                        {/* Desktop Public Nav Links */}
                        <div className="hidden md:ml-6 md:flex md:space-x-8 md:items-center">
                            <Link href="/products" className="text-gray-600 hover:text-blue-600 px-1 pt-1 text-sm font-medium">
                                Browse Products
                            </Link>
                            <Link href="/categories" className="text-gray-600 hover:text-blue-600 px-1 pt-1 text-sm font-medium">
                                Categories
                            </Link>
                        </div>
                    </div>

                    {/* Right Side: Conditional Auth/Dashboard Links */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {isLoggedIn ? (
                            <>
                                {/* Dynamically point to the correct dashboard based on role */}
                                {userRole === "buyer" && (
                                    <Link href="/buyer-dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                                        Buyer Panel
                                    </Link>
                                )}
                                {userRole === "seller" && (
                                    <Link href="/seller-dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                                        Seller Panel
                                    </Link>
                                )}
                                {userRole === "admin" && (
                                    <Link href="/admin-dashboard" className="text-sm font-medium text-red-600 hover:text-red-700">
                                        Admin Panel
                                    </Link>
                                )}

                                <button
                                    onClick={() => setIsLoggedIn(false)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button Hamburger */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                // "X" Icon
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                // Hamburger Icon
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Open/Close Panel */}
            {isMobileMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="pt-2 pb-3 space-y-1 px-2">
                        <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                            Browse Products
                        </Link>
                        <Link href="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                            Categories
                        </Link>

                        <hr className="my-2 border-gray-200" />

                        {isLoggedIn ? (
                            <>
                                {userRole === "buyer" && (
                                    <Link href="/buyer-dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                                        Buyer Panel
                                    </Link>
                                )}
                                {userRole === "seller" && (
                                    <Link href="/seller-dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                                        Seller Panel
                                    </Link>
                                )}
                                {userRole === "admin" && (
                                    <Link href="/admin-dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50">
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={() => setIsLoggedIn(false)}
                                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                                    Log In
                                </Link>
                                <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-gray-50">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}