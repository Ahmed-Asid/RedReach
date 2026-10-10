export const dynamic = 'force-dynamic';

import Link from "next/link";
import { Button } from "@heroui/react";
import {
    FiArrowRight,
    FiCalendar,
    FiClock,
    FiDroplet,
    FiMapPin,
    FiUser,
} from "react-icons/fi";

import { getBloodDonationRequests } from "@/lib/api/requests";

export default async function DonationRequestsPage() {
    const data = await getBloodDonationRequests();

    const requests = Array.isArray(data)
        ? data
        : data?.requests || [];

    const pendingRequests = requests.filter(
        (request) =>
            request.status?.toLowerCase() === "pending"
    );

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm font-medium text-danger">
                    <FiDroplet />
                    <span>Blood Donation Requests</span>
                </div>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Find Someone Who Needs Blood
                </h1>

                <p className="mt-2 max-w-2xl text-default-500">
                    Browse active blood donation requests and help
                    someone in need.
                </p>
            </div>

            {/* Empty State */}
            {pendingRequests.length === 0 ? (
                <div className="rounded-2xl border border-default-200 bg-content1 px-6 py-16 text-center shadow-sm">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-danger-50">
                        <FiDroplet className="size-6 text-danger" />
                    </div>

                    <h2 className="mt-4 text-xl font-semibold text-foreground">
                        No pending requests
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-sm text-default-500">
                        There are currently no pending blood donation
                        requests.
                    </p>
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden overflow-hidden rounded-2xl border border-default-200 bg-content1 shadow-sm md:block">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-default-200 bg-default-50">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-foreground">
                                            Recipient
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold text-foreground">
                                            Location
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold text-foreground">
                                            Blood Group
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold text-foreground">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold text-foreground">
                                            Time
                                        </th>

                                        <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-default-200">
                                    {pendingRequests.map((request) => (
                                        <tr
                                            key={request._id}
                                            className="transition-colors hover:bg-default-50"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-danger-50">
                                                        <FiUser className="size-4 text-danger" />
                                                    </div>

                                                    <span className="font-medium text-foreground">
                                                        {request.recipientName}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-default-500">
                                                    <FiMapPin className="size-4 shrink-0" />

                                                    <span>
                                                        {request.recipientUpazila},{" "}
                                                        {request.recipientDistrict}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full bg-danger-50 px-3 py-1 text-sm font-semibold text-danger">
                                                    {request.bloodGroup}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-default-500">
                                                    <FiCalendar className="size-4" />

                                                    {formatDate(
                                                        request.donationDate
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-default-500">
                                                    <FiClock className="size-4" />

                                                    {formatTime(
                                                        request.donationTime
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/donation-requests/${request._id}`}
                                                >
                                                    <Button
                                                        color="danger"
                                                        variant="flat"
                                                        size="sm"
                                                    >
                                                        View
                                                        <FiArrowRight />
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="grid gap-4 md:hidden">
                        {pendingRequests.map((request) => (
                            <div
                                key={request._id}
                                className="rounded-2xl border border-default-200 bg-content1 p-5 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-danger-50">
                                            <FiUser className="size-5 text-danger" />
                                        </div>

                                        <div>
                                            <h2 className="font-semibold text-foreground">
                                                {request.recipientName}
                                            </h2>

                                            <div className="mt-1 flex items-center gap-1.5 text-sm text-default-500">
                                                <FiMapPin className="size-3.5" />

                                                <span>
                                                    {request.recipientUpazila},{" "}
                                                    {request.recipientDistrict}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <span className="shrink-0 rounded-full bg-danger-50 px-3 py-1 text-sm font-semibold text-danger">
                                        {request.bloodGroup}
                                    </span>
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-default-200 pt-4">
                                    <div className="flex items-center gap-2">
                                        <FiCalendar className="size-4 text-default-400" />

                                        <div>
                                            <p className="text-xs text-default-400">
                                                Date
                                            </p>

                                            <p className="text-sm font-medium text-foreground">
                                                {formatDate(
                                                    request.donationDate
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FiClock className="size-4 text-default-400" />

                                        <div>
                                            <p className="text-xs text-default-400">
                                                Time
                                            </p>

                                            <p className="text-sm font-medium text-foreground">
                                                {formatTime(
                                                    request.donationTime
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={`/donation-requests/${request._id}`}
                                    className="mt-5 block"
                                >
                                    <Button
                                        color="danger"
                                        variant="flat"
                                        className="w-full"
                                    >
                                        View Request
                                        <FiArrowRight />
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </main>
    );

}

function formatDate(date) {
    if (!date) return "—";


    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));

}

function formatTime(time) {
    if (!time) return "—";


    const [hours, minutes] = time.split(":");

    if (hours === undefined || minutes === undefined) {
        return time;
    }

    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
    }).format(date);
}