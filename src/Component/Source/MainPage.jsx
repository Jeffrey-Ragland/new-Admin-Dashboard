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
      <div className="xl:h-screen flex flex-col">
        <div className="h-[7%]">
          <Navbar />
        </div>
        {/* main content */}
        <div className="flex flex-col h-[93%] gap-2 p-2 pb-4">
          {/* top section */}
          <div className="flex flex-col-reverse md:flex-col xl:flex-row gap-2 xl:h-1/2">
            {/* section 1 - cards */}
            <div className="w-full xl:w-1/2 flex flex-col shadow-lg shadow-gray-600">
              <div className="flex text-white">
                <div className="bg-gray-700 flex-1 p-1 font-medium">
                  Sensor Data
                </div>
                <div className="p-1 bg-[#e9903d] text-2xl flex justify-center items-center">
                  <MdOutlineSensors />
                </div>
              </div>
              <div
                className="grid grid-cols-3 gap-2 p-2 xl:flex-1 h-[250px] overflow-auto"
                style={{
                  background:
                    "linear-gradient(180deg, #737780 0%, #6c7587 100%)",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#4B5563 transparent",
                }}
              >
                {Object.keys(cardData)
                  .filter(
                    (key) => key !== "_id" && key !== "__v" && key !== "Time"
                  )
                  .map((key) => (
                    <div
                      key={key}
                      className="font-medium border-2 bg-[#fcb599] text-gray-700 rounded-md h-28 flex flex-col items-center justify-center"
                    >
                      <div className="flex justify-center items-center text-2xl font-bold">
                        <div className="text-3xl">
                          <FaTemperatureArrowDown />
                        </div>
                        <div>{`${cardData[key]}`}</div>
                      </div>
                      <div className="flex items-center justify-center">
                        {`${key} `}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* section 2 */}
            <div className="flex flex-col-reverse md:flex-row gap-2 w-full xl:w-1/2">
              {/* pie chart */}
              <div className="w-full md:w-1/2 flex flex-col shadow-lg shadow-gray-600">
                <div className="flex text-white">
                  <div className="bg-gray-700 flex-1 p-1 font-medium">
                    Pie Visualization
                  </div>
                  <div className="p-1 bg-[#e9903d] text-xl flex items-center justify-center">
                    <FaChartPie />
                  </div>
                </div>
                <div
                  className="md:flex-1"
                  style={{
                    background:
                      "linear-gradient(180deg, #737780 0%, #6c7587 100%)",
                  }}
                >
                  <Chart
                    chartType="PieChart"
                    width={"100%"}
                    height={"100%"}
                    data={pieData}
                    options={pieOptions}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-1/2">
                {/* last update */}
                <div className="h-1/2 flex flex-col shadow-lg shadow-gray-600">
                  <div className="flex text-white">
                    <div className="bg-gray-700 flex-1 p-1 font-medium">
                      Device Info
                    </div>
                    <div className="p-1 bg-[#e9903d] text-xl flex items-center justify-center">
                      <MdInfo />
                    </div>
                  </div>
                  <div
                    className="flex-1 p-1 flex flex-col gap-2"
                    style={{
                      background:
                        "linear-gradient(180deg, #737780 0%, #6c7587 100%)",
                    }}
                  >
                    <div className="h-[40%] flex gap-1 font-medium">
                      <div
                        className="flex justify-center items-center gap-2 w-1/2 rounded-md"
                        style={{
                          background:
                            "linear-gradient(180deg, #e3ebfc 0%, #ccd3e3 100%)",
                        }}
                      >
                        {activeStatus === "ACTIVE" ? (
                          <div className="text-green-500">
                            <IoMdCheckmarkCircleOutline className="text-xl" />
                          </div>
                        ) : (
                          <div>
                            <AiOutlineWarning className="text-xl" />
                          </div>
                        )}
                        <div className="text-green-500 py-4 md:py-0">
                          {activeStatus}
                        </div>
                      </div>
                      <div
                        className="w-1/2 rounded-md font-bold flex gap-1 justify-center items-center text-[#fc5050]"
                        style={{
                          background:
                            "linear-gradient(180deg, #e3ebfc 0%, #ccd3e3 100%)",
                        }}
                      >
                        <div>NOS:</div>
                        <div>{leftoverKeys}</div>
                      </div>
                    </div>
                    <div
                      className="h-[60%] rounded-md text-gray-700 py-4 md:py-0"
                      style={{
                        background:
                          "linear-gradient(180deg, #e3ebfc 0%, #ccd3e3 100%)",
                      }}
                    >
                      <div className="flex gap-1 justify-center items-center">
                        <div className="mr-1 ">
                          <MdOutlineManageHistory className="text-2xl" />
                        </div>
                        <div className="flex items-center font-bold  border-b pb-0  border-gray-600">
                          RECENT UPDATE
                        </div>
                      </div>
                      <div className="flex justify-center items-center font-bold text-xs">
                        {lastUpdated}
                      </div>
                    </div>
                  </div>
                </div>
                {/* speedometer */}
                <div className="h-1/2 flex flex-col shadow-lg shadow-gray-600">
                  <div className="flex text-white">
                    <div className="bg-gray-700 flex-1 p-1 font-medium">
                      Peak Value
                    </div>
                    <div className="p-1 bg-[#e9903d] text-xl flex items-center justify-center">
                      <FaThinkPeaks />
                    </div>
                  </div>
                  <div
                    className="flex-1 overflow-auto py-4 xl:py-0"
                    style={{
                      background:
                        "linear-gradient(180deg, #737780 0%, #6c7587 100%)",
                    }}
                  >
                    {peakValues.map((peak, index) => (
                      <div
                        key={index}
                        className="flex justify-around items-center font-medium"
                      >
                        <div className="text-white font-bold">
                          {`${peak.key}`}
                        </div>
                        <div>
                          <ReactSpeedometer
                            height={100}
                            width={140}
                            // style={chartStyle}
                            maxValue={peak.value + 200}
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* bottom section */}
          <div className="flex flex-col-reverse xl:flex-row gap-2 xl:h-1/2 mb-[8vh] xl:mb-0">
            {/* section 3 - table */}
            <div
              className="w-full xl:w-1/2 overflow-auto text-gray-200 h-[250px] xl:h-auto"
              style={{
                background: "linear-gradient(180deg, #737780 0%, #6c7587 100%)",
                scrollbarWidth: "thin",
                scrollbarColor: "#4B5563 transparent",
              }}
            >
              <table className="w-full">
                <thead className="sticky top-0 bg-gray-700">
                  <tr>
                    <th className="border text-white border-black">S.No</th>
                    {Object.keys(cardData)
                      .filter(
                        (key) =>
                          key !== "_id" && key !== "__v" && key !== "Time"
                      )
                      .map((key) => (
                        <th
                          key={key}
                          className="text-white border border-black"
                        >
                          {key}
                        </th>
                      ))}

                    <th className="border text-white border-black">
                      Updated At
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {alldata.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-black text-center">
                        {index + 1}
                      </td>
                      {Object.keys(item)
                        .filter((key) => !["_id", "Time", "__v"].includes(key))
                        .map((key, i) => (
                          <td
                            key={i}
                            className="border border-black text-center"
                          >
                            {item[key]}
                          </td>
                        ))}
                      <td className="border border-black text-center">
                        {item.Time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* section 4 - line graph */}
            <div className="w-full xl:w-1/2 flex flex-col">
              <div className="flex text-white">
                <div className="bg-gray-700 flex-1 p-1 font-medium">
                  Line Plot
                </div>
                <div className="p-1 bg-[#e9903d] text-xl flex items-center justify-center">
                  <FaChartArea />
                </div>
              </div>
              <div
                className="p-2 flex flex-col flex-1 py-8 xl:py-0"
                style={{
                  background:
                    "linear-gradient(180deg, #737780 0%, #6c7587 100%)",
                }}
              >
                <div className="flex h-[10%]">
                  <div
                    className="flex gap-2 w-[92%] overflow-auto"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {Object.keys(cardData)
                      .filter(
                        (key) =>
                          key !== "_id" && key !== "__v" && key !== "Time"
                      )
                      .map((key, index) => (
                        <div
                          key={key}
                          className=" text-white-700 flex text-xs font-medium rounded-md"
                        >
                          <input
                            id={key}
                            type="checkbox"
                            className="cursor-pointer"
                            onChange={() => handleKeyClick(key)}
                            checked={
                              index === 0 && selectedKey.length === 0
                                ? true
                                : selectedKey.includes(key)
                            }
                          ></input>
                          <div className="flex items-center">{`${key}`}</div>
                        </div>
                      ))}
                  </div>
                  <select
                    id="limit"
                    value={limit}
                    onChange={handleLimitChange}
                    className="text-xs w-[8%] rounded-xl font-medium cursor-pointer"
                  >
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div className="flex w-full h-[90%]">
                  <div className="w-[8%] flex justify-center">
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

                  <div className="w-[92%]">
                    <Line data={data} options={options} height={"100%"}></Line>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage
