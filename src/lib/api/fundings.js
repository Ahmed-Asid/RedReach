'use server'

import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFundingInfo = async () => {
    const res = await fetch(`${baseUrl}/api/donations`,{
        cache: 'no-store'
    })
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
