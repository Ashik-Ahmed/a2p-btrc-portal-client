"use client";

import React from 'react'

const ErrorPage = ({ error, reset }) => {
    return (
        <div className='flex flex-col gap-4 justify-center items-center w-full h-[90vh]'>
            <h1 className='text-3xl'>An Error Occurred</h1>
            <i className="pi pi-exclamation-triangle text-9xl text-red"></i>
            <button type="button" onClick={() => reset()} className='flex justify-between items-center gap-x-2 bg-blue-500 p-2 rounded-md text-white'>
                <i className="pi pi-refresh"></i>
                <span>Reset Error</span>
            </button>
        </div>
    )
}

export default ErrorPage