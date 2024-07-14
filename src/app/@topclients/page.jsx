import React from 'react'
import TopClients from '../components/TopClients/TopClients'

const TopClientsData = async () => {

    // const topAggregatorsData = await fetch('process.env.API_SERVER_URL/dashboard/topAggregator?interval=7', {
    //     cache: 'no-store'
    // })
    // const topAggregators = await topAggregatorsData.json()

    // const topAnsData = await fetch('process.env.API_SERVER_URL/dashboard/topANS?interval=7', {
    //     cache: 'no-store'
    // })
    // const topAns = await topAnsData.json()

    return (
        <TopClients />
    )
}

export default TopClientsData