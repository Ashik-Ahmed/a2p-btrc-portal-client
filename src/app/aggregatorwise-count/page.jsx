import React from 'react';
import AggregatorwiseCountData from '../components/AggregatorwiseCountData/AggregatorwiseCountData';
import { auth } from '@/auth';

const AggregatorwiseCount = async () => {
    const { user } = await auth();
    // console.log(user.accessToken);
    return (
        <div>
            <AggregatorwiseCountData accessToken={user?.accessToken} />
        </div>
    );
};

export default AggregatorwiseCount;