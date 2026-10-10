import { serverFetch } from "../core/server"

export const getAllUser = async() => {
    return serverFetch('/api/users');
}