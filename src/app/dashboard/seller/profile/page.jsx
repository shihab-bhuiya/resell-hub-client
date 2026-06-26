import Profile from "./Profile";
import { getUserSession } from "@/lib/core/session";

const ProfilePage = async () => {
    const user = await getUserSession();

    if (!user) {
        return <div>Please login first.</div>;
    }

    return <Profile user={user} />;
};

export default ProfilePage;