import React from 'react'
import TopClients from '../components/TopClients/TopClients'
import { auth } from '@/auth'

const TopClientsData = async () => {

    const { user } = await auth()

    return (
        <TopClients accessToken={user?.accessToken} />
    )
}

export default TopClientsData