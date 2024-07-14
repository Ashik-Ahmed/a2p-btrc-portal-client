"use server"

export async function getA2PSummaryReport(filter) {
    const response = await fetch(`${process.env.API_SERVER_URL}/report/a2pSummaryReport?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store',
    })
    const data = await response.json()
    return data
}