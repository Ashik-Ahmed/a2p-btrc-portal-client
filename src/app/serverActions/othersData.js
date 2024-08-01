"use server"

export async function getAggregatorList(accessToken) {
    const response = await fetch(`${process.env.API_SERVER_URL}/others/aggregatorList`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await response.json()
    return data;
}

export async function getAnsList(accessToken, filter) {
    console.log("Calling ANS List get API", JSON.stringify(filter));
    const response = await fetch(`${process.env.API_SERVER_URL}/others/ansList?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await response.json()
    return data;
}

export async function getCliList(accessToken, filter) {
    const response = await fetch(`${process.env.API_SERVER_URL}/others/cliList?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await response.json()
    return data;
}