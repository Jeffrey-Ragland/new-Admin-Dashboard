import React, { useEffect,useMemo,useRef, useState } from 'react'
import { IoMdCloudDownload } from "react-icons/io";
import { Line } from 'react-chartjs-2';
import Alert from 'react-popup-alert'
import xyma_img from '../Assets/xyma - Copy.png'
import {Chart as ChartJS, LineElement ,CategoryScale,LinearScale,PointElement, scales} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';  // Import zoom plugin
import { IoSettings } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import axios from 'axios';
ChartJS.register(
  LineElement,CategoryScale,LinearScale,PointElement,zoomPlugin
);

const Ascan = () => {
const [Btn_Status,setButton]=useState()
const [ascan_data,setAscan]=useState()
const [value, setValue] = useState('None');
const [value1, setValue1] = useState(' ');
const [showPopup, setShowPopup] = useState(false);
const [projectName, setProjectName] = useState('');
const[dropdownvalue,setDropdown]=useState([]);
const [setting_Page,setSettings_Page]=useState(false);
const [showOptions,setDeleteoption]=useState(false);
const [pulsewidth ,setpulsewidth] =useState('')
const[amplitude,setAmplitude]=useState('')
const[gain,setGain]=useState('');
const[mode,setMode]=useState('');
const [average, setAverage] = useState('');
const [threshold, setThreshold] = useState('');
const [nop, setNop] = useState('');
const [start, setStart] = useState('');
const [stop, setStop] = useState('');

const auto_refresh=()=>{
  const btn_sts = localStorage.getItem('btn_sts');
  setButton(btn_sts)

}
const apifun=async()=>{
  const btn_sts = localStorage.getItem('btn_sts');
  try{
    const drp_data = await axios.get("http://localhost:4000/sensor/ASCAN_PROJECT_LIST");
    if(drp_data.data){
      const dropdown_value = (drp_data.data).data;
      setDropdown(dropdown_value[0].project)
    }
    if(parseInt(btn_sts)== 1){
      try{
        const ascan_resposne= await axios.get(`http://localhost:4000/sensor/BPCL_READ?`); 
        if(ascan_resposne.data){
          setAscan(ascan_resposne.data); 
        }
      }catch(error){
        console.log("catched error",error)
      }
    }else{
      console.log("User Did't Click a start button")
    }
  }catch(error){
    console.log("error")
  } 
}

  useEffect(()=>{
    auto_refresh();
    apifun();
    const btnstatus = setInterval(auto_refresh,2000);
    const api =setInterval(apifun,2000)
    return()=>{
        clearInterval(btnstatus);
        clearInterval(api);
    };
  },[])

 

  const StartButton=async()=>{
    localStorage.setItem('btn_sts',1)
    setButton(1)
    if(value == 'None'){
      window.alert("please select the project!")
    }else{
      const date = new Date();
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      };
      const formattedTimestamp = date.toLocaleString('en-US', options); 
      const [dd_mm_yy,time] = formattedTimestamp.split(',')
      const[dd,mm,yy]=dd_mm_yy.split('/')
      const fulldate = dd+'-'+mm+'-'+yy+','+time
        try{
          console.log("fulldate = ",fulldate)
          const ascan_resposne= await axios.get(`http://localhost:4000/sensor/BPCL_READ?fromdate=${fulldate}&project=${value}`); 
          console.log(ascan_data);
          if(ascan_resposne.data){
            console.log(ascan_resposne.data);
          }
        }catch(error){
          console.log("catched error",error)
        }
    }
  }

  const settingCancelPage=()=>{
    setSettings_Page(false);

  }
  const StopButton=()=>{
    localStorage.setItem('btn_sts',0)
    setButton(0)
    setAscan()
  }

  //filltering data points
  const threshold_limit =threshold == ''? 0 : threshold ;
  // const final_ascan_data = ascan_data ? ascan_data.data:[]
  const final_ascan_data = ascan_data ? ascan_data.success == false ? [] : ascan_data.data:[]


  const threshold_ltm = Array(final_ascan_data.length).fill(threshold_limit);

  const data={
    labels:final_ascan_data,
    datasets:[{
      label:'Ascan',
      data:final_ascan_data,
      backgroundColor:'aqua',
      borderColor:'blue',
      pointBorderColor:'aqua',
      fill:true,
      tension:0.4,
      pointRadius: 0,
    },
    {
      label: 'Threshold Line', 
      data: threshold_ltm,
      // backgroundColor: 'lightgreen',
      borderColor: 'red',
      // pointBorderColor: 'lightgreen',
      fill: true,
      pointRadius: 0,
      borderWidth: 1.25,
      tension: 0.4
    }
  ]
  }

  const options = useMemo(()=>({
    plugins:{
      legend:true,
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
      zoom: {
        pan: {
          enabled: true,
          mode: "y",
        },
        zoom: {
          enabled: true,
          mode: "y",
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
        },
      },
    },
    scales:{
      y:{
        // min:3,
        // max:6
      }
    }
  }),[])

  const handleInputChange = (event) => {
    setProjectName(event.target.value); // Update the project name as user types
  };




  //dropdown
  const handleChange=(event)=>{
    if(event.target.value == 'add_project'){
      setShowPopup(true);
    }else{
      setValue(event.target.value);
    }
  }

  const handleChange1=(event)=>{
    setValue1(event.target.value);
    setDeleteoption(true)
  }

  
  const closePopup = () => {
    setShowPopup(false); // Close the popup when clicking outside or on close button
  };


  const AddPopup=async()=>{
    try{
        if(projectName){
          const response = await fetch('http://localhost:4000/sensor/ASCAN_PROJECT_ADD',{
            method:'POST',
            headers:{
              'Content-type':'application/json',
            },
            body:JSON.stringify({projectName}),
          });
          const data = await response.json();
          if(data){
            setProjectName('')
            setShowPopup(false)
            console.log("data =".data)
          }
        }else{
            window.alert("please enter the project")
        }
    }catch(error){
      console.log("catched error",error)
    }
  }
  const Settings_Page =()=>{
    setSettings_Page(true);
  }
  const projectDeleteButton =async()=>{
    if(value1 == ' '){
      window.alert("Please select the Project!!")
    }else{
      console.log("project name ===",value1)
      const response  = await fetch('http://localhost:4000/sensor/ASCAN_PROJECT_DELETE',{
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify({projectName:value1}),
      });
      const data = await response.json();
      console.log(data);
      setDeleteoption(false)
    }
  }


  const submitbutton =async()=>{
    if(pulsewidth && amplitude && gain && mode && average && threshold && nop && start && stop){
      if(value != 'None'){
        const response  = await fetch('http://localhost:4000/sensor/SETTINGS_PAGE',{
          method:'POST',
          headers:{
            'Content-type':'application/json',
          },
          body:JSON.stringify({Project:value,Pulsewidth:pulsewidth,Gain:gain,Mode:mode,Average:average,Threshold:threshold,Nop:nop,Start:start,Stop:stop}),
        });
        const data = await response.json();
        console.log(data);
      }else{
        window.alert("please select the project")
      }

    }else{
      window.alert("please check the parameter field")
    }
  }

  return (
    <div className='bg-[#8a4300] h-screen w-full'>
      <div className='h-[10%] flex'>
        <div className='w-[8%] '>
          <img src={xyma_img}/>
        </div>
        <div className='flex justify-center items-center w-[92%]'>
          <h2 className='font-bold text-xl text-white'>XYMA HARDWARE CONTROL SYSTEM</h2>
        </div>
        <div className='flex justify-center items-center text-2xl mr-2 font-bold hover:cursor-pointer hover:scale-110 duration-200' onClick={Settings_Page}>
          <IoSettings className='text-gray-200 '/>
        </div>
      </div>
      <div className='h-[90%] xl:flex gap-3'>
        <div className='bg-[#faf7f5] w-[100%] xl:w-[20%] h-[30%] xl:h-[100%] rounded-lg'>
            <div className='h-[7%] bg-[#c5c5c5] rounded-md flex justify-between items-center'>
              <div className='font-bold border-b-2 border-[#8a4300] ml-2'>
                SETTINGS
              </div>
              <div className='mr-2'>
                  <select value={value} onChange={handleChange}>
                  <option value="None">None</option>
                  {dropdownvalue.map((item,index)=>(
                  <option key={index} value={item}>
                    {item.toUpperCase()}
                  </option>
                  ))}
                  <option value="add_project">Add</option>
                </select>
              </div>
              
            </div>
            <div className='h-[93%] p-4 overflow-auto'>
              <div className="font-bold flex justify-center items-center mb-4">
                <div className="border-b-2 border-[#8a4300] text-sm">PULSER RECEIVER SETTINGS</div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-center">
                  <h2 className="w-[30%]">Pulse Width:</h2>
                  <input className="w-[70%] p-2 border border-gray-300 rounded" 
                  value={pulsewidth}
                  onChange={(e)=>setpulsewidth(e.target.value)}
                  placeholder="Enter pulse width" />
                </div>
                <div className="flex items-center">
                  <h2 className="w-[30%]">Amplitude:</h2>
                  <input className="w-[70%] p-2 border border-gray-300 rounded"
                  value={amplitude}
                  onChange={(e)=>setAmplitude(e.target.value)}
                  placeholder="Enter amplitude" />
                </div>
                <div className="flex items-center">
                  <h2 className="w-[30%]">Gain:</h2>
                  <input className="w-[70%] p-2 border border-gray-300 rounded"
                  value={gain}
                  onChange={(e)=>setGain(e.target.value)}
                  placeholder="Enter gain" />
                </div>
                <div className="flex items-center">
                  <h2 className="w-[30%]">Mode:</h2>
                  <input className="w-[70%] p-2 border border-gray-300 rounded" 
                    value={mode}
                    onChange={(e)=>setMode(e.target.value)}
                  placeholder="Enter mode" />
                </div>
              </div>
              {/* siganl settings */}
              <div className="font-bold flex justify-center items-center mb-4">
                <div className="border-b-2 border-[#8a4300] text-sm">SIGNAL SETTINGS</div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-center">
                  <h2 className="w-[30%]">Average:</h2>
                  <input className="w-[70%] p-2 border border-gray-300 rounded"
                  value={average}
                  onChange={(e)=>setAverage(e.target.value)}
                  placeholder="Enter Average" />
                </div>
                <div className="flex items-center">
                  <h2 className="w-[30%]">Threshold:</h2>
                  <input className="w-[70%] p-2 border border-gray-300 rounded" placeholder="Enter threshold" 
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <h2 className="w-[30%]">NoP:</h2>
                  <input className="w-[70%] p-2 border border-gray-300 rounded"
                  value={nop}
                  onChange={(e) => setNop(e.target.value)}
                  placeholder="Enter NoP" />
                </div>
                <div className="flex items-center">
                  <h2 className="w-[30%]">Start:</h2>
                  <input className="w-[70%] p-2 border border-gray-300 rounded"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  placeholder="Enter Start" />
                </div>
                <div className="flex items-center">
                  <h2 className="w-[30%]">Stop:</h2>
                  <input className="w-[70%] p-2 border border-gray-300 rounded"
                  value={stop}
                  onChange={(e) => setStop(e.target.value)}
                  placeholder="Enter Stop" />
                </div>
              </div>
              <div className='flex justify-end items-end mt-2 '>
                <button className='font-bold text-sm border rounded-lg bg-[#2d2d2d] p-2 text-white hover:cursor-pointer hover:scale-110 duration-200' onClick={submitbutton} >Submit</button>
              </div>
            </div>
          
        </div>
        <div className='bg-[#faf7f5] w-[100%] mt-2 xl:mt-0 xl:w-[80%] h-[70%]  xl:h-[100%] rounded-lg'>
          <div className='bg-[#c5c5c5] h-[7%] w-full flex justify-between items-center rounded-lg'>
              <div className='flex-1 flex justify-center items-center font-bold'>
                ASCAN PLOT 
              </div>
              <div className='flex gap-2 mr-2'>
                <div className='flex border border-black rounded-md hover:bg-green-400 justify-center items-center gap-2 p-1'>
                  <IoMdCloudDownload className='text-2xl'/>
                  <button className='font-bold'>Download</button>
                </div>
                <button className={` ${Btn_Status == 1 ? "bg-[#01b3a0] text-white":""} border font-bold text-xs p-1 border-black hover:bg-[#01b3a0] hover:text-white`} onClick={StartButton}>START</button>
                <button className={`${Btn_Status == 0 ?"bg-[#dd0404] text-white":""} border font-bold text-xs p-1 border-black hover:bg-[#dd0404] hover:text-white`} onClick={StopButton}>CLEAR</button>
              </div>
          </div>
          <div className='h-[93%]'>
            <Line
              data={data}
              options={options}
              >
            </Line>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded shadow-lg w-[300px] text-center">
            <h2 className="mb-4 text-lg font-bold">Add New Project</h2>
            <input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className=''>
              <button
                className="px-4 py-2 bg-[#8a4300] text-white rounded mr-2"
                onClick={AddPopup}
              >
                ok
              </button>
              <button
                className="px-4 py-2 bg-[#2d2d2d] text-white rounded"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
            
          </div>
        </div>
      )}
      {setting_Page && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          
          <div className="bg-white p-6 rounded shadow-lg w-[80%] h-[80%] text-center">
            <div className='flex justify-end items-end text-xl' onClick={settingCancelPage}>
                <MdCancel className='hover:text-red-500'/>
            </div>
            <div className='grid xl:grid-cols-3 gap-2 w-full h-[100%]'>
              <div className='border w-full h-[100%]'>
                <div className='h-[100%] w-[100%] p-4'>
                  <div className='h-[5%]'>
                    <div className='font-bold'>Project Info!</div>
                  </div>
                  <div className='flex h-[6%]'>
                    <div className='font-bold'>Select ProjectName : </div>
                    <div className='mr-2'>
                      <select value={value1} className='border bg-blue-400 border-black text-white rounded-r-md' onChange={handleChange1}>
                        <option value="None">None</option>
                        {dropdownvalue.map((item,index)=>(
                        <option key={index} value={item}>
                          {item.toUpperCase()}
                        </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='h-[89%]'>
                    {showOptions &&(
                      <div className='flex border justify-between items-center'>
                        <div className=''>
                          <p>{value1}</p>
                        </div>
                        <div className='text-xl font-bold'>
                          <MdDelete className='text-red-700 cursor-pointer' onClick={projectDeleteButton}/>
                        </div>
                      </div>
                    )
                    }
                  </div>
                </div>
              </div>
              <div className='border w-full h-[100%]'>
                cols-2
              </div>
              <div className='border w-full h-[100%]'>
                cols-3
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Ascan
