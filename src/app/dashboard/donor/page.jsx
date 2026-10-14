import React from 'react';

import DashboardRequests from '@/app/components/donor/DashboardRequests';
import { getUserSession } from '@/lib/core/session';
import { getBloodDonationRequestsByUser } from '@/lib/api/requests';
import DashboardPage from '../Dashboard';

const DonorDashboardPage = async () => {

    const user = await getUserSession();

    const requests = await getBloodDonationRequestsByUser();

    return (
        <div>
            <DashboardPage user={user} />
            {
                requests.length === 0 ? <div className="flex items-center">
                    <p className='mx-auto text-red-500'>You haven&apos;t requested for a donation yet.</p>
                </div> : <DashboardRequests user={user} requests={requests} />
            }
        </div>
    );
};

export default DonorDashboardPage;