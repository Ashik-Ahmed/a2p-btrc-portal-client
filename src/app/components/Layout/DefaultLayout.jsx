import { auth } from '@/auth'
import React from 'react'
import Layout from './Layout'

const DefaultLayout = async ({ children }) => {
    const session = await auth()
    return (
        <Layout session={session?.user}>{children}</Layout>
    )
}

export default DefaultLayout