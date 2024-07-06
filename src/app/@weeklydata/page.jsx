import React from 'react'
import DataChart from '../components/DataChart/DataChart'

const WeeklyData = async () => {

    const data = await fetch('http://localhost:5000/api/v1/dashboard/weeklyData?interval=', {
        cache: 'no-store'
    })
    const weeklyData = await data.json()
    console.log("data: ", weeklyData?.data)

    return (
        <>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-4 2xl:gap-6 mt-2">
                <div className=" rounded border border-stroke bg-white px-7.5 py-6  group hover:bg-primary hover:text-white hover:scale-105 duration-150">
                    <div className="flex justify-between mb-3">
                        <div>
                            <span className="block text-500 text-graydark group-hover:text-white font-medium mb-3">Dipping Yesterday</span>
                            <div className="text-900 font-medium text-xl">{weeklyData?.data[1]?.total_dipping}</div>
                        </div>
                        <div className="flex items-center justify-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">+13% </span>
                    <span className="text-500">since previous day</span>
                </div>
                <div className=" rounded border border-stroke bg-white px-7.5 py-6  group hover:bg-primary hover:text-white hover:scale-105 duration-150">
                    <div className="flex justify-between mb-3">
                        <div>
                            <span className="block text-500 text-graydark group-hover:text-white font-medium mb-3">SMS Yesterday</span>
                            <div className="text-900 font-medium text-xl">{weeklyData?.data[1]?.total_sms}</div>
                        </div>
                        <div className="flex items-center justify-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-map-marker text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">+17% </span>
                    <span className="text-500">since previous day</span>
                </div>
                <div className=" rounded border border-stroke bg-white px-7.5 py-6  group hover:bg-primary hover:text-white hover:scale-105 duration-150">
                    <div className="flex justify-between mb-3">
                        <div>
                            <span className="block text-500 text-graydark group-hover:text-white font-medium mb-3">Dipping Today</span>
                            <div className="text-900 font-medium text-xl">{weeklyData?.data[0]?.total_dipping}</div>
                        </div>
                        <div className="flex items-center justify-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-inbox text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-red font-medium">-8% </span>
                    <span className="text-500">than yesterday</span>
                </div>
                <div className=" rounded border border-stroke bg-white px-7.5 py-6  group hover:bg-primary hover:text-white hover:scale-105 duration-150">
                    <div className="flex justify-between mb-3">
                        <div>
                            <span className="block text-500 text-graydark group-hover:text-white font-medium mb-3">SMS Today</span>
                            <div className="text-900 font-medium text-xl">{weeklyData?.data[0]?.total_sms}</div>
                        </div>
                        <div className="flex items-center justify-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-comment text-purple-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-red font-medium">-11% </span>
                    <span className="text-500">than yesterday</span>
                </div>
            </div>

            <div className='border border-stroke shadow-md bg-white my-4 p-2 rounded'>
                <DataChart weeklyData={weeklyData?.data} />
            </div>
        </>
    )
}

export default WeeklyData