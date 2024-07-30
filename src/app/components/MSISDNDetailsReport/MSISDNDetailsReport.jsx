"use client";

import { getMSISDNDetailsReport } from '@/app/serverActions/report';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const MSISDNDetailsReport = ({ accessToken }) => {

    const { register, control, formState: { errors }, handleSubmit, reset } = useForm();

    const [filterDate, setFilterDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msisdnData, setMsisdnData] = useState([]);

    const getMsisdnDetailsData = async (filterData) => {
        setLoading(true);
        setMsisdnData([]);

        const msisdnDetails = await getMSISDNDetailsReport(accessToken, filterData)

        if (msisdnDetails.status === "Success") {
            setMsisdnData(msisdnDetails?.data)
        }
        setLoading(false);
    }


    return (
        <div>
            <div className='px-4 py-2 my-2 bg-white rounded'>
                <h2 className='uppercase text-xl font-light text-graydark'>Filter Options</h2>
                <form onSubmit={handleSubmit(getMsisdnDetailsData)} className='mt-8 md:flex md: items-center gap-x-2'>
                    <FloatLabel className="w-full md:w-fit md:min-w-56 mb-2 md:mb-0">
                        <Controller
                            name="filterDate"
                            control={control}
                            rules={{ required: "Date is required" }}
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
                                    readOnlyInput
                                    className='border w-full p-2 text-gray-700'
                                />
                            )}
                        />
                        <label htmlFor="filterDate">Select Date</label>
                        {errors.filterDate && <span className='text-xs text-red' role="alert">{errors?.filterDate.message}</span>}
                    </FloatLabel>
                    <FloatLabel className="w-full md:w-56">
                        <InputText
                            {...register("msisdn")}
                            inputId="client_id" size="small" className="border w-full min-w-56 p-2" />
                        <label htmlFor="client_id">MSISDN</label>
                    </FloatLabel>
                    <Button type='submit' label='Search' size='small' loading={loading} className="bg-sky-500 text-white w-full md:w-fit p-2 rounded md:ml-6 mt-2 md:mt-0" />
                </form>
            </div>

            <div className='px-4 py-2 bg-white rounded shadow-md'>
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='uppercase text-xl font-light text-graydark'>Msisdn Details Report</h1>
                </div>

                <DataTable value={msisdnData} size="small" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} removableSort
                    emptyMessage="No data found" loading={loading} className="custom-header report-table">
                    <Column field="delivery_date" header="Delivered" />
                    <Column field="client_id" header="Aggregator" />
                    <Column field="cli" header="CLI" />
                    <Column field="bill_msisdn" header="Bill MSISDN" />
                    <Column field="message_type" header="Message Type" />
                    <Column field="operator" header="ANS Name" />
                    <Column field="ans_business_code" header="ANS Code" />
                    <Column field="source_ip" header="Source IP" />
                </DataTable>
            </div>
        </div >
    );
};

export default MSISDNDetailsReport;