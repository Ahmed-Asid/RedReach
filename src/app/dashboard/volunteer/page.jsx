
import DashboardPage from '../Dashboard';
import { getUserSession } from '@/lib/core/session';
import { getAllUser } from '@/lib/api/users';
import { getBloodDonationRequests } from '@/lib/api/requests';
import DashboardFeatureCard from '@/app/components/admin/DashboardFeatureCard';

const VolunteerDashboardPage = async () => {

    const user = await getUserSession();
    const users = await getAllUser();
    const requests = await getBloodDonationRequests();

    return (
        <div>
            <DashboardPage user={user} />
            <DashboardFeatureCard users={users} requests={requests} />
        </div>
    );

};

export default VolunteerDashboardPage;