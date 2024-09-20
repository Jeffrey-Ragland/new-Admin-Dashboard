import React,{useState,useMemo} from 'react'
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales,
  Zoom
} from "chart.js";

import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);


const Ascan = () => {

  const lineData ={
    labels:[1,3,4,5,6,7,8,9,10],
    datasets:[
      {
        data:[3,24,5,6,2,3,55],
        backgroundColor:'transparent',
        borderColor:'#08B8FF',
        pointBorderColor:'transparent',
      }
    ]
  }




  const lineOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: {
            size: 8,
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          enabled: true,
          mode: "x",
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
          font: {
            size: 6,
          },
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            size: 6,
          },
        },
      },
    },
  }),[]);


  return (
    <div className='bg-white h-screen '>
        <div className='h-[20%]'>
cols1
        </div>
        <div  className='h-[80%] flex w-[100%] '>
            <div className='w-[20%]'>
                cols1
            </div>
            <div className='w-[80%] border'>
              <Line data={lineData} options={lineOptions} width={"100%"} />
            </div>
        </div>
    </div>
  )
}

export default Ascan
