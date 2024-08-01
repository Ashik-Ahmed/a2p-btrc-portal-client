"use server"

import { API_SERVER_URL } from "../../../config";

export async function getTopAggregators(accessToken, interval) {
    const url = `${API_SERVER_URL}/dashboard/topAggregator?interval=${interval}`
    console.log("Top Aggregators: ", url);
    const response = await fetch(url, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
    const data = await response.json()
    return data?.data;
}


export async function getTopAns(accessToken, interval) {
    const response = await fetch(`${API_SERVER_URL}/dashboard/topANS?interval=${interval}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
    const data = await response.json()
    return data?.data;
}