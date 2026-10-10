'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server"
import { getUserSession } from "../core/session";

export const updateDonationRequest = async(id, data) => {
    const result = await serverMutation(`/api/donation-requests/${id}`, data, 'PATCH');
    revalidatePath('/dashboard/donor/my-donation-requests');
    return result;
}

export const deleteDonationRequest = async(id) => {
    const result = await serverMutation(`/api/donation-requests/${id}`,null, 'DELETE')
    revalidatePath('/dashboard/donor/my-donation-requests');
    return result;
}

export const confirmDonation = async (requestId) => {
    const user = await getUserSession();

    if (!user) {
        return {
            error: true,
            message: "Please log in to confirm your donation.",
        };
    }

    if (!requestId) {
        return {
            error: true,
            message: "Donation request ID is missing.",
        };
    }

    return serverMutation(
        `/api/donation-requests/${requestId}`,
        {
            status: "inprogress",
            donorName: user.name,
            donorEmail: user.email,
        },
        "PATCH"
    );
};