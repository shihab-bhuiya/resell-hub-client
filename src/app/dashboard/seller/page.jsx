export default function SellerDashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Welcome Seller
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="font-semibold">
                        Total Products
                    </h3>
                    <p className="text-3xl mt-3 font-bold">0</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="font-semibold">Orders</h3>
                    <p className="text-3xl mt-3 font-bold">0</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="font-semibold">Revenue</h3>
                    <p className="text-3xl mt-3 font-bold">
                        ৳0
                    </p>
                </div>
            </div>
        </div>
    );
}