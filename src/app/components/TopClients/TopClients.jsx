"use client";

import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TabMenu from './TabMenu'
import { getTopAggregators, getTopAns } from '@/app/serverActions/dashboardActions';
const TopClients = () => {

    const [topAggregators, setTopAggregators] = useState([]);
    const [topAns, setTopAns] = useState([]);
    const [topAggregatorInterval, setTopAggregatorInterval] = useState(1);
    const [topAnsInterval, setTopAnsInterval] = useState(1);
    console.log("top aggregators: ", topAggregators);
    console.log("top ans: ", topAns);
    const handleTopAggregatorInterval = (tab) => {
        setTopAggregatorInterval(tab);
    };
    const handleTopAnsInterval = (tab) => {
        setTopAnsInterval(tab);
    };

    const topAggregatorsData = async () => {
        const topAggregators = await getTopAggregators(topAggregatorInterval);
        setTopAggregators(topAggregators);
    }

    const topAnsData = async () => {
        const topAns = await getTopAns(topAnsInterval);
        setTopAns(topAns);
    }

    useEffect(() => {
        topAggregatorsData();
        topAnsData();
    }, [topAggregatorInterval, topAnsInterval]);

    return (
        <div className='lg:flex gap-4 '>
            <div className='w-full lg:w-1/2 border border-stroke shadow-md rounded-md p-2 bg-white'>
                <div className='flex justify-between items-center my-2'>
                    <div>
                        <p className='uppercase text-graydark text-light'>Top Aggregator</p>
                    </div>
                    <div>
                        <TabMenu onTabChange={handleTopAggregatorInterval} />
                    </div>
                </div>
                <DataTable value={topAggregators} size="small" className="custom-header" emptyMessage="No data found">
                    <Column field="clientid" header="Aggregator"></Column>
                    <Column field="total_dippingcount" header="Dipping Count"></Column>
                    <Column field="total_smscount" header="SMS Count"></Column>
                </DataTable>
            </div>
            <div className='w-full lg:w-1/2 border border-stroke shadow-md rounded-md p-2 bg-white mt-4 lg:mt-0'>
                <div className='flex justify-between items-center my-2'>
                    <div>
                        <p className='uppercase text-graydark text-light'>Top ANS</p>
                    </div>
                    <div>
                        <TabMenu onTabChange={handleTopAnsInterval} />
                    </div>
                </div>
                <DataTable value={topAns} size="small" className="custom-header" emptyMessage="No data found">
                    <Column field="ansname" header="ANS"></Column>
                    <Column field="total_dippingcount" header="Dipping Count"></Column>
                    <Column field="total_smscount" header="SMS Count"></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default TopClients