import React from 'react'
import { auth } from '@/auth'
import DatewiseCountData from '../components/DatewiseCountData/DatewiseCountData';
const DatewiseCount = async () => {

    const { user } = await auth();
    console.log(user.accessToken);
    return (
        <div>
            <DatewiseCountData accessToken={user?.accessToken} />
        </div>
    )
}

export default DatewiseCount