
import { redirect } from "next/navigation";

import ProfileForm from "@/app/components/profile/ProfileForm";
import { getUserSession, requireRole } from "@/lib/core/session";

export default async function ProfilePage() {

    const user = await getUserSession();

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    My Profile
                </h1>

                <p className="mt-1 text-sm text-default-500">
                    View and update your personal information.
                </p>
            </div>

            <ProfileForm user={user} />
        </section>
    );
}