"use client"

import React, { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { doCredentialLogin } from '../../serverActions/authActions'

const LoginForm = () => {

    const router = useRouter()

    const [loginError, setLoginError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setLoginError(null)

        try {
            const formData = new FormData(e.currentTarget)

            const response = await doCredentialLogin(formData);
            console.log("credential login response: ", response);

            if (!!response?.error) {
                setLoginError(response?.error?.message)
            }
            else {
                router.push('/')
                // redirect('/')
            }
        } catch (error) {
            console.log(error);
            setLoginError("Wrong Credentials")
            // throw new Error(error.message)
        }
        setLoading(false)
    }

    return (
        <>
            <form onSubmit={handleLogin} className='flex flex-col items-start gap-y-2 w-fit mx-auto my-4 border border-gray-300 bg-gray-200 shadow-xl p-4 rounded'>
                <div className='w-full'>
                    {loginError && <p className='text-white bg-red-500 text-center'>{loginError}</p>}
                </div>
                <div className='flex gap-x-2 justify-between w-full'>
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' id='email' placeholder='Email' className='border border-gray-500 rounded mx-2' />
                </div>
                <div className='flex gap-x-2 justify-between w-full'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' placeholder='Password' className='border border-gray-500 rounded mx-2' />
                </div>
                <button type='submit' className='bg-blue-500 text-white p-1 rounded'>
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
        </>
    )
}

export default LoginForm