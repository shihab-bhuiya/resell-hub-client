
import { getUserSession } from '@/lib/core/session';
import ProductDetailsPage from './DetailsPage';

const MyProducts = async () => {
    const user = await getUserSession();
    console.log("USer", user);

    return (
        <div>
            <ProductDetailsPage user={user} />
        </div>
    );
};

export default MyProducts;