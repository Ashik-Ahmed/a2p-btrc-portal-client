"use server"

import { signIn, signOut } from "../../auth";


export async function doSocialLogin(formData) {
    const action = formData.get('action')
    console.log(action);
    await signIn(action, { redirectTo: "/" })
}

export async function doLogout() {
    console.log("doLogout");
    await signOut({ redirectTo: "/auth/signin" })
}

export async function doCredentialLogin(formData) {
    try {
        const email = formData.get('email')
        const password = formData.get('password')
        const response = await signIn("credentials", { email, password, redirect: false })

        if (response.error) {
            throw new Error(response.error);
        }

        return response;

    } catch (error) {
        console.log("throwing error: ", error);
        throw new Error(error)
    }
}