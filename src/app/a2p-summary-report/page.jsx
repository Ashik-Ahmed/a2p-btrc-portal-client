import React from 'react'
import A2PSummaryReportData from '../components/A2PSummaryReportData/A2PSummaryReportData'
import { getA2PSummaryReport } from '../serverActions/report'
import { auth } from '@/auth'

const A2PSummaryReport = async () => {

    const { user } = await auth();

    // const a2pSummaryReport = await getA2PSummaryReport()
    return (
        <div>
            <A2PSummaryReportData accessToken={user?.accessToken} />
        </div>
    )
}

export default A2PSummaryReport