'use server'

import { serverMutation } from "../core/server"

export const postFundingInfo = async(fundingData) => {
    return serverMutation(`/api/donations`, fundingData)
}