import React from 'react'
import Layout from './Layout'
import { auth } from '@/auth';

const DefaultLayout = async ({ children }) => {
    const session = await auth();
    // console.log("session from default layout: ", session);
    return (
        <Layout session={session}> {children}</Layout >
    )
}

export default DefaultLayout