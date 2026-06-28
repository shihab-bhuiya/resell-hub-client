"use client";

import React, { useEffect, useState } from "react";

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/users`
        );

        const data = await res.json();

        if (data.success) {
            setUsers(data.data);
        }
    };

    const updateStatus = async (id, status) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/users/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            }
        );

        fetchUsers();
    };

    const deleteUser = async (id) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/users/${id}`,
            {
                method: "DELETE",
            }
        );

        fetchUsers();
    };

    const filteredUsers = users.filter((user) =>
        user.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Manage Users
            </h1>

            <input
                type="text"
                placeholder="Search user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md border rounded-lg px-4 py-3 mb-6"
            />

            <div className="space-y-4">
                {filteredUsers.map((user) => (
                    <div
                        key={user._id}
                        className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
                    >
                        <div>
                            <h2 className="font-bold">
                                {user.name}
                            </h2>
                            <p>{user.email}</p>
                            <p>Role: {user.role}</p>
                            <p>Status: {user.status || "active"}</p>
                        </div>

                        <div className="flex gap-3">
                            {user.status === "blocked" ? (
                                <button
                                    onClick={() =>
                                        updateStatus(
                                            user._id,
                                            "active"
                                        )
                                    }
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Unblock
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        updateStatus(
                                            user._id,
                                            "blocked"
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                                >
                                    Block
                                </button>
                            )}

                            <button
                                onClick={() =>
                                    deleteUser(user._id)
                                }
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminUsersPage;