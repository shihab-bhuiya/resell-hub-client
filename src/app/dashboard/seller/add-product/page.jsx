import React from 'react';
import AddProductPage from './add-product';
import { getUserSession } from '@/lib/core/session';

const AddProduct = async () => {
    const user = await getUserSession();
    console.log("USer", user);
    console.log(process.env.NEXT_PUBLIC_SERVER_URI);
    return (
        <div>
            <AddProductPage user={user} />
        </div>
    );
};

export default AddProduct;