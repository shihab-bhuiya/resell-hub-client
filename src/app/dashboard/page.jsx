"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const DashboardPage = () => {
    const router = useRouter();

    const { data: session, isPending } =
        authClient.useSession();

    const user = session?.user;

    useEffect(() => {
        if (isPending) return;
        if (!user) {
            router.push("/signin");
            return;
        }

        if (user.role === "admin") {
            router.push("/dashboard/admin");
        } else if (user.role === "seller") {
            router.push("/dashboard/seller");
        } else {
            router.push("/dashboard/buyer");
        }
    }, [user, isPending, router]);

    return (
        <div className="p-10 text-center">
            Redirecting to dashboard...
        </div>
    );
};

export default DashboardPage;