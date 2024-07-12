import React from 'react'
import ManageUsers from '../components/ManageUsers/ManageUsers';

const ManageUsersPage = async () => {

    const getAllUser = async () => {
        const res = await fetch('http://localhost:5000/api/v1/user',
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