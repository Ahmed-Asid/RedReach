'use server'

import { serverFetch } from "../core/server";

export const getFundingInfo = async () => {
    return serverFetch('/api/donations');
}