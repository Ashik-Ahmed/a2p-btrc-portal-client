"use server"

export async function getTopAggregators(accessToken, interval) {
    const response = await fetch(`${process.env.API_SERVER_URL}/dashboard/topAggregator?interval=${interval}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
    const data = await response.json()
    return data?.data;
}


export async function getTopAns(accessToken, interval) {
    const response = await fetch(`${process.env.API_SERVER_URL}/dashboard/topANS?interval=${interval}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
    const data = await response.json()
    return data?.data;
}