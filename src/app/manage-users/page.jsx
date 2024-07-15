import React from 'react'
import ManageUsers from '../components/ManageUsers/ManageUsers';
import { auth } from '@/auth';

const ManageUsersPage = async () => {

    const getAllUser = async () => {

        const { user } = await auth();

        const res = await fetch(`${process.env.API_SERVER_URL}/user`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.accessToken}`
                }
            }

        )
        const data = await res.json();
        return data;
    }

    const users = await getAllUser()

    return (
        <ManageUsers users={users?.data} />
    )
}

export default ManageUsersPage