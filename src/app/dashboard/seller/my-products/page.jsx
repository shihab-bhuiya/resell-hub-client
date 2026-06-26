import React from 'react';

import MyProductsPage from './my-products';
import { getUserSession } from '@/lib/core/session';

const MyProducts = async () => {
    const user = await getUserSession();
    console.log("USer", user);

    return (
        <div>
            <MyProductsPage user={user} />
        </div>
    );
};

export default MyProducts;