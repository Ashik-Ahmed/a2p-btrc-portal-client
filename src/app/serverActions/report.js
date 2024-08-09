"use server"

export async function getA2PSummaryReport(accessToken, filter) {
    const response = await fetch(`${process.env.API_SERVER_URL}/summaryReport/a2pSummaryReport?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await response.json()
    return data
}

export async function getDatewiseCountReport(accessToken, filter) {

    const response = await fetch(`${process.env.API_SERVER_URL}/dippingReport/datewiseReport?filter=${JSON.stringify(filter)}`, {
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
    const response = await fetch(`${process.env.API_SERVER_URL}/dippingReport/aggregatorwiseReport?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await response.json();
    return data;
}


export async function getMSISDNDetailsReport(accessToken, filter) {

    const response = await fetch(`${process.env.API_SERVER_URL}/detailsReport/msisdn?filter=${JSON.stringify(filter)}`,
        {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

    const data = await response.json();
    return data;
}

export async function getAnswiseCountReport(accessToken, filter) {
    const response = await fetch(`${process.env.API_SERVER_URL}/dippingReport/answiseReport?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await response.json();
    return data;
}

export async function getCliwiseCountReport(accessToken, filter) {

    const response = await fetch(`${process.env.API_SERVER_URL}/dippingReport/cliwiseReport?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await response.json();
    // console.log(data);
    return data;
}

export async function getCliSummaryReport(accessToken, filter) {
    const response = await fetch(`${process.env.API_SERVER_URL}/summaryReport/cliSummaryReport?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await response.json();
    return data;
}