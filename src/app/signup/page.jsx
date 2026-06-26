"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Sign up form data: ", formData);
        // Ready for your custom validation and API integration later!
    };

    return (
        <div className="min-h-[calc(100vh-88px)] bg-[#111111] flex items-center justify-center px-4 py-12">
            {/* Floating Glassmorphism Form Card */}
            <div className="w-full max-w-md rounded-[32px] border border-white/5 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg mb-4">
                        <ShoppingBag className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Create an account</h2>
                    <p className="text-sm text-white/50 mt-1">Join ReSell Hub to start buying and selling</p>
                </div>

                {/* Form Container */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Full Name</label>
                        <div className="relative flex items-center">
                            <User className="absolute left-4 h-4 w-4 text-white/40" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                                className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:border-blue-500 focus:bg-white/[0.08]"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-4 h-4 w-4 text-white/40" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                                className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:border-blue-500 focus:bg-white/[0.08]"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-4 h-4 w-4 text-white/40" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full h-12 pl-11 pr-11 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:border-blue-500 focus:bg-white/[0.08]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-white/40 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        className="group mt-2 flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black shadow-md hover:bg-gray-200 transition-all"
                    >
                        Get Started
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </form>

                {/* Footer/Switch section */}
                <p className="text-center text-sm text-white/40 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 transition">
                        Sign in
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default SignUpPage;