"use client"
import {useRef, useEffect} from 'react'
import { Chart } from 'chart.js/auto'

const BarChart = ({performance}) => {
    const chartRef = useRef(null);
    useEffect(()=>{
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy();
            }
        }

        const context = chartRef.current.getContext("2d");

        const newChart = new Chart(context, {
            type:"bar",
            data:{
                labels:['1','2','3','4','5'],
                datasets:[{
                    label:"Scores",
                    data:performance.lastFourResults,
                    backgroundColor:[
                        "rgb(255,99,132,0.8)",
                        "rgb(255,159,64,0.8)",
                        "rgb(255,205,86,0.8)",
                        "rgb(75,192,192,0.8)",
                        "rgb(255,62,10,0.8)"
                    ],
                }]
            },
            options:{
                responsive:true,
                scales:{
                    x:{
                        type:"category"
                    },
                    y:{
                        beginAtZero:true
                    }
                }
            }
        });
        chartRef.current.chart = newChart;
    },[])
  return (
    <div className='md:w-full'>
        <canvas ref={chartRef}/>
    </div>
  )
}

export default BarChart