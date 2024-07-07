"use client";

import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';

const DataChart = ({ weeklyData }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    // console.log("weekly data: ", weeklyData);
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: weeklyData?.map((item) => item?.date),
            datasets: [
                {
                    label: 'Dipping Count',
                    backgroundColor: '#3B4FE1',
                    borderColor: '#3B4FE1',
                    data: weeklyData?.map((item) => item?.total_dipping)
                },
                {
                    label: 'SMS Count',
                    backgroundColor: '#BCBDF9',
                    borderColor: '#BCBDF9',
                    data: weeklyData?.map((item) => item?.total_sms)
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);
    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}

export default DataChart