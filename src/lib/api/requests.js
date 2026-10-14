import { protectedFetch, serverFetch } from "../core/server";

export const getBloodDonationRequestsByUser = async () => {
    return protectedFetch(`/api/donation-requests/my-requests`)
};

export const getBloodDonationRequestById = async (id) => {
    return protectedFetch(`/api/donation-requests/details/${id}`)
};

export const getBloodDonationRequests = async () => {
    return serverFetch('/api/donation-requests');
}