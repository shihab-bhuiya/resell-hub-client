import DashboardSidebar from "@/components/dashboard/BuyerSideBar";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";


export default async function DashboardLayout({ children }) {
    const user = await getUserSession();
    if (user.role !== 'admin') {
        redirect("/unauthorized")
    }

    return (
        <div className="flex">
            <DashboardSidebar user={user} />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}