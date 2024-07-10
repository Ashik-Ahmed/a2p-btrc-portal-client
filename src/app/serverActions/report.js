export async function getA2PSummaryReport(filter) {
    const response = await fetch(`http://localhost:5000/api/v1/report/a2pSummaryReport?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store',
    })
    const data = await response.json()
    return data
}