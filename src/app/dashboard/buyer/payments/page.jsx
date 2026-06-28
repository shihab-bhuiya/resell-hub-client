
import { getUserSession } from '@/lib/core/session';
import BuyerPaymentsPage from './Payment';

const MyProducts = async () => {
    const user = await getUserSession();
    console.log("USer", user);

    return (
        <div>
            <BuyerPaymentsPage user={user} />
        </div>
    );
};

export default MyProducts;