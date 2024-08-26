"use client"
import {useRef, useEffect} from 'react'
import { Chart } from 'chart.js/auto'

const SyllabusCoverDoughnutChart = ({performance,index}) => {
    const chartRef = useRef(null);
    useEffect(()=>{
        const totalNoOfTopics = performance.topicwisePerformance[index].topics.length;
        const percentageOfTopicsCoveredFunc = function(){
            let topicsCovered=0;
            performance.topicwisePerformance[index].topics.forEach(topic => {
                if(topic.corrects >= Math.ceil(topic.totalQuestions*0.75)) topicsCovered++;
            })
            return Math.floor((topicsCovered/totalNoOfTopics)*100);
        }
        let percentageOfTopicsCovered = percentageOfTopicsCoveredFunc()
        let yetToCover = 100 - percentageOfTopicsCovered;
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy();
            }
        }

        const context = chartRef.current.getContext("2d");

        const newChart = new Chart(context, {
            type:"doughnut",
            data:{
                labels:["Covered","Yet To Cover"],
                datasets:[{
                    label:"Percentage",
                    data:[percentageOfTopicsCovered,yetToCover],
                    backgroundColor:[
                        "rgb(255, 145, 0, 0.8)",
                        "rgb(255, 145, 0,0.3)"
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

export default SyllabusCoverDoughnutChart