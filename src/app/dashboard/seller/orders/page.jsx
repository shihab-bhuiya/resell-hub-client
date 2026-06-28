import React from 'react';


import OrdersPage from './OrderPage';
import { getUserSession } from '@/lib/core/session';

const MyProducts = async () => {
    const user = await getUserSession();
    console.log("USer", user);

    return (
        <div>
            <OrdersPage user={user} />
        </div>
    );
};

export default MyProducts;