"use client";

import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';

const DataChart = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['29-06-2024', '28-06-2024', '27-06-2024', '26-06-2024', '25-06-2024', '24-06-2024', '23-06-2024'],
            datasets: [
                {
                    label: 'Dipping Count',
                    backgroundColor: '#6366F1',
                    borderColor: '#6366F1',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'SMS Count',
                    backgroundColor: '#BCBDF9',
                    borderColor: '#BCBDF9',
                    data: [28, 48, 40, 19, 86, 27, 90]
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