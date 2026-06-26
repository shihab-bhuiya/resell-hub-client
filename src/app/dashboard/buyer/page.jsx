import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

import React from 'react';

const BuyerPage = async () => {
    const user = await getUserSession();
    if (user.role !== 'buyer') {
        redirect('/unauthorized');
        return;
    }
    return (
        <div>
            <h2>Buyer Page</h2>
        </div>
    );
};

export default BuyerPage;