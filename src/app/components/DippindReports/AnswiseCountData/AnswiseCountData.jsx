"use client";

import { getAnsList } from '@/app/serverActions/othersData';
import { getAnswiseCountReport } from '@/app/serverActions/report';
import formatNumberBD from '@/utils/numberFormat';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const AnswiseCountData = ({ accessToken }) => {

    const { register, control, formState: { errors }, handleSubmit, reset } = useForm();

    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState();
    const [filterDate, setFilterDate] = useState(null);
    const [selectedAnsType, setSelectedAnsType] = useState(null);
    const [selectedOperator, setSelectedOperator] = useState(null);
    const [ansList, setAnsList] = useState([]);

    const ansTypes = [{ label: "MNO", ansType: "MNO" }, { label: "IPTSP", ansType: "IPTSP" }]


    const getANSData = async () => {
        const ansList = await getAnsList(accessToken);
        setAnsList(ansList?.data);
    }

    const getAnswiseCount = async (data) => {
        setReportData([]);
        setLoading(true);
        console.log(selectedAnsType, selectedOperator);
        const filter = { ans_type: selectedAnsType?.label, operator: selectedOperator?.operator, start_date: data?.filterDate[0], end_date: data?.filterDate[1] }
        console.log(filter);
        const answiseCount = await getAnswiseCountReport(accessToken, filter)

        if (answiseCount.status === "Success") {
            setReportData(answiseCount?.data)
        }
        setLoading(false);
    }

    useEffect(() => {
        getANSData();
    }, []);

    const smsCountBodyTemplate = (rowData) => {
        return (
            <span>{formatNumberBD(rowData?.sms_count)}</span>
        );
    }

    const dippingCountBodyTemplate = (rowData) => {
        return (
            <span>{formatNumberBD(rowData?.dipping_count)}</span>
        );
    }

    return (
        <div>
            <div className='px-4 py-2 my-2 bg-white rounded'>
                <h2 className='uppercase text-xl font-light text-graydark'>Filter Options</h2>
                <form onSubmit={handleSubmit(getAnswiseCount)} className='mt-8 md:flex md:items-center gap-x-2'>
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
                    <FloatLabel className="w-full md:w-56">
                        <Dropdown
                            {...register("ans_type")}
                            inputId="ans_type" size="small" value={selectedAnsType} onChange={(e) => setSelectedAnsType(e.value)} options={ansTypes} optionLabel="label" showClear className="border min-w-56" />
                        <label htmlFor="ans_type">ANS Type</label>
                    </FloatLabel>
                    <FloatLabel className="w-full md:w-56">
                        <Dropdown
                            {...register("operator")}
                            inputId="operator" size="small" value={selectedOperator} onChange={(e) => setSelectedOperator(e.value)} options={ansList} optionLabel="operator" showClear className="border min-w-56" />
                        <label htmlFor="operator">ANS Name</label>
                    </FloatLabel>

                    <Button type='submit' label='Search' size='small' loading={loading} className="bg-sky-500 text-white w-full md:w-fit p-2 rounded" />

                </form>
            </div>

            <div className='px-4 py-2 bg-white rounded shadow-md'>
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='uppercase text-xl font-light text-graydark'>ANS-wise Count</h1>
                </div>

                <DataTable value={reportData} size="small" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} removableSort
                    emptyMessage="No data found" loading={loading} className="custom-header report-table">
                    <Column field="delivery_date" header="Delivery Date" />
                    <Column field="ans_type" header="Type" sortable />
                    <Column field="operator" header="Operator" sortable />
                    <Column body={smsCountBodyTemplate} header="SMS Count" sortable />
                    <Column body={dippingCountBodyTemplate} header="Dipping Count" sortable />
                </DataTable>
            </div>
        </div >
    );
};

export default AnswiseCountData;