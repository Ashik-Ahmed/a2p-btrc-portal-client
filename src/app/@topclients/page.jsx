import React from 'react'
import TopClients from '../components/TopClients/TopClients'

const TopClientsData = async () => {

    // const topAggregatorsData = await fetch('http://localhost:5000/api/v1/dashboard/topAggregator?interval=7', {
    //     cache: 'no-store'
    // })
    // const topAggregators = await topAggregatorsData.json()

    // const topAnsData = await fetch('http://localhost:5000/api/v1/dashboard/topANS?interval=7', {
    //     cache: 'no-store'
    // })
    // const topAns = await topAnsData.json()

    return (
        <TopClients />
    )
}

export default TopClientsData