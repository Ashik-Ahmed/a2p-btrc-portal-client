"use server"

export async function getCliList(filter) {
    const response = await fetch(`${process.env.API_SERVER_URL}/others?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data;
}