"use client";

import { getCliList } from '@/app/serverActions/othersData';
import { getCliwiseCountReport } from '@/app/serverActions/report';
import formatNumberBD from '@/utils/numberFormat';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const CliwiseCountData = ({ accessToken }) => {

    const { register, control, formState: { errors }, handleSubmit, reset } = useForm();

    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState();
    const [filterDate, setFilterDate] = useState(null);
    const [cliList, setCliList] = useState([]);
    const [selectedCli, setSelectedCli] = useState(null);

    const getCliwiseCount = async (data) => {
        setReportData([]);
        setLoading(true);

        const filter = { cli: selectedCli?.cli, start_date: data?.filterDate[0], end_date: data?.filterDate[1] }

        const cliwiseCount = await getCliwiseCountReport(accessToken, filter)

        if (cliwiseCount.status === "Success") {
            setReportData(cliwiseCount?.data)
        }
        setLoading(false);
    }

    const getCliListData = async () => {
        const filter = {}
        const cliList = await getCliList(accessToken, filter);

        if (cliList.status === "Success") {
            setCliList(cliList?.data);
        }
    }

    useEffect(() => {
        getCliListData();
    }, []);


    const dippingCountBodyTemplate = (rowData) => {
        return (
            <span>{formatNumberBD(rowData?.dipping_count)}</span>
        );
    }

    const smsCountBodyTemplate = (rowData) => {
        return (
            <span>{formatNumberBD(rowData?.sms_count)}</span>
        );
    }

    return (
        <div>
            <div className=' px-4 py-2 my-2 bg-white rounded'>
                <h2 className='uppercase text-xl font-light text-graydark'>Filter Options</h2>
                <form onSubmit={handleSubmit(getCliwiseCount)} className='mt-8 md:flex md:items-center md:gap-x-2'>

                    <FloatLabel className="w-full md:w-fit md:min-w-56 mb-2 md:mb-0">
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
                    {/* <div className='grid gap-2 md:flex md:gap-x-2 mt-6'> */}
                    <FloatLabel className="w-full md:w-56">
                        <Dropdown
                            {...register("cli")}
                            inputId="cli" value={selectedCli} onChange={(e) => setSelectedCli(e.value)} options={cliList} optionLabel="cli" filter showClear className="border min-w-56" />
                        <label htmlFor="cli">CLI</label>
                    </FloatLabel>
                    <Button type='submit' label='Search' size='small' loading={loading} className="bg-sky-500 text-white w-full md:w-fit p-2 rounded" />

                    {/* </div> */}
                </form>
            </div>
            <div className='px-4 py-2 bg-white rounded shadow-md'>
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='uppercase text-xl font-light text-graydark'>CLI-wise Count</h1>
                    {/* <div className="relative">
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
                    </div> */}
                </div>

                <DataTable value={reportData} size="small" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
                    removableSort emptyMessage="No data found" loading={loading} className="custom-header report-table">
                    <Column field="delivery_date" header="Delivery Date" />
                    <Column field="cli" header="CLI" />
                    <Column field="client_id" header="Aggregator" />
                    <Column field="operator" header="ANS Name" />
                    <Column body={smsCountBodyTemplate} header="SMS Count" sortable sortField='sms_count' />
                    <Column body={dippingCountBodyTemplate} header="Dipping Count" sortable sortField='dipping_count' />
                </DataTable>
            </div>
        </div>
    );
};

export default CliwiseCountData;