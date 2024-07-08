"use client";

import React from 'react'

const ErrorPage = ({ error, reset }) => {
    return (
        <div>
            <h1>Error: {error.message}</h1>
            <button onClick={() => reset()} className='bg-secondary p-2 rounded-md text-white'>Reset error boundary</button>
        </div>
    )
}

export default ErrorPage