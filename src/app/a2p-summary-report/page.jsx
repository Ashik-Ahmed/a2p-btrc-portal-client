import React from 'react'
import A2PSummaryReportData from '../components/A2PSummaryReportData/A2PSummaryReportData'
import { getA2PSummaryReport } from '../serverActions/report'

const A2PSummaryReport = async () => {
    const a2pSummaryReport = await getA2PSummaryReport()
    return (
        <div>
            <A2PSummaryReportData a2pSummaryReport={a2pSummaryReport?.data} />
        </div>
    )
}

export default A2PSummaryReport