"use server"

export async function getTopAggregators(interval) {
    const response = await fetch(`http://localhost:5000/api/v1/dashboard/topAggregator?interval=${interval}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data?.data;
}


export async function getTopAns(interval) {
    const response = await fetch(`http://localhost:5000/api/v1/dashboard/topANS?interval=${interval}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data?.data;
}