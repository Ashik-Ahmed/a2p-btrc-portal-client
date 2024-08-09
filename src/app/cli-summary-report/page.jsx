import { auth } from '@/auth';
import React from 'react';
import CliSummaryReportData from '../components/CliReport/CliSummaryReportData';

const CliSummaryReport = async () => {

    const { user } = await auth();

    return (
        <div>
            <h1>Cli Report</h1>
            <CliSummaryReportData user={user} />
        </div>
    );
};

export default CliSummaryReport;