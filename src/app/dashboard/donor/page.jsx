import React from 'react';

import DashboardRequests from '@/app/components/donor/DashboardRequests';
import { getUserSession } from '@/lib/core/session';
import { getBloodDonationRequestsByUserId } from '@/lib/api/requests';
import DashboardPage from '../Dashboard';

const DonorDashboardPage = async () => {

    const user = await getUserSession();

    const requests = await getBloodDonationRequestsByUserId(user.id);
    console.log('usercheck', user, 'requestscheck', requests[0])
    return (
        <div>
            <DashboardPage user={user} />
            <DashboardRequests requests={requests} />
        </div>
    );
};

export default DonorDashboardPage;