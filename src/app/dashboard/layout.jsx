
import { redirect } from "next/navigation";

import DashboardShell from "./DashboardShell";
import { getUserSession } from "@/lib/core/session";

export default async function DashboardLayout({ children }) {

    const user = await getUserSession();

    if (!user) {
        redirect("/login");
    }

    return (
        <DashboardShell user={user}>
            {children}
        </DashboardShell>
    );
}