"use server"

export async function getTopAggregators(interval) {
    const response = await fetch(`${process.env.API_SERVER_URL}/dashboard/topAggregator?interval=${interval}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data?.data;
}


export async function getTopAns(interval) {
    const response = await fetch(`${process.env.API_SERVER_URL}/dashboard/topANS?interval=${interval}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data?.data;
}