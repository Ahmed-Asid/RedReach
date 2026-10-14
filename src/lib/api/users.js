import { protectedFetch } from "../core/server"

export const getAllUser = async() => {
    return protectedFetch('/api/users');
}