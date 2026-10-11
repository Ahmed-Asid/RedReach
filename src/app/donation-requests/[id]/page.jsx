import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/react";

import {
    FiArrowLeft,
    FiCalendar,
    FiClock,
    FiDroplet,
    FiHome,
    FiMapPin,
    FiMessageSquare,
    FiUser,
} from "react-icons/fi";

import { getUserSession } from "@/lib/core/session";
import { getBloodDonationRequestById } from "@/lib/api/requests";
import DonateBloodModal from "@/app/components/requests/DonateBloodModal";
import Navbar from "@/app/components/homepage/Navbar";


export default async function DonationRequestDetailsPage({
    params,
}) {

    const user = await getUserSession();

    if (!user) {
        redirect("/auth/login");
    }

    const { id } = await params;

    const request = await getBloodDonationRequestById(id);


    if (!request) {
        return (
            <main className="mx-auto max-w-4xl px-4 py-10">
                <div className="rounded-3xl border border-default-200 bg-content1 p-12 text-center">

                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-danger-50">
                        <FiDroplet className="size-8 text-danger" />
                    </div>

                    <h1 className="mt-5 text-2xl font-bold">
                        Request Not Found
                    </h1>

                    <Link href="/donation-requests">
                        <Button
                            className="mt-6"
                            color="danger"
                            variant="flat"
                        >
                            <FiArrowLeft />
                            Back Requests
                        </Button>
                    </Link>

                </div>
            </main>
        );
    }


    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-5xl px-4 py-10">


                <div className="overflow-hidden rounded-3xl border border-default-200 bg-content1 shadow-sm">


                    {/* Hero */}

                    <div className="bg-gradient-to-r from-danger-50 to-white p-8">

                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">


                            <div>

                                <div className="flex items-center gap-2 text-danger">
                                    <FiDroplet />
                                    <span className="font-medium">
                                        Blood Donation Request
                                    </span>
                                </div>


                                <h1 className="mt-3 text-3xl font-bold">
                                    Blood needed for {request.recipientName}
                                </h1>


                                <p className="mt-2 text-default-500">
                                    Help save a life by donating blood.
                                </p>

                            </div>



                            <div className="rounded-3xl bg-danger p-6 text-center text-white shadow-lg">

                                <FiDroplet className="mx-auto size-7" />

                                <p className="mt-2 text-3xl font-bold">
                                    {request.bloodGroup}
                                </p>

                                <span className="text-sm opacity-80">
                                    Required
                                </span>

                            </div>


                        </div>

                    </div>



                    <div className="grid gap-8 p-8 lg:grid-cols-3">


                        {/* Main information */}

                        <div className="space-y-8 lg:col-span-2">



                            <Section
                                icon={<FiUser />}
                                title="Recipient"
                            >

                                <InfoCard
                                    title="Patient Name"
                                    value={request.recipientName}
                                />

                                <InfoCard
                                    title="Blood Group"
                                    value={request.bloodGroup}
                                />

                            </Section>




                            <Section
                                icon={<FiHome />}
                                title="Hospital Information"
                            >

                                <InfoCard
                                    title="Hospital"
                                    value={request.hospitalName}
                                />


                                <InfoCard
                                    title="Address"
                                    value={request.fullAddress}
                                />

                            </Section>



                            <Section
                                icon={<FiMapPin />}
                                title="Location"
                            >

                                <InfoCard
                                    title="District"
                                    value={request.recipientDistrict}
                                />

                                <InfoCard
                                    title="Upazila"
                                    value={request.recipientUpazila}
                                />


                            </Section>



                            {
                                request.requestMessage &&
                                <Section
                                    icon={<FiMessageSquare />}
                                    title="Message"
                                >

                                    <div className="rounded-2xl bg-default-50 p-5 leading-7 text-default-700">
                                        {request.requestMessage}
                                    </div>

                                </Section>
                            }


                        </div>



                        {/* Side summary */}

                        <aside className="rounded-3xl bg-default-50 p-6 h-fit">


                            <h2 className="font-semibold text-lg">
                                Donation Schedule
                            </h2>


                            <div className="mt-5 space-y-5">


                                <ScheduleItem
                                    icon={<FiCalendar />}
                                    label="Date"
                                    value={formatDate(request.donationDate)}
                                />


                                <ScheduleItem
                                    icon={<FiClock />}
                                    label="Time"
                                    value={formatTime(request.donationTime)}
                                />


                            </div>


                            <div className="mt-8">

                                <DonateBloodModal
                                    request={request}
                                    requestId={request._id}
                                    user={user}
                                    status={request.status}
                                />

                            </div>


                        </aside>



                    </div>


                </div>


            </main>
        </>
    );
}



function Section({
    icon,
    title,
    children
}) {

    return (
        <section>

            <div className="mb-4 flex items-center gap-3">

                <div className="rounded-xl bg-danger-50 p-2 text-danger">
                    {icon}
                </div>

                <h2 className="text-xl font-semibold">
                    {title}
                </h2>

            </div>


            <div className="grid gap-4 sm:grid-cols-2">
                {children}
            </div>

        </section>
    );

}



function InfoCard({
    title,
    value
}) {

    return (
        <div className="rounded-2xl border border-default-200 bg-content1 p-5">

            <p className="text-sm text-default-500">
                {title}
            </p>

            <p className="mt-2 font-semibold">
                {value || "Not provided"}
            </p>

        </div>
    );

}



function ScheduleItem({
    icon,
    label,
    value
}) {

    return (
        <div className="flex items-center gap-4">

            <div className="rounded-xl bg-white p-3 shadow-sm text-danger">
                {icon}
            </div>


            <div>

                <p className="text-sm text-default-500">
                    {label}
                </p>

                <p className="font-semibold">
                    {value}
                </p>

            </div>

        </div>
    );

}



function formatDate(date) {

    if (!date) return "—";

    return new Intl.DateTimeFormat(
        "en-GB",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    ).format(new Date(date));

}



function formatTime(time) {

    if (!time) return "—";

    const [h, m] = time.split(":");

    const date = new Date();

    date.setHours(Number(h), Number(m));


    return new Intl.DateTimeFormat(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    ).format(date);

}