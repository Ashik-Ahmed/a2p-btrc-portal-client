"use client";

import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { Controller, useForm } from 'react-hook-form';
import { getDatewiseCountReport } from '@/app/serverActions/report';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import formatNumberBD from '@/utils/numberFormat';


const DatewiseCountData = ({ accessToken }) => {

    const { register, control, formState: { errors }, handleSubmit, reset } = useForm();

    const [filterDate, setFilterDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState([]);


    const getDatewiseCount = async (data) => {
        setLoading(true);

        const filter = { start_date: data?.filterDate[0], end_date: data?.filterDate[1] }

        const datewiseCount = await getDatewiseCountReport(accessToken, filter)

        if (datewiseCount.status === "Success") {
            setReportData(datewiseCount?.data)
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

    return (
        <div>
            <div className='px-4 py-2 my-2 bg-white rounded'>
                <h2 className='uppercase text-xl font-light text-graydark'>Filter Options</h2>
                <form onSubmit={handleSubmit(getDatewiseCount)} className='mt-8 md:flex md: items-center gap-x-2'>
                    <FloatLabel className="w-full md:w-fit mb-2 md:mb-0">
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

                    <Button type='submit' label='Search' size='small' loading={loading} className="bg-sky-500 text-white w-full md:w-fit p-2 rounded" />

                </form>

            </div>

            <div className='px-4 py-2 bg-white rounded shadow-md'>
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='uppercase text-xl font-light text-graydark'>Date-wise Count Report</h1>
                </div>

                <DataTable value={reportData} size="small" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} removableSort
                    emptyMessage="No data found" loading={loading} className="custom-header report-table">
                    <Column field="delivery_date" header="Delivery Date" />
                    <Column body={dippingCountBodyTemplate} header="Dipping Count" sortable sortField='dipping_count' />
                    <Column body={smsCountBodyTemplate} header="SMS Count" sortable sortField='sms_count' />
                </DataTable>
            </div>
        </div >
    );
};

export default DatewiseCountData;