"use client";

import { getAggregatorList } from '@/app/serverActions/othersData';
import { getAggregatorwiseCountReport } from '@/app/serverActions/report';
import formatNumberBD from '@/utils/numberFormat';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const AggregatorwiseCountData = ({ accessToken }) => {

    const { register, control, formState: { errors }, handleSubmit, reset } = useForm();


    const [aggregatorList, setAggregatorList] = useState([]);
    const [filterDate, setFilterDate] = useState(null);
    const [selectedAggregator, setSelectedAggregator] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState([]);

    const getAggregatorwiseCount = async (data) => {
        setLoading(true);
        console.log(data);
        const filter = { start_date: data?.filterDate[0], end_date: data?.filterDate[1], client_id: selectedAggregator?.client_id }
        console.log(filter);

        const aggregatorwiseCount = await getAggregatorwiseCountReport(accessToken, filter)

        if (aggregatorwiseCount.status === "Success") {
            setReportData(aggregatorwiseCount?.data)
        }
        setLoading(false);
    }

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

    const getAggregatorData = async () => {
        const aggregatorList = await getAggregatorList(accessToken);

        setAggregatorList(aggregatorList?.data);
    }

    useEffect(() => {
        getAggregatorData();
    }, []);

    return (
        <div>
            <div className='px-4 py-2 my-2 bg-white rounded'>
                <h2 className='uppercase text-xl font-light text-graydark'>Filter Options</h2>
                <form onSubmit={handleSubmit(getAggregatorwiseCount)} className='mt-8 md:flex md: items-center gap-x-2'>
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
                                    minDate={new Date(new Date(2024, 3, 1))} // Months are 0-based in JavaScript Date
                                    maxDate={new Date()}
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
                    <FloatLabel className="w-full md:w-56">
                        <Dropdown
                            inputId="client_id" size="small" value={selectedAggregator} onChange={(e) => setSelectedAggregator(e.value)} options={aggregatorList} optionLabel="client_id" showClear className="border w-full min-w-56" />
                        <label htmlFor="client_id">Aggregator</label>
                    </FloatLabel>

                    <Button type='submit' label='Search' size='small' loading={loading} className="bg-sky-500 text-white w-full md:w-fit p-2 rounded mt-2 md:mt-0" />

                </form>
            </div>

            <div className='px-4 py-2 bg-white rounded shadow-md'>
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='uppercase text-xl font-light text-graydark'>Aggregator-wise Count</h1>
                </div>

                <DataTable value={reportData} size="small" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} removableSort
                    emptyMessage="No data found" loading={loading} className="custom-header report-table">
                    <Column field="delivery_date" header="Delivery Date" />
                    <Column field="client_id" header="Aggregator Name" sortable />
                    <Column body={dippingCountBodyTemplate} header="Dipping Count" sortable sortField='dipping_count' />
                    <Column body={smsCountBodyTemplate} header="SMS Count" sortable sortField='sms_count' />
                </DataTable>
            </div>
        </div >
    );
};

export default AggregatorwiseCountData;