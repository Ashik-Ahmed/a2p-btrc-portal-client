import React from 'react'
import ManageUsers from '../components/ManageUsers/ManageUsers';

const ManageUsersPage = async () => {

    const getAllUser = async () => {
        const res = await fetch(`${process.env.API_SERVER_URL}/user`,
            {
                next: {
                    revalidate: 2
                }
            }

        )
        const data = await res.json()
        return data
    }

    const users = await getAllUser()

    return (
        <ManageUsers users={users?.data} />
    )
}

export default ManageUsersPage