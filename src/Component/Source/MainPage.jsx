import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Chart} from 'react-google-charts'
import {AiOutlineWarning } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import { MdBorderVertical, MdOutlineManageHistory } from "react-icons/md";
import { FaThinkPeaks } from "react-icons/fa";
import { AiOutlinePieChart } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Navbar from './Navbar';
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaTable } from "react-icons/fa6";
import { MdOutlineSensors } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import ReactSpeedometer from "react-d3-speedometer"
import '../Css/Source.css'
import { FaChartArea } from "react-icons/fa";
import {Line} from 'react-chartjs-2';

import { Chart as ChartJS,LineElement,CategoryScale,LinearScale,PointElement, scales } from 'chart.js';
import ReactSlider from 'react-slider';
ChartJS.register(LineElement,CategoryScale,LinearScale,PointElement)

const MainPage = (all_sensor_data) => {



    const [pieData, setPieData] = useState([]);
    const [activeStatus, setActiveStatus] = useState('ACTIVE'); 
    const [lastUpdated, setLastUpdated] = useState(); //last update
    const [peakValues, setPeakValues] = useState([]); //peak value
    const [leftoverKeys, setLeftoverKeys] = useState(0); //total parameters
    const [limit, setLimit] = useState(25); //for line graph limit
    const alldata = all_sensor_data.all_sensor_data
    const [selectedKey, SetSelectedKey] = useState([]); // line graph parameter selection
    const [lineSliderValues, setLineSliderValues] = useState([0, 1000]); 
    let ChartSensor = sessionStorage.getItem("Chart_status");
    const chart_data = all_sensor_data.all_sensor_data.map(item=>item[ChartSensor]);


    const handleLimitChange = (e) =>
    {
        setLimit(parseInt(e.target.value));
        sessionStorage.setItem('Chart_Limit',parseInt(e.target.value)) 

    };
 

    const handleKeyClick = (key) =>
    {
        SetSelectedKey(key);
        sessionStorage.setItem('Chart_status',key)    
    };
  
    
 

    // card data code
    let cardData = 'N/A';
    if(alldata && alldata.length > 0)
    {
        cardData = alldata[0];
    }


    //pie chart code
    useEffect(() => {
        if (alldata.length > 0) {
            const lastProjectData = alldata[0];
            const keysBeforeFilter = Object.keys(lastProjectData);
            const filteredkeys = keysBeforeFilter.filter(key => key !== '_id' && key !== '__v' && key !== 'Time')
            const pieChartData =filteredkeys.map(key => [key, parseFloat(lastProjectData[key])]); 
            setPieData([['Category', 'Value'], ...pieChartData]);
            setLastUpdated(lastProjectData.Time); // for last updated

            const peakValues = findPeakValue(lastProjectData); // for peak value
            setPeakValues(peakValues);

            const leftoverKeys = keysBeforeFilter.length - 3; //total parameters
            setLeftoverKeys(leftoverKeys);
        }
    }, [alldata]);


    const pieOptions = {
      
        is3D: true,
        legend:{
            position: 'bottom',
            textStyle:{
                fontSize: 7
            }
        },
        backgroundColor: 'transparent'
    };


    // function to find peak value
    const findPeakValue = (data) =>
    {
        let maxValues = [];  
        let maxValue = -Infinity;
        
        for (const key in data)
        {
            if(data.hasOwnProperty(key) && key !== '_id' && key !== '__v' && key !== 'Time')
            {
                const value = parseFloat(data[key]);

                if(value > maxValue)
                {
                    maxValues = [{key,value}];
                    maxValue = value;
                }
                else if(value === maxValue)
                {
                    maxValues.push({key,value});
                }
            }
        }
        return maxValues;
    }

    //for custom scrollbar
    const customScrollbarStyle = {
        scrollbarWidth: 'thin',
        scrollbarColor: '#616161 transparent',
    };

  
    const chartStyle = {
        height: 250,
      }



      //Linechart

      const data={
        labels:chart_data,
        datasets:[{
            // label: 'Headers',
            data:chart_data,
            backgroundColor:'block',
            borderColor:'red',
            pointBordColor:'aqua',
            fill:true,
            tension:0.4,
            pointLabel: ({ dataIndex }) => {
                // Return the data value for the corresponding point
                return data.datasets[0].data[dataIndex];
            },
        }]
      }

      const options ={
        plugins:{
            // legend:true,
       
        },
        scales:{
            x: {
                grid:{
                    color:'white'
                },
                ticks: {
                    color: '#2d2d2d', 
                },
            },
            y: {
                min:lineSliderValues[0],
                max:lineSliderValues[1],
                ticks: {
                    color: '#2d2d2d',
                },
                grid:{
                    color:'white'
                },
            },
        }
      }

    //   function valuetext(value: number) {
    //     return `${value}°C`;
    //   }

      const marks = [
        {
          value: 0,
          label: '0°C',
        },
        {
          value: 20,
          label: '20°C',
        },
        {
          value: 37,
          label: '37°C',
        },
        {
          value: 100,
          label: '100°C',
        },
      ];


      const handleLineSliderChange = (value) => {
        setLineSliderValues(value);
      };


//   const keys = Object.keys(cardData).filter(key => key !== '_id' && key !== 'Time' && key !== '__v');
//   const length = keys.length;
//   keys.forEach(key => console.log(`${key}: ${cardData[key]}`));



  const filteredKeys = Object.keys(cardData).filter(
    key => key !== '_id' && key !== '__v' && key !== 'Time'
  );
  return (
    <>
    <div className='flex'>
        <div className='w-full'>
            <div>
                <Navbar/>
            </div>
            {/* main content */}
            <div className='px-2'>
                <div className='sm:flex sm:h-[41vh] 2xl:h-[44vh] xxs:h-screen gap-4 mb-4'>
                <div className='sm:w-1/2 xxs:h-1/2 sm:h-full w-full'>
                    <div className='h-[15%] bg-gray-600 flex justify-between align-middle'>
                            <div className='flex justify-center items-center'>
                                <h5 className='font-bold text-white ml-2'>Sensor Data</h5>
                            </div>
                            <div className='bg-[#e9903d] flex items-center justify-center w-[5%] rounded-sm m-1 '>
                                <MdOutlineSensors  className='text-white'/>
                            </div>
                    </div>
                    <div className='h-[85%] bg-gray-500 grid grid-cols-3 gap-2 p-2 overflow-auto shadow-ls' style={customScrollbarStyle} >
                        {Object.keys(cardData)
                        .filter(key => key !== '_id' && key !== '__v' && key !== 'Time')
                        .map(key =>(
                           
                            <div key={key} className='grid grid-rows-2 h-[15vh] font-medium border-2 bg-[#fcb599] text-gray-700 hover:scale-105 duration-200 cursor-pointer shadow-lg  rounded-md'>
                                <div className='flex justify-center items-center'>
                                    <div className=''>
                                        <FaTemperatureArrowDown className='text-2xl mt-2 mr-4'/>
                                    </div>
                                    <div className='text-2xl font-bold'>
                                        {`${cardData[key]}`}
                                    </div>
                                </div>
                                <div className='flex items-center justify-center'>
                                    {`${key} `}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                    
                    <div className='sm:w-1/2 xxs:h-1/2 sm:h-full mb-4 flex gap-2'>
                        {/* pie chart */}
                        <div className='w-1/2 shadow-xl '>
                            <div className='h-[15%] bg-gray-600 flex justify-between align-middle'>
                                <div className='flex justify-center items-center'>
                                    <h5 className='font-bold text-white ml-2'>Pie Visualization</h5>
                                </div>
                                <div className='bg-[#e9903d] flex items-center justify-center w-[10%] rounded-sm m-1 '>
                                    <FaChartPie   className='text-white'/>
                                </div>
                            </div>
                            <div className='h-[85%] bg-gray-500'>
                                <div className='h-6/6'>
                                    <Chart chartType='PieChart' width={'100%'} height={'100%'} data={pieData} options={pieOptions}/>
                                </div> 
                            </div>
                        </div>
                        <div className='w-1/2 flex flex-col'>
                            <div className='h-[15%] bg-gray-600 flex justify-between align-middle'>
                                <div className='flex justify-center items-center'>
                                    <h5 className='font-bold text-white ml-2'>Device Info</h5>
                                </div>
                                <div className='bg-[#e9903d] flex items-center justify-center w-[10%] rounded-sm m-1 '>
                                    <MdInfo   className='text-white'/>
                                </div>
                            </div>
                            <div className='h-1/2 bg-gray-500 flex  flex-col gap-2 p-1 shadow-xl'>
                                <div className='flex gap-4 justify-around'>
                                    <div className='flex font-bold'>
                                        {
                                            activeStatus === 'ACTIVE' ? 
                                            <div className='mr-1 text-green-500'><IoMdCheckmarkCircleOutline size={25}/></div> :
                                            <div className='mr-1'><AiOutlineWarning size={25}/></div> 
                                        }
                                        <div className='text-green-500'>{activeStatus}</div>
                                    </div>
                                    <div className='flex gap-1'>
                                        <div className='flex items-center justify-center'>
                                            <div className='flex items-center font-bold text-[#fc5050]'>NOS:</div>
                                        </div>
                                        <div className='flex justify-center text-[#ffffff] items-center font-bold'>
                                            {leftoverKeys}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                <div className='flex justify-center text-xs'>
                                        <div className='mr-1 text-[#fff347]'><MdOutlineManageHistory size={25}/></div>
                                        <div className='flex items-center font-bold text-[#fff347] border-b pb-0  border-white'>RECENT UPDATE</div>
                                    </div>
                                    <div className='flex justify-center items-center font-bold text-xs'>{lastUpdated}</div>
                                </div>
                                
                            </div>
                            {/* peak value */}
                            <div className='h-1/2 mt-1 bg-gray-500 overflow-auto p-1 shadow-xl' style={customScrollbarStyle}>
                                <div className='flex items-start justify-start text-[#ffa24c]'>
                                    <div className='mr-1'><FaThinkPeaks size={20}/></div>
                                    <div className='text-xs font-bold border-b pb-0  border-white'>PEAK VALUE</div>
                                </div>
                                {
                                    peakValues.map((peak, index) =>(
                                        <div key={index} className='rounded-md cursor-pointer hover:scale-[1.02] duration-200 h-1/3 mt-2 text-gray-700 flex justify-around items-center font-medium'>
                                            <div className='text-white font-bold'>
                                                {`${peak.key}`}
                                            </div>
                                            <div className='mt-4 data' >
                                                <ReactSpeedometer height={100} width={140}  style={chartStyle}  maxValue={(peak.value)+200}
                                                    value={peak.value}
                                                    needleColor="white"
                                                    startColor="green"
                                                    arcsLength={[0.3, 0.5, 0.2]}
                                                    // forceRender={true}
                                                    maxSegmentLabels={5}
                                                    needleHeightRatio={0.7}
                                                    endColor="red"
                                                    valueTextFillColor="white"
                                                  
                                                    
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sm:flex sm:h-[41vh] 2xl:h-[44vh] xxs:h-screen gap-4 mb-4'>
                    <div className='sm:w-1/2 xxs:h-1/2 sm:h-full mb-2  bg-gray-500 w-full scrollbar-hide  shadow-xl overflow-auto px-2'>
                    <table className='w-full'>
                                <thead className='sticky top-0 bg-gray-600'>
                                    <tr>
                                        <th className='border text-white border-black'>S.No</th>
                                        {
                                        Object.keys(cardData)
                                        .filter(key => key !== '_id' && key !== '__v' && key !== 'Time')
                                        .map((key) => (
                                            <th key={key} className='text-white border border-black'> {key} </th>
                                        ))
                                    }
                                       
                                        <th className='border text-white border-black'>Updated At</th>
                                    </tr>
                                </thead>
                                <tbody className='text-xs'>
                                    {
                                        alldata
                                        .map((item,index) => (
                                            <tr key={index}>
                                                <td className='border border-black text-center'>{index + 1}</td>
                                                {Object.keys(item)
                                                .filter(key => !['_id', 'Time', '__v'].includes(key))
                                                .map((key, i) => (
                                                    <td key={i} className='border border-black text-center'>{item[key]}</td>
                                                ))}
                                                <td className='border border-black text-center'>{item.Time}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        
                    </div>
                    {/* line graph */}
                    <div className='sm:w-1/2 xxs:h-1/2 sm:h-full mb-4 shadow-lg'>
                        <div className='h-[15%] bg-gray-600 flex justify-between align-middle'>
                            <div className='flex justify-center items-center'>
                                <h5 className='font-bold text-white ml-2'>Peak Analysis</h5>
                            </div>
                            <div>
                                <div>
                                
                                </div>
                            </div>
    
                            <div className='bg-[#e9903d] flex items-center justify-center w-[5%] rounded-sm m-1 '>
                
                                <FaChartArea  className='text-white'/>
                            </div>
                        </div>
                        <div className='h-[85%] bg-gray-500'>
                            <div className='flex justify-around pt-1'>
                                <div className='flex gap-2 w-[88%] overflow-auto' style={{scrollbarWidth : 'none'}}>
                                    {
                                        Object.keys(cardData)
                                        .filter(key => key !== '_id' && key !== '__v' && key !== 'Time')
                                        .map((key,index) => (
                                            <div key={key}  className=' text-white-700 flex text-xs font-medium rounded-md'>
                                                {/* <div className='rounded-full border border-black h-2 w-2 mt-[5px] mr-1'></div> */}
                                                <input id={key} type='checkbox' className='cursor-pointer'
                                                onChange={() =>handleKeyClick(key)}
                                                checked={index === 0 && selectedKey.length === 0 ? true : selectedKey.includes(key)}></input>
                                                <div className='flex items-center'>{`${key}`}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <select id='limit' value={limit} onChange={handleLimitChange} className='text-xs  rounded-xl font-medium cursor-pointer'>
                                    <option value='25'>25</option>
                                    <option value='50'>50</option>
                                    <option value='75'>75</option>
                                    <option value='100'>100</option>
                                </select>
                            </div>
                            <div className='flex'>
                                {/* <div className="vertical-text w-[4%]" > */}
                                <div>
                                <ReactSlider
                                    className="w-10 h-[95%] flex justify-center items-center"
                                    thumbClassName="w-5 h-50 bg-[#2d2d2d] rounded-full flex items-center justify-center cursor-pointer text-white font-medium text-xs hover:scale-110"
                                    trackClassName="w-1 rounded-full bg-gray-300"
                                    min={0}
                                    max={1000}
                                    defaultValue={[0, 1000]}
                                    renderThumb={(props, state) => (
                                        <div {...props}>{state.valueNow}</div>
                                    )}
                                    pearling
                                    minDistance={5}
                                    orientation="vertical"
                                    invert
                                    onChange={(value) => handleLineSliderChange(value)}
                                    />
                                </div>
                            
                               
                                <div className='w-full'>
                                    <Line data={data} height={100} options={options}>
                                    </Line> 
                                </div>                         
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</>
  )
}

export default MainPage
