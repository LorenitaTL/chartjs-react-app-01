import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import axios from 'axios';

export const LineChart = () => {

    //DEfinir datos de la gráfica
    const [chartData, setChartData] = useState({});

    const chart = () => {
        let empSal = [];
        let empAge = [];
        axios.get("http://dummy.restapiexample.com/api/v1/employees")
            .then(res => {
                console.log(res);
                for (const dataObj of res.data.data) {
                    empSal.push(parseInt(dataObj.employee_salary));
                    empAge.push(parseInt(dataObj.employee_age));
                }

                setChartData({
                    labels: empAge,
                    datasets: [
                        {
                            label: 'Level of thickness',
                            data: empSal,
                            backgroundColor: [
                                'rgba(75,192,192,0.6)',
                            ],
                            borderWidth: 4
                        }
                    ]
                })
            }).catch(err => {
                console.log(err);
            });

        console.log(empSal, empAge)

    }

    //Renderizar la gráfica la primera vez que se carga la página
    useEffect(() => {
        chart()
    }, [])
    return (
        <div>
            <h1>Line Bar</h1>
            <hr />
            <div style={{ height: "500px", width: "500px" }}>
                <Line data={chartData} options={{
                    responsive: true,
                    title: { text: 'Thickness scale', display: true },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10,
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: true
                                }
                            }
                        ],
                        xAxes: {
                            gridLines: {
                                display: false
                            }
                        }
                    }
                }} />
            </div>
        </div>
    )
}
