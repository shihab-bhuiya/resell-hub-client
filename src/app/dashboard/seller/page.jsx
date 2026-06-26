import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const SellerPage = async () => {
    const user = await getUserSession();
    if (user.role !== 'seller') {
        redirect('/unauthorized');
        return;
    }
    return (
        <div>
            <h2>Seller Page</h2>
        </div>
    );
};

export default SellerPage;