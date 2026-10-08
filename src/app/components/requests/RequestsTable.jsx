
"use client";

import { Button, Card } from "@heroui/react";
import {
    FiCalendar,
    FiCheck,
    FiClock,
    FiEdit2,
    FiEye,
    FiMail,
    FiMapPin,
    FiTrash2,
    FiUser,
    FiX,
} from "react-icons/fi";

import DeleteRequestModal from "./DeleteRequestModal";
import Link from "next/link";

export default function RequestsTable({
    requests,
    onStatusChange,
    onDelete,
    title = "Recent Donation Requests",
    description = "Your latest donation requests.",
}) {
    if (!requests?.length) {
        return <div className="flex items-center content-center">
            <p>You haven&apos;t requested for a donation yet.</p>
        </div>
    }


    const statusStyles = {
        pending: "bg-yellow-50 text-yellow-700",
        inprogress: "bg-blue-50 text-blue-700",
        done: "bg-green-50 text-green-700",
        canceled: "bg-red-50 text-red-700",
    };

    const statusLabels = {
        pending: "Pending",
        inprogress: "In Progress",
        done: "Done",
        canceled: "Canceled",
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    return (
        <section>
            <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {description}
                </p>
            </div>

            <Card className="overflow-hidden border border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px]">
                        <thead>
                            <tr className="border-b bg-slate-50">
                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Recipient
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Location
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Date & Time
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Blood
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Donor
                                </th>

                                <th className="px-5 py-4 text-center text-xs font-semibold uppercase text-slate-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {requests.map((request) => (
                                <tr
                                    key={request._id}
                                    className="border-b last:border-0 hover:bg-slate-50"
                                >
                                    <td className="px-5 py-4">
                                        <p className="font-medium text-slate-800">
                                            {request.recipientName}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <FiMapPin size={15} />
                                            <span>
                                                {request.recipientDistrict},{" "}
                                                {request.recipientUpazila}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <FiCalendar size={14} />
                                                {formatDate(
                                                    request.donationDate
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 text-slate-500">
                                                <FiClock size={14} />
                                                {request.donationTime}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-600">
                                            {request.bloodGroup}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[
                                                request.status
                                            ]
                                                }`}
                                        >
                                            {
                                                statusLabels[
                                                request.status
                                                ]
                                            }
                                        </span>

                                        {request.status ===
                                            "inprogress" && (
                                                <div className="mt-2 flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        color="success"
                                                        variant="flat"
                                                        onPress={() =>
                                                            onStatusChange(
                                                                request._id,
                                                                "done"
                                                            )
                                                        }
                                                    >
                                                        <FiCheck />
                                                        Done
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        color="danger"
                                                        variant="flat"
                                                        onPress={() =>
                                                            onStatusChange(
                                                                request._id,
                                                                "canceled"
                                                            )
                                                        }
                                                    >
                                                        <FiX />
                                                        Cancel
                                                    </Button>
                                                </div>
                                            )}
                                    </td>

                                    <td className="px-5 py-4">
                                        {request.status ===
                                            "inprogress" &&
                                            request.donor ? (
                                            <div className="text-sm">
                                                <p className="flex items-center gap-2 font-medium text-slate-700">
                                                    <FiUser size={14} />
                                                    {request.donor.name}
                                                </p>

                                                <p className="mt-1 flex items-center gap-2 text-slate-500">
                                                    <FiMail size={13} />
                                                    {request.donor.email}
                                                </p>
                                            </div>
                                        ) : (
                                            <span className="text-slate-400">
                                                —
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex justify-center gap-2 items-center">
                                            <Link
                                                href={`/donation-requests/${request._id}`}
                                                size="sm"
                                                variant="flat"
                                                aria-label="View request"
                                            >
                                                <FiEye />
                                            </Link>

                                            <Button
                                                size="sm"
                                                variant="flat"
                                                aria-label="Edit request"
                                                onPress={() =>
                                                    onEdit(request._id)
                                                }
                                            >
                                                <FiEdit2 />
                                            </Button>

                                            <DeleteRequestModal
                                                request={request}
                                                onDelete={onDelete}
                                            >
                                                <Button
                                                    size="sm"
                                                    color="danger"
                                                    variant="flat"
                                                    aria-label="Delete request"
                                                >
                                                    <FiTrash2 />
                                                </Button>
                                            </DeleteRequestModal>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </section>
    );
}
