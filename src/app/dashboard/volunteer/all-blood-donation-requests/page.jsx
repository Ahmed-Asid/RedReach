
import MyDonationRequests from "@/app/components/donor/MyDonationRequests";
import { getBloodDonationRequests } from "@/lib/api/requests";
import { getUserSession } from "@/lib/core/session";

const VALID_STATUSES = [
    "all",
    "pending",
    "inprogress",
    "done",
    "canceled",
];

const ITEMS_PER_PAGE = 10;

export default async function MyDonationRequestsPage({
    searchParams,
}) {

    const params = await searchParams;

    const status = VALID_STATUSES.includes(params?.status)
        ? params.status
        : "all";

    const page = Math.max(
        1,
        Number.parseInt(params?.page || "1", 10) || 1
    );

    const query = new URLSearchParams({
        page: String(page),
        limit: String(ITEMS_PER_PAGE),
    });

    if (status !== "all") {
        query.set("status", status);
    }

    const data = await getBloodDonationRequests();
    const user = await getUserSession()

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Blood Donation Requests
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage all donation requests created by users.
                </p>
            </div>

            <MyDonationRequests
                user={user}
                requests={data}
                pagination={data}
                currentStatus={status}
                currentPage={page}
                title="All donation requests"
                description="Manage all donation requests created by users."
            />
        </section>
    );
}