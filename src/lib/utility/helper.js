import { authClient } from "../auth-client";

const { data: session, isPending } = authClient.useSession();
const user = session?.user;

const getDashboardLink = () => {
    if (!user) return "/signin";

    switch (user.role) {
        case "admin":
            return "/dashboard/admin";
        case "seller":
            return "/dashboard/seller";
        case "buyer":
        default:
            return "/dashboard/buyer";
    }
};

const handleSignOut = async () => {
    await authClient.signOut();
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
};