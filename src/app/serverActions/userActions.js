"use server"

export async function updatePassword(user_id, accessToken, passwords) {
    const response = await fetch(`${process.env.API_SERVER_URL}/user/updatePassword/${user_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(passwords)
    })
    const data = await response.json()
    return data
}