import React from 'react';
import CliwiseCountData from '../components/DippindReports/CliwiseCountData/CliwiseCountData';
import { auth } from '@/auth';

const CLIwiseReport = async () => {

    const { user } = await auth();

    return (
        <div>
            <CliwiseCountData accessToken={user?.accessToken} />
        </div>
    );
};

export default CLIwiseReport;