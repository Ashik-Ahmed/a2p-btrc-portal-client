import React from 'react'
import { doLogout } from '../../serverActions/authActions'

const Logout = () => {
    return (
        <form action={doLogout}>
            <button type='submit' className='bg-red text-white p-2 rounded'>
                Logout
            </button>
        </form>
    )
}

export default Logout