"use client";

import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TabMenu from './TabMenu'
const TopClients = () => {
    const [selectedTab, setSelectedTab] = useState('Day');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        // Fetch or set the data for the selected tab
    };

    const topAggregators = [
        { clientId: "Digi Byte", dippingCount: 23202344, smsCount: 234234234 },
        { clientId: "Flow SMS", dippingCount: 23202344, smsCount: 234234234 },
        { clientId: "Nexmo", dippingCount: 23202344, smsCount: 234234234 },
        { clientId: "Twilio", dippingCount: 23202344, smsCount: 234234234 },
        { clientId: "Zenvia", dippingCount: 23202344, smsCount: 234234234 },
        { clientId: "Sinch", dippingCount: 23202344, smsCount: 234234234 },
        { clientId: "Plivo", dippingCount: 23202344, smsCount: 234234234 },
    ]

    const topANSs = [
        { clientId: "Grameenphone", dippingCount: 23202344, smsCount: 234234234 },
        { clientId: "Robi", dippingCount: 23202344, smsCount: 234234234 },
        { clientId: "Banglalink", dippingCount: 23202344, smsCount: 234234234 },
        { clientId: "Teletalk", dippingCount: 23202344, smsCount: 234234234 },
        { clientId: "Ufone", dippingCount: 23202344, smsCount: 234234234 },
        { clientId: "Etisalat", dippingCount: 23202344, smsCount: 234234234 },
        { clientId: "Warid", dippingCount: 23202344, smsCount: 234234234 },
    ]

    return (
        <div className='lg:flex gap-4'>
            <div className='w-full lg:w-1/2 border border-stroke shadow-md rounded-md p-2 bg-white'>
                <div className='flex justify-between items-center my-2'>
                    <div>
                        <p className='uppercase text-graydark text-light'>Top Aggregator</p>
                    </div>
                    <div>
                        <TabMenu onTabChange={handleTabChange} />
                    </div>
                </div>
                <DataTable value={topAggregators} size="small" className="custom-header">
                    <Column field="clientId" header="Aggregator"></Column>
                    <Column field="dippingCount" header="Dipping Count"></Column>
                    <Column field="smsCount" header="SMS Count"></Column>
                </DataTable>
            </div>
            <div className='w-full lg:w-1/2 border border-stroke shadow-md rounded-md p-2 bg-white mt-4 md:mt-0'>
                <div className='flex justify-between items-center my-2'>
                    <div>
                        <p className='uppercase text-graydark text-light'>Top ANS</p>
                    </div>
                    <div>
                        <TabMenu onTabChange={handleTabChange} />
                    </div>
                </div>
                <DataTable value={topANSs} size="small" className="custom-header">
                    <Column field="clientId" header="ANS"></Column>
                    <Column field="dippingCount" header="Dipping Count"></Column>
                    <Column field="smsCount" header="SMS Count"></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default TopClients