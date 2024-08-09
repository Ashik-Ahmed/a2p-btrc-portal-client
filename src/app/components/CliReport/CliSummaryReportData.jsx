"use client";

import { getAggregatorList, getAnsList } from '@/app/serverActions/othersData';
import { getCliSummaryReport } from '@/app/serverActions/report';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CliSummaryReportData = ({ user }) => {

    const { register, control, formState: { errors }, handleSubmit, reset } = useForm();

    const [reportData, setReportData] = useState();

    const [selectedAggregator, setSelectedAggregator] = useState(null);
    const [selectedOperator, setSelectedOperator] = useState(null);
    const [selectedRegistrationStatus, setSelectedRegistrationStatus] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [aggregatorList, setAggregatorList] = useState([]);
    const [ansList, setAnsList] = useState([]);

    const getAggregatorData = async () => {
        const aggregatorList = await getAggregatorList(user?.accessToken);
        console.log(aggregatorList);
        setAggregatorList(aggregatorList?.data);
    }

    const getANSData = async () => {
        // const filter = { ans_type: selectedAnsType?.ansType }
        // console.log(filter);
        const ansList = await getAnsList(user?.accessToken, {});
        console.log(ansList);
        setAnsList(ansList?.data);
    }

    const getCliSummaryReportData = async () => {

        console.log(selectedAggregator, selectedOperator, selectedRegistrationStatus, selectedStatus);
        const filter = { client_id: selectedAggregator?.client_id, operator: selectedOperator?.operator, registration_status: selectedRegistrationStatus, status: selectedStatus }
        console.log(filter);

        const cliSummaryReportData = await getCliSummaryReport(user?.accessToken, filter)
        console.log(cliSummaryReportData);
        if (cliSummaryReportData?.status === "Success") {
            setReportData(cliSummaryReportData?.data);
        }
    }

    useEffect(() => {
        getAggregatorData();
        getANSData();
    }, []);


    return (
        <div>
            <div className='px-4 py-2 my-2 bg-white rounded'>
                <h2 className='uppercase text-xl font-light text-graydark'>Filter Options</h2>
                <form onSubmit={handleSubmit(getCliSummaryReportData)} className='mt-8'>
                    <div className='grid gap-2 md:flex md:gap-x-2 mt-6'>
                        <FloatLabel className="w-full">
                            <Dropdown inputId="client_id" size="small" value={selectedAggregator} onChange={(e) => setSelectedAggregator(e.value)} options={aggregatorList} optionLabel="client_id" showClear className="border w-full" />
                            <label htmlFor="client_id">Aggregator</label>
                        </FloatLabel>
                        <FloatLabel className="w-full">
                            <Dropdown inputId="operator" value={selectedOperator} onChange={(e) => setSelectedOperator(e.value)} options={ansList} optionLabel="operator" showClear className="border w-full" />
                            <label htmlFor="operator">ANS Name</label>
                        </FloatLabel>
                        <FloatLabel className="w-full">
                            <Dropdown inputId="registration_status" value={selectedRegistrationStatus} onChange={(e) => setSelectedRegistrationStatus(e.value)} options={[{ label: "Registered", value: "Registered" }, { label: "Deregistered", value: "Deregistered" }]} optionLabel="label" showClear className="border w-full" />
                            <label htmlFor="registration_status">Registration Status</label>
                        </FloatLabel>
                        <FloatLabel className="w-full">
                            <Dropdown inputId="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.value)} options={[{ label: "Active", value: "Active" }, { label: "Inactive", value: "Inactive" }]} optionLabel="label" showClear className="border w-full" />
                            <label htmlFor="status">Status</label>
                        </FloatLabel>
                        <button type='submit' className="bg-sky-500 text-white w-[450px] rounded"> Search </button>
                    </div>
                </form>
            </div>


        </div>
    );
};

export default CliSummaryReportData;