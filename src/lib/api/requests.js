import { protectedFetch, serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getBloodDonationRequestsByUserId = async (requesterId) => {
    return protectedFetch(`/api/donation-requests/user/${requesterId}`)
};

export const getBloodDonationRequestById = async (id) => {
    return protectedFetch(`/api/donation-requests/details/${id}`)
};

export const getBloodDonationRequests = async () => {
    return serverFetch('/api/donation-requests');
}