"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

const Dashboard = () => {

    const { data: session, status } = useSession();

    console.log("session from client paege: ", session, status);

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p>You are not logged in</p>
    }

    return (
        <>
            <div>This is a Client Page</div>
            <p>{session?.user?.email}</p>
        </>
    )
}

export default Dashboard