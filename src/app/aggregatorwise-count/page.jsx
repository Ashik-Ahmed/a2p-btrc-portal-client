import React from 'react';
import { auth } from '@/auth';
import AggregatorwiseCountData from '../components/DippindReports/AggregatorwiseCountData/AggregatorwiseCountData';

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