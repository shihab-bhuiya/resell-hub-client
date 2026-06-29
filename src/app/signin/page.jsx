"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ShoppingBag,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";

import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const demoAccounts = [
    {
        role: "Admin",
        email: "admin@gmail.com",
        password: "admin123",
        badge: "bg-purple-500/20 text-white",
    },
    {
        role: "Seller",
        email: "seller@gmail.com",
        password: "seller123",
        badge: "bg-green-500/20 text-white",
    },
    {
        role: "Buyer",
        email: "buyer@gmail.com",
        password: "buyer123",
        badge: "bg-blue-500/20 text-white",
    },
];

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await authClient.signIn.email({
            email: formData.email,
            password: formData.password,
            rememberMe: true,
            callbackURL: "/",
        });

        if (data) {
            toast.success("Login Successfully");
            redirect("/");
        } else {
            toast.error(error?.message || "Something went wrong");
        }
    };

    const signInGoogle = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-[calc(100vh-88px)] bg-[#111111] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#181818] p-8 shadow-2xl">

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                        <ShoppingBag className="h-6 w-6 text-white" />
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-white">
                        Welcome Back
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        Sign in to your account
                    </p>
                </div>

                {/* Quick Demo Login */}
                <div className="mb-8">
                    <h3 className="mb-4 text-sm font-medium text-gray-300">
                        Quick Demo Login
                    </h3>

                    <div className="space-y-3">
                        {demoAccounts.map((account) => (
                            <button
                                key={account.role}
                                type="button"
                                onClick={() =>
                                    setFormData({
                                        email: account.email,
                                        password: account.password,
                                    })
                                }
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-white/5"
                            >
                                <span
                                    className={`rounded-md px-2 py-1 text-xs font-medium ${account.badge}`}
                                >
                                    {account.role}
                                </span>

                                <span className="text-sm text-gray-300">
                                    {account.email}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                            Email
                        </label>

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-white/10 bg-[#101010] py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium text-white">
                                Password
                            </label>

                            <Link
                                href="#"
                                className="text-xs text-blue-400 hover:text-blue-300"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                className="w-full rounded-xl border border-white/10 bg-[#101010] py-3 pl-12 pr-12 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Sign In
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 py-2">
                        <div className="h-px flex-1 bg-white/10"></div>

                        <span className="text-sm text-gray-400">or</span>

                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>

                    {/* Google */}
                    <button
                        type="button"
                        onClick={signInGoogle}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-transparent py-3 text-white transition hover:bg-white/5"
                    >
                        <FaGoogle className="text-lg text-red-500" />
                        Continue with Google
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-8 text-center text-sm text-gray-400">
                    {"Don't "} have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-blue-500 hover:text-blue-400"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;