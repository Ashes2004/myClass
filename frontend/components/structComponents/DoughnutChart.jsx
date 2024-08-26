"use client"
import {useRef, useEffect} from 'react'
import { Chart } from 'chart.js/auto'

const DoughnutChart = ({performance,index}) => {
    const chartRef = useRef(null);
    useEffect(()=>{
        const notAttempted = performance.subjectwisePerformance[index].notAttempted;
        const corrects = performance.subjectwisePerformance[index].corrects;
        const wrongs = (100-notAttempted-corrects);

        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy();
            }
        }

        const context = chartRef.current.getContext("2d");

        const newChart = new Chart(context, {
            type:"doughnut",
            data:{
                labels:['Correct','Wrong','Not attempted'],
                datasets:[{
                    label:"count",
                    data:[corrects,wrongs,notAttempted],
                    backgroundColor:[
                        "rgb(54,162,235)",
                        "rgb(153,102,255)",
                        "rgb(201,203,207)"
                    ],
                }]
            },
            options:{
                responsive:true,
            }
        });
        chartRef.current.chart = newChart;
    },[index])
  return (
    <div className='md:m-10'>
        <canvas ref={chartRef}/>
    </div>
  )
}

export default DoughnutChart