import React from 'react';
import AnswiseCountData from '../components/DippindReports/AnswiseCountData/AnswiseCountData';
import { auth } from '@/auth';

const AnsWiseReport = async () => {

    const { user } = await auth();

    return (
        <div>
            <AnswiseCountData accessToken={user?.accessToken} />
        </div>
    );
};

export default AnsWiseReport;