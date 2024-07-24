import React from 'react'
import { auth } from '@/auth'
import DatewiseCountData from '../components/DatewiseCountData/DatewiseCountData';
const DatewiseCount = async () => {

    const { user } = await auth();

    return (
        <div>
            <DatewiseCountData accessToken={user?.accessToken} />
        </div>
    )
}

export default DatewiseCount