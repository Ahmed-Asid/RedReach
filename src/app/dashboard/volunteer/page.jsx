
import DashboardPage from '../Dashboard';
import { getUserSession } from '@/lib/core/session';
import { getAllUser } from '@/lib/api/users';
import { getBloodDonationRequests } from '@/lib/api/requests';
import DashboardFeatureCard from '@/app/components/admin/DashboardFeatureCard';
import { getFundingInfo } from '@/lib/api/fundings';

const VolunteerDashboardPage = async () => {

    const user = await getUserSession();
    const users = await getAllUser();
    const requests = await getBloodDonationRequests();
    const funds = await getFundingInfo();

    return (
        <div>
            <DashboardPage user={user} />
            <DashboardFeatureCard users={users} requests={requests} funds={funds} />
        </div>
    );

};

export default VolunteerDashboardPage;