"use client"

import React, { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { doCredentialLogin } from '../../serverActions/authActions'
import Image from 'next/image'
import logo from '../../../../public/images/Info-Logo.png'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

const LoginForm = () => {

    const router = useRouter()

    const [loginError, setLoginError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [passwordVisibility, setPasswordVisibility] = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setLoginError(null)

        try {
            const formData = new FormData(e.currentTarget)
            console.log("form data: ", formData);
            const response = await doCredentialLogin(formData);
            console.log("credential login response: ", response);

            if (!!response?.error) {
                setLoginError(response?.error?.message || "Something went wrong")
            }
            else {
                console.log("redirecting...");
                // router.push('/')
                router.refresh()
                // redirect('/')
                // setTimeout(() => {
                //     window.location.reload();
                // }, 800); // Small delay to ensure the navigation is complete
            }
        } catch (error) {
            console.log("Login error: ", error);
            setLoginError("Wrong Credentials")
            // throw new Error(error.message)
        }
        setLoading(false)
    }

    return (
        <>

            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-lg p-8 m-4 space-y-8 bg-white shadow-2xl shadow-primary rounded-xl">
                    <div className="flex flex-col items-center">
                        <Image src={logo} alt="Logo" width={200} height={200} />
                        <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">Welcome</h2>
                        <p className="mt-2 text-sm text-center text-gray-600">
                            Please Log in to your account
                        </p>
                    </div>
                    <form onSubmit={handleLogin} className="mt-8 space-y-6">
                        <div className='w-full'>
                            {loginError && <p className='text-white bg-red text-center'>{loginError}</p>}
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email">Email address</label>
                                <div className="p-inputgroup flex  rounded border border-bodydark focus:ring-purple-500 focus:border-purple-500">
                                    <InputText name="email" id="email" type="email" placeholder="Email address" required className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-purple-500 hover:border-purple-500 focus:outline-none custom-input" />
                                    <span size='small' className="p-inputgroup-addon bg-primary text-white"> <i className="pi pi-envelope"></i> </span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <div className="p-inputgroup flex rounded border border-bodydark focus:ring-purple-500 focus:border-purple-500">
                                    <InputText name="password" id="password" type={passwordVisibility ? 'text' : 'password'} placeholder="Password" required className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-primary focus:border-primary" />
                                    <span onClick={() => setPasswordVisibility(!passwordVisibility)} size='small' className="p-inputgroup-addon cursor-pointer bg-primary text-white">  {passwordVisibility ? <i className="pi pi-eye-slash"></i> : <i className="pi pi-eye"></i>}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-primary"
                                />
                                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">Remember me</label>
                            </div>

                            <div className="text-sm">
                                <a href="/auth/forget-password" className="font-medium text-primary">Forgot password?</a>
                            </div>
                        </div>

                        <div>
                            <Button type="submit" label="Log In" className='w-full bg-primary text-white p-2' loading={loading} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm