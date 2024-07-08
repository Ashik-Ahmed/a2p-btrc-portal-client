"use client";

import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TabMenu from './TabMenu'
import { getTopAggregators, getTopAns } from '@/app/serverActions/dashboardActions';
import formatNumberBD from '@/utils/numberFormat';
const TopClients = () => {

    const [topAggregatorLoading, setTopAggregatorLoading] = useState(false);
    const [topAnsLoading, setTopAnsLoading] = useState(false);
    const [topAggregators, setTopAggregators] = useState([]);
    const [topAns, setTopAns] = useState([]);
    const [topAggregatorInterval, setTopAggregatorInterval] = useState(1);
    const [topAnsInterval, setTopAnsInterval] = useState(1);
    // console.log("top aggregators: ", topAggregators);
    // console.log("top ans: ", topAns);
    const handleTopAggregatorInterval = (tab) => {
        setTopAggregatorInterval(tab);
    };
    const handleTopAnsInterval = (tab) => {
        setTopAnsInterval(tab);
    };

    const topAggregatorsData = async () => {
        setTopAggregatorLoading(true);
        const topAggregators = await getTopAggregators(topAggregatorInterval);
        setTopAggregators(topAggregators);
        setTopAggregatorLoading(false);
    }

    const topAnsData = async () => {
        setTopAnsLoading(true);
        const topAns = await getTopAns(topAnsInterval);
        setTopAns(topAns);
        setTopAnsLoading(false);
    }

    useEffect(() => {
        topAggregatorsData();
    }, [topAggregatorInterval]);

    useEffect(() => {
        topAnsData();
    }, [topAnsInterval]);


    const aggregatorDippingBodyTemplate = (rowData) => {
        return (
            <div>
                <p>{formatNumberBD(rowData.total_dippingcount)}</p>
            </div>
        );
    }

    const aggregatorSmsBodyTemplate = (rowData) => {
        return (
            <div>
                <p>{formatNumberBD(rowData.total_smscount)}</p>
            </div>
        );
    }

    const ansDippingBodyTemplate = (rowData) => {
        return (
            <div>
                <p>{formatNumberBD(rowData.total_dippingcount)}</p>
            </div>
        );
    }

    const ansSmsBodyTemplate = (rowData) => {
        return (
            <div>
                <p>{formatNumberBD(rowData.total_smscount)}</p>
            </div>
        );
    }

    return (
        <div className='lg:flex gap-4 '>
            <div className='w-full lg:w-1/2 border border-stroke shadow-md rounded-md p-2 bg-white'>
                <div className='flex justify-between items-center my-2'>
                    <div className='flex items-baseline gap-x-1'>
                        <p className='uppercase text-graydark text-light'>Top Aggregator</p>
                        <span className='text-xs italic'>(Based on sms)</span>
                    </div>
                    <div>
                        <TabMenu onTabChange={handleTopAggregatorInterval} />
                    </div>
                </div>
                <DataTable value={topAggregators} size="small" className="custom-header" emptyMessage="No data found" loading={topAggregatorLoading}>
                    <Column field="clientid" header="Aggregator"></Column>
                    <Column body={aggregatorDippingBodyTemplate} header="Dipping Count"></Column>
                    <Column body={aggregatorSmsBodyTemplate} header="SMS Count"></Column>
                </DataTable>
            </div>
            <div className='w-full lg:w-1/2 border border-stroke shadow-md rounded-md p-2 bg-white mt-4 lg:mt-0'>
                <div className='flex justify-between items-center my-2'>
                    <div className='flex items-baseline gap-x-1'>
                        <p className='uppercase text-graydark text-light'>Top ANS</p>
                        <span className='text-xs italic'>(Based on sms)</span>
                    </div>
                    <div>
                        <TabMenu onTabChange={handleTopAnsInterval} />
                    </div>
                </div>
                <DataTable value={topAns} size="small" className="custom-header" emptyMessage="No data found" loading={topAnsLoading}>
                    <Column field="ansname" header="ANS"></Column>
                    <Column body={ansDippingBodyTemplate} header="Dipping Count"></Column>
                    <Column body={ansSmsBodyTemplate} header="SMS Count"></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default TopClients