"use client";

import formatNumberBD from '@/utils/numberFormat';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';

const A2PSummaryReportData = ({ a2pSummaryReport }) => {

    const [reportData, setReportData] = useState(a2pSummaryReport);
    const [loading, setLoading] = useState(false);

    const smsCountBodyTemplate = (rowData) => {
        return (
            <div>
                {formatNumberBD(rowData?.sms_count)}
            </div>
        );
    }


    return (
        <div>
            <h1>A2P Summary Report</h1>

            <DataTable value={reportData} size="small" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                emptyMessage="No data found" loading={loading} className="custom-header report-table">
                <Column field="client_id" header="Aggregator" />
                <Column field="delivery_date" header="Delivered" />
                <Column field="ans_type" header="ANS Type" />
                <Column field="operator" header="ANS Name" />
                <Column field="cli" header="CLI" />
                <Column field="message_type" header="Content Type" />
                <Column field="rn_code" header="RN Code" />
                <Column body={smsCountBodyTemplate} header="SMS Count" />
                <Column field="dipping_count" header="Dipping Count" />
                {/* <Column field="source_ip" header="Source IP" /> */}
                <Column field="billMsisdn" header="Bill Msisdn" />
            </DataTable>
        </div>
    );
};

export default A2PSummaryReportData;