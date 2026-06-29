"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { FaGoogle } from "react-icons/fa";


const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form Data", formData);
        const { data, error } = await authClient.signIn.email({
            email: formData.email, // required
            password: formData.password, // required
            rememberMe: true,
            callbackURL: "/",
        });
        if (data) {
            toast.success("Login Succesfully");
            redirect('/')
        }
        else {
            toast.error(error?.message || "Something went wrong")
        }

    };
    const signInGoogle = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
            toast.error(error.message);
        }
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
                    <h2 className="text-2xl font-bold tracking-tight text-white">Welcome back</h2>
                    <p className="text-sm text-white/50 mt-1">Sign in to manage your items and deals</p>
                </div>

                {/* Form Container */}
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <Link href="#" className="text-xs text-blue-400 hover:text-blue-300 transition">
                                Forgot password?
                            </Link>
                        </div>
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
                        Sign In
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <div className="mt-6">
                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-gray-600"></div>

                            <span className="text-sm text-gray-300 whitespace-nowrap">
                                Or continue with Google
                            </span>

                            <div className="h-px flex-1 bg-gray-600"></div>
                        </div>

                        {/* Google Button */}
                        <button onClick={signInGoogle}
                            className="mt-5 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-600 bg-white px-4 py-3 font-medium text-gray-800 transition hover:bg-gray-100"
                        >
                            <FaGoogle className="text-red-500 text-lg" />
                            Login with Google
                        </button>
                    </div>


                </form>

                {/* Footer/Switch section */}
                <p className="text-center text-sm text-white/40 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300 transition">
                        Sign up
                    </Link>
                </p>

            </div >
            <div>
                <h2>Admin Email and Password</h2>
                <p>email: admin@gmail.com</p>
                <p>password: admin123</p>
            </div>
        </div >
    );
};

export default SignInPage;