"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Profile = ({ user }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/users/${user.id}`
            );

            const data = await res.json();

            if (data.success) {
                setProfile(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/users/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(profile),
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-6">Loading profile...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow p-8">
                <h1 className="text-3xl font-bold mb-8">
                    Profile
                </h1>

                <div className="space-y-5">
                    <input
                        name="name"
                        value={user.name || ""}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                    <input
                        name="email"
                        value={user.email || ""}
                        disabled
                        className="w-full border rounded-xl px-4 py-3 bg-gray-100"
                    />

                    <input
                        name="phone"
                        value={user.phone || ""}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                    <input
                        name="address"
                        value={user.address || ""}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                    {/* <input
                        name="shopName"
                        value={profile.shopName || ""}
                        onChange={handleChange}
                        placeholder="Shop Name"
                        className="w-full border rounded-xl px-4 py-3"
                    /> */}

                    <textarea
                        name="bio"
                        value={user.bio || " "}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Bio"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-gray-100 p-4">
                            <p className="text-gray-500 text-sm">
                                Role
                            </p>
                            <p className="font-semibold">
                                {user.role}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-100 p-4">
                            <p className="text-gray-500 text-sm">
                                Status
                            </p>
                            <p className="font-semibold">
                                Active Seller
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full rounded-xl bg-black py-4 text-white font-semibold"
                    >
                        {saving
                            ? "Saving..."
                            : "Update Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;