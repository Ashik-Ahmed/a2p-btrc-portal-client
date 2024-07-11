export async function getCliList(filter) {
    const response = await fetch(`http://localhost:5000/api/v1/others?filter=${JSON.stringify(filter)}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data;
}