import { auth } from '@/auth'
import React from 'react'
import Layout from './Layout'
import { headers } from 'next/headers'

const DefaultLayout = async ({ children }) => {
    const session = await auth()

    return (
        <Layout session={session?.user}>{children}</Layout>
    )
}

export default DefaultLayout