import AllUsersTable from "@/app/components/admin/AllUsersTable";
import { getAllUser } from "@/lib/api/users";

const AllUsersPage = async () => {

    const users = await getAllUser();

    return (
        <div>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl"> All Users </h1>
                    <p className="mt-2 text-sm text-gray-500"> Manage users, update roles, and control account access. </p>
                </div>
                <AllUsersTable initialUsers={users} /> </div>
        </div>
    );
};

export default AllUsersPage;