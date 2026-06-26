
import { redirect } from "next/navigation";

import { getUserSession } from "@/lib/core/session";
import SellerSidebar from "@/components/dashboard/SellerSideBar";

export default async function SellerLayout({ children }) {
    const user = await getUserSession();

    if (!user) redirect("/signin");

    if (user.role !== "buyer") {
        redirect("/unauthorized");
    }

    return (
        <div className="flex">
            <SellerSidebar />
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}