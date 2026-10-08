
import MyDonationRequests from "@/app/components/donor/MyDonationRequests";
import { getBloodDonationRequestsByUserId } from "@/lib/api/requests";
import { getUserSession, requireRole } from "@/lib/core/session";

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
    await requireRole('donor')
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

    const user = await getUserSession();
    console.log(user)
    const data = await getBloodDonationRequestsByUserId(user.id)
    console.log(data)

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    My Donation Requests
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage all donation requests you have created.
                </p>
            </div>

            <MyDonationRequests
                requests={data}
                pagination={data}
                currentStatus={status}
                currentPage={page}
            />
        </section>
    );
}