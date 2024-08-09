import { auth } from '@/auth';
import React from 'react';
import CliSummaryReportData from '../components/CliReport/CliSummaryReportData';

const CliSummaryReport = () => {

    const { user } = auth();

    return (
        <div>
            <h1>Cli Report</h1>
            <CliSummaryReportData />
        </div>
    );
};

export default CliSummaryReport;