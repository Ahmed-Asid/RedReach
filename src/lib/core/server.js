import { redirect } from "next/navigation";
import { authHeader } from "./authHeader";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    
    return handleStatusCode(res);
}

export const protectedFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`,
        // {
        //     headers: await authHeader()
        // }
    );

    // handle 401, 403

    return handleStatusCode(res);
}


export const serverMutation = async (path, data = null, method = "POST") => {
    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            ...(data && { "Content-Type": "application/json" }),
        },
        ...(data && { body: JSON.stringify(data) }),
    });

    return handleStatusCode(res);
};


// handle 401, 404, 403
const handleStatusCode = async (res) => {
    if (res.status === 401) {
        redirect('/unauthorized');
    } else if (res.status === 403) {
        redirect('/forbidden');
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`API failed to return JSON from ${res.url}. Status: ${res.status}. Response: ${text.slice(0, 100)}`);
    }

    return res.json();
}