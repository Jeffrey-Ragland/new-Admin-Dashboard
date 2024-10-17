import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
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
const BpclAdmin = (Tof) => {
  const navigate = useNavigate();


  const tofbutton =()=>{
    navigate('/Tof')

  }
  const ascanbutton =()=>{
      navigate('/Ascan')
  
  }

  return (
    <div className='bg-white  flex justify-center items-center h-screen'>
      <div className='flex h-[30%] gap-2 w-[40%]'>
            <div className='w-[50%] bg-[#2d2d2d] flex items-center justify-center text-white rounded-xl font-bold hover:bg-[#31bb70] hover:cursor-pointer hover:scale-110 duration-200 hover:mr-6' onClick={tofbutton}>
                TOF
            </div>
            <div className='w-[50%] bg-[#2d2d2d] flex items-center justify-center text-white rounded-xl font-bold hover:bg-[#31bb70] hover:cursor-pointer hover:scale-110 duration-200 hover:ml-6' onClick={ascanbutton}>
                ASCAN
            </div>
        </div>
    </div>
  )
}

export default BpclAdmin
