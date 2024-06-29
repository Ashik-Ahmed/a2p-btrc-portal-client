import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const TopClients = () => {

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
                <div className='my-1'>
                    <p className='uppercase text-bodydark2 text-light'>Top Aggregator</p>
                </div>
                <DataTable value={topAggregators} size="small">
                    <Column field="clientId" header="Aggregator"></Column>
                    <Column field="dippingCount" header="Dipping Count"></Column>
                    <Column field="smsCount" header="SMS Count"></Column>
                </DataTable>
            </div>
            <div className='w-full lg:w-1/2 border border-stroke shadow-md rounded-md p-2 bg-white mt-4 md:mt-0'>
                <div className='my-1'>
                    <p className='uppercase text-bodydark2 text-light'>Top ANS</p>
                </div>
                <DataTable value={topANSs} size="small">
                    <Column field="clientId" header="ANS"></Column>
                    <Column field="dippingCount" header="Dipping Count"></Column>
                    <Column field="smsCount" header="SMS Count"></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default TopClients