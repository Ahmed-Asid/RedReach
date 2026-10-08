"use client"

import { Button } from '@heroui/react';
import React from 'react';
import RequestsTable from '../requests/RequestsTable';
import { useRouter } from 'next/navigation';
import { deleteDonationRequest, updateDonationRequest } from '@/lib/actions/requests';

const DashboardRequests = ({ requests }) => {

    const router = useRouter();

    const recentRequests = [...requests]
        .sort(
            (a, b) =>
                new Date(b.donationDate) - new Date(a.donationDate)
        )
        .slice(0, 3);

    const onStatusChange = async (id, state) => {

        const data = { status: state }
        return await updateDonationRequest(id, data);
    }

    const onDelete = async (id) => {
        return await deleteDonationRequest(id);
    }

    console.log('recentRequests', recentRequests)
    return (
        <>

            <RequestsTable
                requests={recentRequests}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
            />

            <div className="flex justify-center">
                <Button
                    color="danger"
                    variant="flat"
                    onPress={() =>
                        router.push(
                            "/dashboard/donor/my-donation-requests"
                        )
                    }
                >
                    View My All Requests
                </Button>
            </div>
        </>
    );
};

export default DashboardRequests;