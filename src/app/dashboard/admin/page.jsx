import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

import React from 'react';
import AdminOverView from './AdminPage';


const AdminPage = async () => {
    const user = await getUserSession();
    if (user.role !== 'admin') {
        redirect('/unauthorized');
        return;
    }
    return (
        <div>
            <AdminOverView />
        </div>
    );
};

export default AdminPage;