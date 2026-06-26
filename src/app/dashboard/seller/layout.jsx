import SellerSidebar from "@/components/dashboard/SellerSideBar";


export default function SellerLayout({ children }) {
    return (
        <div className="flex">
            <SellerSidebar />

            <main className="flex-1 bg-gray-50 min-h-screen p-6">
                {children}
            </main>
        </div>
    );
}