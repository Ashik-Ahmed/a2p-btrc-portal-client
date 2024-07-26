import { auth } from '@/auth';
import React from 'react';
import MSISDNDetailsReport from '../components/MSISDNDetailsReport/MSISDNDetailsReport';

const MSISDNSearch = async () => {

    const { user } = await auth();

    return (
        <div>
            <MSISDNDetailsReport accessToken={user?.accessToken} />
        </div>
    );
};

export default MSISDNSearch;