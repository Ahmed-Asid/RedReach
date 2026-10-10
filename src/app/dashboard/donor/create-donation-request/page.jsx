import { auth } from "@/lib/auth";
import { getUserSession, requireRole } from "@/lib/core/session";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateDonationRequestForm from "./CreateDonationRequestForm";
import BlockedAccount from "@/app/components/blocked/BlockedAccount";


export default async function CreateDonationRequestPage() {

    const user = await getUserSession();

    if (user.status !== "active") {
        console.log('blocked user', user)
        return <BlockedAccount />
    }

    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-8">
                <p className="text-sm font-medium text-danger">
                    Donation Request
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Create Donation Request
                </h1>

                <p className="mt-2 text-sm text-default-500">
                    Provide the details below to request blood for someone in
                    need.
                </p>
            </div>

            <CreateDonationRequestForm user={user} />
        </div>
    );
}