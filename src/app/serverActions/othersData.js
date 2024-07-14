"use server"

export async function getAggregatorList() {
    const response = await fetch(`${process.env.API_SERVER_URL}/others/aggregatorList`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data;
}

export async function getCliList(filter) {
    const response = await fetch(`${process.env.API_SERVER_URL}/others/cliList?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data;
}