import { requireRole } from "@/lib/core/session";

const VolunteerLayout = async ({ children }) => {

    await requireRole('volunteer');

    return (
        <div>
            {children}
        </div>
    );
};

export default VolunteerLayout;