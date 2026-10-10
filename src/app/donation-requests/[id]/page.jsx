import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/react";
import {
    FiArrowLeft,
    FiCalendar,
    FiClock,
    FiDroplet,
    FiMapPin,
    FiMessageSquare,
    FiUser,
} from "react-icons/fi";

import { getUserSession } from "@/lib/core/session";
import { getBloodDonationRequestById } from "@/lib/api/requests";
import DonateBloodModal from "@/app/components/requests/DonateBloodModal";

export default async function DonationRequestDetailsPage({
    params,
}) {
    const user = await getUserSession();


    // This page is private.
    if (!user) {
        redirect("/auth/login");
    }

    const { id } = await params;

    const request = await getBloodDonationRequestById(id);
    console.log("request details", id, request)

    // Request does not exist
    if (!request) {
        return (
            <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-default-200 bg-content1 px-6 py-16 text-center shadow-sm">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-danger-50">
                        <FiDroplet className="size-7 text-danger" />
                    </div>

                    <h1 className="mt-5 text-2xl font-bold text-foreground">
                        Request Not Found
                    </h1>

                    <p className="mx-auto mt-2 max-w-md text-sm text-default-500">
                        The donation request you are looking for
                        does not exist or may have been removed.
                    </p>

                    <Link
                        href="/donation-requests"
                        className="mt-6 inline-block"
                    >
                        <Button
                            color="danger"
                            variant="flat"
                        >
                            <FiArrowLeft />
                            Back to Requests
                        </Button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">

            {/* Main Card */}
            <div className="overflow-hidden rounded-2xl border border-default-200 bg-content1 shadow-sm">
                {/* Header */}
                <div className="border-b border-danger-100 bg-danger-50 px-6 py-8 sm:px-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-danger">
                                <FiDroplet />
                                <span>
                                    Blood Donation Request
                                </span>
                            </div>

                            <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                                Blood needed for{" "}
                                {request.recipientName}
                            </h1>

                            <p className="mt-2 text-sm text-default-500">
                                Please review the request details
                                before responding.
                            </p>
                        </div>

                        {/* Blood Group */}
                        <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-danger text-white">
                            <FiDroplet className="size-5" />

                            <span className="mt-1 text-xl font-bold">
                                {request.bloodGroup}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-8 p-6 sm:p-8">
                    {/* Recipient Information */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <FiUser className="text-danger" />

                            <h2 className="text-lg font-semibold text-foreground">
                                Recipient Information
                            </h2>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <InfoItem
                                icon={<FiUser />}
                                label="Recipient Name"
                                value={
                                    request.recipientName
                                }
                            />

                            <InfoItem
                                icon={<FiDroplet />}
                                label="Blood Group"
                                value={
                                    request.bloodGroup
                                }
                            />

                            <InfoItem
                                icon={<FiMapPin />}
                                label="District"
                                value={
                                    request.recipientDistrict
                                }
                            />

                            <InfoItem
                                icon={<FiMapPin />}
                                label="Upazila"
                                value={
                                    request.recipientUpazila
                                }
                            />
                        </div>
                    </section>

                    {/* Donation Location */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <FiMapPin className="text-danger" />

                            <h2 className="text-lg font-semibold text-foreground">
                                Donation Location
                            </h2>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <InfoItem
                                icon={<FiMapPin />}
                                label="Hospital"
                                value={
                                    request.hospitalName
                                }
                            />

                            <InfoItem
                                icon={<FiMapPin />}
                                label="District"
                                value={
                                    request.recipientDistrict
                                }
                            />

                            <div className="rounded-xl bg-default-50 p-4 sm:col-span-2">
                                <p className="text-sm text-default-500">
                                    Full Address
                                </p>

                                <p className="mt-1 text-sm leading-6 font-medium text-foreground">
                                    {request.fullAddress ||
                                        "Not provided"}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Donation Schedule */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <FiCalendar className="text-danger" />

                            <h2 className="text-lg font-semibold text-foreground">
                                Donation Schedule
                            </h2>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <InfoItem
                                icon={<FiCalendar />}
                                label="Donation Date"
                                value={formatDate(
                                    request.donationDate
                                )}
                            />

                            <InfoItem
                                icon={<FiClock />}
                                label="Donation Time"
                                value={formatTime(
                                    request.donationTime
                                )}
                            />
                        </div>
                    </section>

                    {/* Request Message */}
                    {request.requestMessage && (
                        <section>
                            <div className="mb-4 flex items-center gap-2">
                                <FiMessageSquare className="text-danger" />

                                <h2 className="text-lg font-semibold text-foreground">
                                    Request Message
                                </h2>
                            </div>

                            <div className="rounded-xl bg-default-50 p-5">
                                <p className="whitespace-pre-line text-sm leading-7 text-foreground">
                                    {
                                        request.requestMessage
                                    }
                                </p>
                            </div>
                        </section>
                    )}
                </div>

                {/* Footer */}
                <DonateBloodModal request={request} requestId={request._id} user={user} status={request.status} />
            </div>
        </main>
    );


}

function InfoItem({ icon, label, value }) {
    return (<div className="flex items-start gap-3 rounded-xl bg-default-50 p-4"> <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-danger-50 text-danger">
        {icon} </div>


        <div className="min-w-0">
            <p className="text-sm text-default-500">
                {label}
            </p>

            <p className="mt-1 break-words font-medium text-foreground">
                {value || "Not provided"}
            </p>
        </div>
    </div>
    );


}

function formatDate(date) {
    if (!date) return "—";


    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
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
