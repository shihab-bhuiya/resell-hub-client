/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ShoppingBag,
    User,
    Mail,
    Lock,
    Phone,
    MapPin,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        location: "",
        role: "buyer", // default role selection
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleSelect = (selectedRole) => {
        setFormData({ ...formData, role: selectedRole });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await authClient.signUp.email({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            location: formData.location,
            role: formData.role,
            staus: "active",
            callbackURL: "/",
            // CRITICAL FIX: Pass custom schema fields so your authentication database tracks them

        });

        if (data) {
            toast.success("Registered successfully!");
            redirect('/');
        } else {
            toast.error(error?.message || "Something went wrong");
            console.error("Registration Error Details:", error);
        }
    };


    return (
        <div className="min-h-[calc(100vh-88px)] bg-[#111111] flex items-center justify-center px-4 py-12">
            {/* Floating Glassmorphism Form Card */}
            <div className="w-full max-w-xl rounded-[32px] border border-white/5 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg mb-4">
                        <ShoppingBag className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                        Create your profile
                    </h2>
                    <p className="text-sm text-white/50 mt-1">
                        Join ReSell Hub marketplace by filling out your credentials
                    </p>
                </div>

                {/* Form Container */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* ROLE SELECTION TIER (3 Options) */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 block">
                            Select Account Type
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: "buyer", label: "Buyer", desc: "Browse & Purchase" },
                                { id: "seller", label: "Seller", desc: "List & Earn Money" },

                            ].map((roleOption) => {
                                const isSelected = formData.role === roleOption.id;
                                return (
                                    <button
                                        key={roleOption.id}
                                        type="button"
                                        onClick={() => handleRoleSelect(roleOption.id)}
                                        className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${isSelected
                                            ? "bg-white border-white text-black shadow-lg shadow-white/5 font-semibold"
                                            : "bg-white/5 border-white/10 text-white hover:bg-white/[0.08]"
                                            }`}>
                                        <span className="text-sm font-medium">
                                            {roleOption.label}
                                        </span>
                                        <span
                                            className={`text-[10px] mt-0.5 tracking-tight hidden sm:block ${isSelected ? "text-black/60" : "text-white/40"
                                                }`}>
                                            {roleOption.desc}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* TWO COLUMN GRID FOR PERSONAL DETAILS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full Name Input */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-300">
                                Full Name
                            </label>
                            <div className="relative flex items-center">
                                <User className="absolute left-4 h-4 w-4 text-white/40" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Md. Rakib Hasan"
                                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:border-blue-500 focus:bg-white/[0.08]"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-4 h-4 w-4 text-white/40" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="rakib.hasan@gmail.com"
                                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:border-blue-500 focus:bg-white/[0.08]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* TWO COLUMN GRID FOR METADATA */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone Number Input */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-300">
                                Phone Number
                            </label>
                            <div className="relative flex items-center">
                                <Phone className="absolute left-4 h-4 w-4 text-white/40" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+8801712345678"
                                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:border-blue-500 focus:bg-white/[0.08]"
                                />
                            </div>
                        </div>

                        {/* Location Input */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-300">
                                Location Area
                            </label>
                            <div className="relative flex items-center">
                                <MapPin className="absolute left-4 h-4 w-4 text-white/40" />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    placeholder="Dhaka, Bangladesh"
                                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:border-blue-500 focus:bg-white/[0.08]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Secure Password Input */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">
                            Account Password
                        </label>
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
                                className="absolute right-4 text-white/40 hover:text-white transition-colors">
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Action Trigger */}
                    <button
                        type="submit"
                        className="group mt-2 flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black shadow-md hover:bg-gray-200 transition-all">
                        Complete Registration
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </form>

                {/* Form Bottom Link */}
                <p className="text-center text-sm text-white/40 mt-6">
                    Already have a marketplace account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-blue-400 hover:text-blue-300 transition">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
