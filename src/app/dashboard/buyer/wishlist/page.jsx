
import { getUserSession } from '@/lib/core/session';
import WishlistPage from './WishList';

const MyProducts = async () => {
    const user = await getUserSession();
    console.log("USer", user);

    return (
        <div>
            <WishlistPage user={user} />
        </div>
    );
};

export default MyProducts;