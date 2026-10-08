'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server"

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