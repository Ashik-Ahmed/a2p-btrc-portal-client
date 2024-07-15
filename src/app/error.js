"use client";

import React from 'react'
import ErrorPage from './components/Error/ErrorPage';

const Error = ({ error, reset }) => {
    return (
        <ErrorPage error={error} reset={reset} />
    )
}

export default Error