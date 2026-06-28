
import { getUserSession } from '@/lib/core/session';
import BuyerOrdersPage from './orders';

const MyProducts = async () => {
    const user = await getUserSession();
    console.log("USer", user);

    return (
        <div>
            <BuyerOrdersPage user={user} />
        </div>
    );
};

export default MyProducts;