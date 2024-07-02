import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Signin = async () => {
    const session = await auth();
    return (
        <>
            {
                // session?.user ? redirect('/') : <LoginForm />
                <LoginForm />
            }
        </>
    )
}

export default Signin