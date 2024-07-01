import React, { useEffect, useRef, useState } from 'react';
import { Line } from "react-chartjs-2";
import { FaUserAlt } from "react-icons/fa";
import '../Logins/Login.css';
import { Chart as ChartJS,LineElement,CategoryScale,LinearScale,PointElement } from "chart.js";
ChartJS.register(
  LineElement,CategoryScale,LinearScale,PointElement
)


const BpclAdmin = (Tof) => {
  const plot_statuss = localStorage.getItem('Plot_Status')

  const [Clear,setClear]=useState(plot_statuss)
  
  const tof_data =Tof.Tof
  const number_array = tof_data?.length ?? 0;


  const numbersArray = Array.from({ length: number_array }, (_, index) => index + 1);
  const data={
    labels:numbersArray,
    datasets:[
      {
        data:tof_data,
        backgroundColor:'transparent',
        borderColor:'#08B8FF',
        pointBorderColor:'transparent',
      }
    ]
  }
  const options={

  }



  const Clear_Button=async()=>{

  try{
    if (localStorage.getItem("Plot_Status") !== null) {
      console.log("yes");
    } else {
      localStorage.setItem('Plot_Status','Clear')
    }
    
    const plot_variable = localStorage.getItem('Plot_Status')
    if (plot_variable === 'Clear'){
      localStorage.setItem("Plot_Status",'Plot')
      setClear('Plot')
      const response = await fetch('http://43.204.133.45:4000/sensor/BPCL_ASCAN_CLEAR',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({data})
        });
        const status = await response.json();
    }
    if(plot_variable === 'Plot'){
       localStorage.setItem("Plot_Status",'Clear')
       setClear('Clear')
    } 
    

  }catch(error){
    console.error(error)
  }
}

  return (
    <div className=''>
      <div className='bg-white border h-[30vh] m-2 rounded-sm'>
        <div className='flex mt-2 gap-4'>
          <div className='flex'>
            <p>Pulsewidth :</p>
            <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
          </div>
          <div className='flex'>
            <p>Amplitude :</p>
            <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
          </div>
          <div className='flex'>
            <p>Gain :</p>
            <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
          </div>
        </div>
        <div className='flex mt-4 gap-4'>
          <div className='flex'>
            <p>Thershold :</p>
            <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
          </div>
          <div className='flex'>
            <p>Averaging :</p>
            <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
          </div>
        </div>
          <div className='flex gap-6 mt-4 overflow-x-auto scrollbar-hide'>
            <div className='border flex flex-col items-center'>
              <h2 className='border-b pb-0  border-blue-500 font-bold'>Peak-1</h2>
              <div className='flex mt-2 p-2 gap-2'>
                <div className='flex'>
                  <p>Start:</p>
                  <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
                <div className='flex'>
                  <p>Stop:</p>
                  <input className=' bg-gray-50 border w-[10vh] border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
              </div>
            </div>
            <div className='border flex flex-col items-center'>
              <h2 className='border-b pb-0  border-blue-500 font-bold'>Peak-2</h2>
              <div className='flex mt-2 p-2 gap-2'>
                <div className='flex'>
                  <p>Start:</p>
                  <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
                <div className='flex'>
                  <p>Stop:</p>
                  <input className=' bg-gray-50 border w-[10vh] border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
              </div>
            </div>
            <div className='border flex flex-col items-center'>
              <h2 className='border-b pb-0  border-blue-500 font-bold'>Peak-3</h2>
              <div className='flex mt-2 p-2 gap-2'>
                <div className='flex'>
                  <p>Start:</p>
                  <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
                <div className='flex'>
                  <p>Stop:</p>
                  <input className=' bg-gray-50 border w-[10vh] border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
              </div>
            </div>
            <div className='border flex flex-col items-center'>
              <h2 className='border-b pb-0  border-blue-500 font-bold'>Peak-4</h2>
              <div className='flex mt-2 p-2 gap-2'>
                <div className='flex'>
                  <p>Start:</p>
                  <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
                <div className='flex'>
                  <p>Stop:</p>
                  <input className=' bg-gray-50 border w-[10vh] border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
              </div>
            </div>
            <div className='border flex flex-col items-center'>
              <h2 className='border-b pb-0  border-blue-500 font-bold'>Peak-5</h2>
              <div className='flex mt-2 p-2 gap-2'>
                <div className='flex'>
                  <p>Start:</p>
                  <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
                <div className='flex'>
                  <p>Stop:</p>
                  <input className=' bg-gray-50 border w-[10vh] border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
              </div>
            </div>
            <div className='border flex flex-col items-center'>
              <h2 className='border-b pb-0 border-blue-500  font-bold'>Peak-6</h2>
              <div className='flex mt-2 p-2 gap-2'>
                <div className='flex'>
                  <p>Start:</p>
                  <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
                <div className='flex'>
                  <p>Stop:</p>
                  <input className=' bg-gray-50 border w-[10vh] border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
              </div>
            </div>
            <div className='border flex flex-col items-center'>
              <h2 className='border-b pb-0  border-blue-500 font-bold'>Peak-7</h2>
              <div className='flex mt-2 p-2 gap-2'>
                <div className='flex'>
                  <p>Start:</p>
                  <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
                <div className='flex'>
                  <p>Stop:</p>
                  <input className=' bg-gray-50 border w-[10vh] border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
              </div>
            </div>
            <div className='border flex flex-col items-center'>
              <h2 className='border-b pb-0  border-blue-500 font-bold'>Peak-8</h2>
              <div className='flex mt-2 p-2 gap-2'>
                <div className='flex'>
                  <p>Start:</p>
                  <input className=' bg-gray-50 w-[10vh] border border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
                <div className='flex'>
                  <p>Stop:</p>
                  <input className=' bg-gray-50 border w-[10vh] border-gray-300 text-gray-900 ml-2 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block ps-1  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'></input>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className='flex justify-end mr-2'>
        <span className=' mr-2'>Total Data:  <span className='font-bold text-green-800'>{number_array}</span> </span>
        <button className= {`border  ${Clear === 'Clear' ? 'bg-[#ff7d7d]' :'bg-[#42f386]'} hover:scale-110 font-bold w-[10vh]`} onClick={Clear_Button}>{plot_statuss}</button>
      </div>
      <div className=''>
        <div className='w-[200vh]'>
          <Line className="ml-10 w-full" data={data} options={options}></Line>
        </div>
      </div>
    </div>
  )
}

export default BpclAdmin
