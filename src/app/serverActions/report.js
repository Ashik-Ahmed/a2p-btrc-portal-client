"use server"

export async function getA2PSummaryReport(accessToken, filter) {
    const response = await fetch(`${process.env.API_SERVER_URL}/report/a2pSummaryReport?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await response.json()
    return data
}

export async function getDatewiseCountReport(accessToken, filter) {

    const response = await fetch(`${process.env.API_SERVER_URL}/report/datewiseReport?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await response.json()
    return data
}


export async function getAggregatorwiseCountReport(accessToken, filter) {
    console.log(accessToken, filter);
    const response = await fetch(`${process.env.API_SERVER_URL}/report/aggregatorwiseReport?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await response.json();
    return data;
}