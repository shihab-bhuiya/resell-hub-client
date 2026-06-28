

import { getUserSession } from '@/lib/core/session';
import BuyerOverviewPage from './BuyerOverView';


const MyProducts = async () => {
    const user = await getUserSession();
    console.log("USer", user);

    return (
        <div>
            <BuyerOverviewPage user={user} />
        </div>
    );
};

export default MyProducts;