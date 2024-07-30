"use client";

import formatNumberBD from '@/utils/numberFormat';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { getA2PSummaryReport } from '@/app/serverActions/report';
import { getAggregatorList, getAnsList, getCliList } from '@/app/serverActions/othersData';
import { Calendar } from 'primereact/calendar';
import { Controller, useForm } from 'react-hook-form';

const A2PSummaryReportData = ({ accessToken }) => {

    const { register, control, formState: { errors }, handleSubmit, reset } = useForm();

    const [reportData, setReportData] = useState();
    const [loading, setLoading] = useState(false);
    const [filterDate, setFilterDate] = useState(null);
    const [selectedAggregator, setSelectedAggregator] = useState(null);
    const [selectedOperator, setSelectedOperator] = useState(null);
    const [selectedAnsType, setSelectedAnsType] = useState(null);
    const [selectedMessageType, setSelectedMessageType] = useState(null);
    const [selectedCli, setSelectedCli] = useState(null);
    const [aggregatorList, setAggregatorList] = useState([]);
    const [ansList, setAnsList] = useState([]);
    const [cliList, setCliList] = useState([]);

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        client_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        operator: { value: null, matchMode: FilterMatchMode.CONTAINS },
        cli: { value: null, matchMode: FilterMatchMode.CONTAINS },
        billMsisdn: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const ansTypes = [{ label: "All", ansType: "" }, { label: "MNO", ansType: "MNO" }, { label: "IPTSP", ansType: "IPTSP" }]

    const messageTypes = [{ label: "All", messageType: "" }, { label: "T - Transactional", messageType: "T" }, { label: "P - Promotional", messageType: "P" }]


    const getSummaryReport = async () => {

        console.log(filterDate);
        setLoading(true);

        const filter = { start_date: filterDate[0], end_date: filterDate[1], client_id: selectedAggregator?.client_id, ans_type: selectedAnsType?.ansType, operator: selectedOperator?.operator, message_type: selectedMessageType?.messageType, cli: selectedCli?.cli }
        console.log("filter: ", filter);

        const summaryReportData = await getA2PSummaryReport(accessToken, filter)

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
    const dippingCountBodyTemplate = (rowData) => {
        return (
            <div>
                {formatNumberBD(rowData?.dipping_count)}
            </div>
        )
    }
    const getAggregatorData = async () => {
        const aggregatorList = await getAggregatorList(accessToken);

        setAggregatorList(aggregatorList?.data);
    }

    const getANSData = async () => {
        const filter = { ans_type: selectedAnsType?.ansType }
        console.log(filter);
        const ansList = await getAnsList(accessToken, filter);
        setAnsList(ansList?.data);
    }

    const getCliData = async () => {
        const filter = { client_id: selectedAggregator?.client_id, ans_type: selectedAnsType?.ansType, operator: selectedOperator?.operator }
        const cliList = await getCliList(accessToken, filter);
        setCliList(cliList?.data);
    }

    useEffect(() => {
        getAggregatorData();
    }, []);

    // useEffect(() => {
    //     getANSData();
    // }, [selectedAnsType]);

    useEffect(() => {
        getCliData();
        getANSData();
    }, [selectedAggregator, selectedAnsType, selectedOperator]);


    return (
        <div>
            <div className='px-4 py-2 my-2 bg-white rounded'>
                <h2 className='uppercase text-xl font-light text-graydark'>Filter Options</h2>
                <form onSubmit={handleSubmit(getSummaryReport)} className='mt-8'>
                    <FloatLabel className="w-full md:w-1/4 mb-2">
                        <Controller
                            name="filterDate"
                            control={control}
                            rules={{ required: "Date range is required" }}
                            render={({ field }) => (
                                <Calendar
                                    {...field}
                                    dateFormat="yy-mm-dd"
                                    value={filterDate}
                                    onChange={(e) => {
                                        setFilterDate(e.value);
                                        field.onChange(e.value);
                                    }}
                                    showButtonBar
                                    selectionMode="range"
                                    readOnlyInput
                                    hideOnRangeSelection
                                    className='border w-full p-2 text-gray-700'
                                />
                            )}
                        />
                        <label htmlFor="filterDate">Date Range</label>
                        {errors.filterDate && <span className='text-xs text-red' role="alert">{errors.filterDate.message}</span>}
                    </FloatLabel>
                    <div className='grid gap-2 md:flex md:gap-x-2 mt-6'>
                        <FloatLabel className="w-full">
                            <Dropdown inputId="client_id" size="small" value={selectedAggregator} onChange={(e) => setSelectedAggregator(e.value)} options={aggregatorList} optionLabel="client_id" showClear className="border w-full" />
                            <label htmlFor="client_id">Aggregator</label>
                        </FloatLabel>
                        <FloatLabel className="w-full">
                            <Dropdown inputId="ans_type" value={selectedAnsType} onChange={(e) => setSelectedAnsType(e.value)} options={ansTypes} optionLabel="label" showClear className="border w-full" />
                            <label htmlFor="ans_type">ANS Type</label>
                        </FloatLabel>
                        <FloatLabel className="w-full">
                            <Dropdown inputId="operator" value={selectedOperator} onChange={(e) => setSelectedOperator(e.value)} options={ansList} optionLabel="operator" showClear className="border w-full" />
                            <label htmlFor="operator">ANS Name</label>
                        </FloatLabel>
                        <FloatLabel className="w-full">
                            <Dropdown inputId="message_type" value={selectedMessageType} onChange={(e) => setSelectedMessageType(e.value)} options={messageTypes} optionLabel="label" showClear className="border w-full" />
                            <label htmlFor="message_type">Message Type</label>
                        </FloatLabel>
                        <FloatLabel className="w-full">
                            <Dropdown inputId="cli" size="small" value={selectedCli} onChange={(e) => setSelectedCli(e.value)} options={cliList} optionLabel="cli" showClear className="border w-full" />
                            <label htmlFor="cli">CLI</label>
                        </FloatLabel>
                        <button type='submit' className="bg-sky-500 text-white w-[450px] rounded"> Search </button>

                    </div>
                </form>
            </div>
            <div className='px-4 py-2 bg-white rounded shadow-md'>
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='uppercase text-xl font-light text-graydark'>A2P Summary Report</h1>
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
                    filters={filters} filterDisplay="menu" globalFilterFields={['client_id', 'operator', 'cli', 'billMsisdn']} removableSort
                    emptyMessage="No data found" loading={loading} className="custom-header report-table">
                    <Column field="client_id" header="Aggregator" />
                    <Column field="delivery_date" header="Delivery Date" />
                    <Column field="ans_type" header="ANS Type" />
                    <Column field="operator" header="ANS Name" />
                    <Column field="cli" header="CLI" />
                    <Column field="message_type" header="Message Type" />
                    {/* <Column field="rn_code" header="RN Code" /> */}
                    <Column body={smsCountBodyTemplate} header="SMS Count" sortField='sms_count' sortable />
                    <Column body={dippingCountBodyTemplate} header="Dipping Count" sortField='dipping_count' sortable />
                    <Column field="source_ip" header="Source IP" />
                    {/* <Column field="billMsisdn" header="Bill Msisdn" /> */}
                </DataTable>
            </div>
        </div>
    );
};

export default A2PSummaryReportData;