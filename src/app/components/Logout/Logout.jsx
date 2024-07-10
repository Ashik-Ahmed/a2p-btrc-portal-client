import React from 'react'
import { doLogout } from '../../serverActions/authActions'
import { Button } from 'primereact/button'

const Logout = () => {
    return (
        <>
            <form action={doLogout}>
                <button type='submit' className='bg-red text-white p-2 rounded'>
                    Logout
                </button>
            </form>
            <Button severity='danger' label='Logout Primereact' icon="pi pi-power-off" className='p-button-danger' />
        </>
    )
}

export default Logout