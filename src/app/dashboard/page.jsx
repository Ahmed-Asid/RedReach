import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session.user;
    const role = user.role || "donor";

    return (
        <div className="space-y-8">
            <div>
                <p className="text-sm font-medium text-danger">
                    Dashboard
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Welcome back, {user.name || "there"} 👋
                </h1>

                <p className="mt-2 text-sm text-default-500">
                    Manage your RedReach account and activities from here.
                </p>
            </div>

            <div className="rounded-2xl border border-default-200 bg-background p-6 shadow-sm">
                <p className="text-sm text-default-500">
                    Your role
                </p>

                <p className="mt-1 text-xl font-semibold capitalize">
                    {role}
                </p>
            </div>
        </div>
    );
}