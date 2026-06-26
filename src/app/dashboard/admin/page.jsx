import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

import React from 'react';


const AdminPage = async () => {
    const user = await getUserSession();
    if (user.role !== 'admin') {
        redirect('/unauthorized');
        return;
    }
    return (
        <div>
            <h2>Admin Page</h2>
        </div>
    );
};

export default AdminPage;