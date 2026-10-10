"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { FiFilter } from "react-icons/fi";

import RequestsTable from "../requests/RequestsTable";
import { deleteDonationRequest, updateDonationRequest } from "@/lib/actions/requests";

const statuses = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "inprogress", label: "In Progress" },
    { value: "done", label: "Done" },
    { value: "canceled", label: "Canceled" },
];

export default function MyDonationRequests({
    user,
    requests = []
}) {
    const router = useRouter();

    const [selectedStatus, setSelectedStatus] = useState("all");

    const filteredRequests =
        selectedStatus === "all"
            ? requests
            : requests.filter(
                (request) =>
                    request.status?.toLowerCase() ===
                    selectedStatus.toLowerCase()
            );


    const onStatusChange = async (id, state) => {

        const data = { status: state }
        return await updateDonationRequest(id, data);
    }

    const onDelete = async (id) => {
        return await deleteDonationRequest(id);
    }

    return (
        <div className="space-y-6">
            {/* Filter */}
            <Card className="border border-slate-200 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <FiFilter className="text-slate-500" />

                        <span className="text-sm font-semibold text-slate-700">
                            Filter by status
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                            <Button
                                key={status.value}
                                size="sm"
                                variant={
                                    selectedStatus === status.value
                                        ? "primary"
                                        : "secondary"
                                }
                                onPress={() =>
                                    setSelectedStatus(status.value)
                                }
                            >
                                {status.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Table */}
            {filteredRequests.length > 0 ? (
                <RequestsTable
                    user={user}
                    requests={filteredRequests}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                // onEdit={onEdit}
                // onView={onView}
                />
            ) : (
                <Card className="flex min-h-60 items-center justify-center border border-slate-200">
                    <div className="text-center">
                        <h2 className="font-semibold text-slate-800">
                            No donation requests found
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            There are no requests with the selected
                            status.
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
}