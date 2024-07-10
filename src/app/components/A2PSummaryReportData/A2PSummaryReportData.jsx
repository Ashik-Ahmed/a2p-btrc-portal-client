"use client";

import formatNumberBD from '@/utils/numberFormat';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { getA2PSummaryReport } from '@/app/serverActions/report';

const A2PSummaryReportData = ({ a2pSummaryReport }) => {

    const [reportData, setReportData] = useState(a2pSummaryReport);
    const [loading, setLoading] = useState(false);
    const [selectedAggregator, setSelectedAggregator] = useState(null);
    const [selectedOperator, setSelectedOperator] = useState(null);

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        client_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        operator: { value: null, matchMode: FilterMatchMode.CONTAINS },
        cli: { value: null, matchMode: FilterMatchMode.CONTAINS },
        billMsisdn: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });


    const aggregators = [
        { label: "All", client_id: "" },
        { label: "SSL", client_id: "SSL" },
        { label: "Dotlines", client_id: "Dotlines" },
        { label: "ADN_Diginet", client_id: "ADN_Diginet" },
        { label: "Route_Mobile", client_id: "Route_Mobile" },
        { label: "Doer_Services", client_id: "Doer_Services" },
        { label: "REVE", client_id: "REVE" },
        { label: "Infobip", client_id: "Infobip" },
        { label: "RT_Communications", client_id: "RT_Communications" },
        { label: "Wintel", client_id: "Wintel" },
        { label: "Elitbuzz", client_id: "Elitbuzz" },
        { label: "PeakPrima", client_id: "PeakPrima" }
    ]

    const operators = [
        { label: "All", operator: "" },
        { label: "GrameenPhone", operator: "GrameenPhone" },
        { label: "Robi", operator: "Robi" },
        { label: "Banglalink", operator: "Banglalink" },
        { label: "Teletalk", operator: "Teletalk" },
        { label: "RanksITT", operator: "RanksITT" },
        { label: "Mirnet", operator: "Mirnet" },
        { label: "FusionNet", operator: "FusionNet" },
        { label: "ADN", operator: "ADN" }
    ]

    const getSummaryReport = async () => {

        setLoading(true);

        const filter = { client_id: selectedAggregator?.client_id, operator: selectedOperator?.operator }
        console.log("filter: ", filter);

        const summaryReportData = await getA2PSummaryReport(filter)

        setReportData(summaryReportData?.data)
        setLoading(false);
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const smsCountBodyTemplate = (rowData) => {
        return (
            <div>
                {formatNumberBD(rowData?.sms_count)}
            </div>
        );
    }


    return (
        <div>
            <div className='flex gap-x-2 px-4 py-2 my-2 bg-white'>
                <FloatLabel className="w-1/2">
                    <Dropdown inputId="client_id" value={selectedAggregator} onChange={(e) => setSelectedAggregator(e.value)} options={aggregators} optionLabel="label" className="border w-1/2" />
                    <label htmlFor="client_id">Select Aggregator</label>
                </FloatLabel>
                <FloatLabel className="w-1/2">
                    <Dropdown inputId="operator" value={selectedOperator} onChange={(e) => setSelectedOperator(e.value)} options={operators} optionLabel="label" className="border w-1/2" />
                    <label htmlFor="operator">Select Operator</label>
                </FloatLabel>
                <Button onClick={getSummaryReport} type="submit" className="bg-sky-500 text-white p-2">Submit</Button>
            </div>
            <div className='px-4 py-2 bg-white rounded shadow-md'>
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='text-xl font-bold text-graydark'>A2P Summary Report</h1>
                    <div className="relative">
                        <input
                            onChange={onGlobalFilterChange}
                            type="text"
                            placeholder="Search..."
                            className="w-full rounded border border-stroke bg-transparent py-1.5 pl-8 pr-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />

                        <span className="absolute left-1 top-1.5">
                            <svg
                                className="fill-[#a1a1a1]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 22 22"
                                width={"22"}
                                height={"22"}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 4a7 7 0 00-7 7 7 7 0 0011.31 5.31l4.58 4.59 1.42-1.42-4.58-4.59A7 7 0 0011 4zm0 2a5 5 0 110 10 5 5 0 010-10z"
                                />
                            </svg>
                        </span>
                    </div>
                </div>

                <DataTable value={reportData} size="small" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
                    filters={filters} filterDisplay="menu" globalFilterFields={['client_id', 'operator', 'cli', 'billMsisdn']}
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
        </div>
    );
};

export default A2PSummaryReportData;