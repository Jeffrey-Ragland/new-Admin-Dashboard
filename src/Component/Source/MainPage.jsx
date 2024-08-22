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
import '../Css/Source.css'
import { FaChartArea } from "react-icons/fa";
import {Line} from 'react-chartjs-2';

import { Chart as ChartJS,LineElement,CategoryScale,LinearScale,PointElement, scales } from 'chart.js'; 
import ReactSlider from 'react-slider';
ChartJS.register(LineElement,CategoryScale,LinearScale,PointElement)

const MainPage = (dataFromApp) => {

    const [filteredParameterData, setFilteredParameterData] = useState([]);
    const [parameterCount, setParameterCount] = useState();
    const [pieData, setPieData] = useState([]);
    const [activeStatus, setActiveStatus] = useState('Inactive');
    const [peakValues, setPeakValues] = useState([]); //peak value
    const [gaugeOptions, setGaugeOptions] = useState({});
    const [lineData, setLineData] = useState({
      labels: [],
      datasets: [],
    });
    const [lineSliderValues, setLineSliderValues] = useState([0, 1000]); 

    const dataFromAppFile = dataFromApp.dataFromApp;

    // filtering only the parameters
    useEffect(() => {
      if(dataFromAppFile.length > 0) {
        const filteredData = dataFromAppFile.map(
          ({ createdAt, ...rest }) => rest
        );

        const count = filteredData.length > 0 ? Object.keys(filteredData[0]).length : 0;

        // peak value
        if(filteredData.length > 0) {
          const entries = Object.entries(filteredData[0]);
          const numericEntries = entries.map(([key,value]) => [key, parseFloat(value)]);
          const max = Math.max(...numericEntries.map(([, value]) => value));

          const peaks = numericEntries.filter(([, value]) => value === max);
          setPeakValues(peaks); 
          console.log('max gauge', max);
          // gauge chart options
          setGaugeOptions({
            greenFrom: 0,
            greenTo: max - 10,
            yellowFrom: max - 40,
            yellowTo: max + 10,
            redFrom: max + 10,
            redTo: max + 40,
            minorTicks: 5,
            max: max + 40,
          });
        };

        setFilteredParameterData(filteredData);
        setParameterCount(count); // NOS
      }
    }, [dataFromAppFile]);

    console.log('data from app file',dataFromAppFile);
    console.log('filtered parameter data', filteredParameterData);
  
    //pie chart code
    useEffect(() => {
      if(filteredParameterData.length > 0) {

        const lastData = filteredParameterData[0];
        const pieChartData = Object.entries(lastData).map(([key, value]) => [key,parseFloat(value)]);
        setPieData([["Category", "Value"], ...pieChartData]);
      }
    },[filteredParameterData]);

    const pieOptions = {
        is3D: true,
        legend:{
            position: 'bottom',
            textStyle:{
                fontSize: 7,
                color: '#FFFFFF'
            }
        },
        backgroundColor: 'transparent'
    };

    // activity status
    useEffect (() => {
      if (dataFromAppFile.length > 0) {
        const currentDate = new Date();
        const lastDataDate = new Date(dataFromAppFile[0].createdAt);

        const timeDifference = currentDate.getTime() - lastDataDate.getTime();
        const differenceInMinutes = timeDifference / (1000 * 60);

        if (differenceInMinutes < 5) {
          setActiveStatus("Active");
        } else {
          setActiveStatus("Inactive");
        }
      } else {
        console.error("createdAt field is missing in the data");
      };
    },[dataFromAppFile]);

    // gauge chart
    const gaugeData = [
      ['Label', 'Value'],
      ['Peak', peakValues.length > 0 ? peakValues[0][1] : 'N/A'],
    ];
    
    // local storage graph limit
    const getInitialLimit = () => {
      const storedLimit = localStorage.getItem('AutoDashLimit');
      return storedLimit ? parseInt(storedLimit) : 100;
    }

    const [autoDashLineLimit, setAutoDashLineLimit] = useState(getInitialLimit);

    const handleLineLimit = (e) => {
      const limit = parseInt(e.target.value);
      setAutoDashLineLimit(limit);
      localStorage.setItem("AutoDashLimit",limit.toString());
    }

    // line chart
    useEffect(() => {
      if (dataFromAppFile.length > 0) {
        const reversedData = [...dataFromAppFile].reverse();

        const lineLabels = reversedData.map((item) => {
          const createdAt = new Date(item.createdAt).toLocaleString("en-GB");
          return createdAt;
        });

        if (filteredParameterData.length > 0) {
          const parameterKeys = Object.keys(filteredParameterData[0]);

          const datasets = parameterKeys.map((key, index) => ({
            label: key,
            data: reversedData.map((item) => item[key]),
            borderColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
            backgroundColor: `hsla(${(index * 60) % 360}, 70%, 50%, 0.2)`,
          }));
          setLineData({
            labels: lineLabels,
            datasets,
          });
        }
      }
    }, [dataFromAppFile]);

    const lineOptions = {
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
      },
      scales: {
        x: {
          ticks: {
            color: "white",
            font: {
              size: 5,
            },
          },
        },
        y: {
          min: lineSliderValues[0],
          max: lineSliderValues[1],
          ticks: {
            color: "white",
            font: {
              size: 6,
            },
          },
          grid: {
            color: "darkGray",
          },
        },
      },
    };

    const handleLineSliderChange = (value) => {
      setLineSliderValues(value);
    };

  return (
    <>
      <div
        className="xl:h-screen flex flex-col 2xl:text-2xl"
        style={{
          background:
            "linear-gradient(to right top, #000000, #1c191a, #2f2b2f, #423f47, #545560, #5e5f6d, #676a7b, #717589, #7a748c, #85738c, #917189, #9c7083)",
        }}
      >
        <div className="h-[7%]">
          <Navbar />
        </div>
        {/* main content */}
        <div className="flex flex-col h-[93%] gap-2 p-2 pb-4">
          {/* top section */}
          <div className="flex flex-col-reverse md:flex-col xl:flex-row gap-2 xl:h-1/2">
            {/* section 1 - cards */}
            <div className="w-full xl:w-1/2 flex flex-col shadow-lg shadow-gray-600 border border-gray-400">
              <div className="flex text-white">
                <div className="bg-gray-700 flex-1 p-1 font-medium">
                  Sensor Data
                </div>
                <div className="p-1 bg-[#e9903d] text-2xl flex justify-center items-center">
                  <MdOutlineSensors />
                </div>
              </div>
              <div
                className="grid grid-cols-3 gap-2 p-2 xl:flex-1 h-[250px] overflow-auto bg-white/5"
                style={{
                  // background:
                  //   "linear-gradient(180deg, #737780 0%, #6c7587 100%)",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#4B5563 transparent",
                }}
              >
                {filteredParameterData.length > 0 &&
                  Object.keys(filteredParameterData[0]).map((key) => (
                    <div
                      key={key}
                      className="font-medium border-2 bg-[#fcb599] text-gray-700 rounded-md h-28 2xl:h-56 flex flex-col items-center justify-center"
                    >
                      <div className="flex justify-center items-center text-2xl font-bold">
                        <div className="text-3xl">
                          <FaTemperatureArrowDown />
                        </div>
                        <div>{`${filteredParameterData[0][key]}`}</div>
                      </div>
                      <div className="flex items-center justify-center">
                        {`${key} `}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* bg-[#fcb599] */}

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
                  className="md:flex-1 bg-white/5"
                  // style={{
                  //   background:
                  //     "linear-gradient(180deg, #737780 0%, #6c7587 100%)",
                  // }}
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
                <div className="h-[40%] flex flex-col shadow-lg shadow-gray-600">
                  <div className="flex text-white">
                    <div className="bg-gray-700 flex-1 p-1 font-medium">
                      Device Info
                    </div>
                    <div className="p-1 bg-[#e9903d] text-xl flex items-center justify-center">
                      <MdInfo />
                    </div>
                  </div>
                  <div
                    className="flex-1 p-1 flex flex-col gap-2 bg-white/5"
                    // style={{
                    //   background:
                    //     "linear-gradient(180deg, #737780 0%, #6c7587 100%)",
                    // }}
                  >
                    <div className="h-[40%] flex gap-1 font-medium">
                      <div
                        className="flex justify-center items-center gap-1 w-1/2 rounded-md"
                        style={{
                          background:
                            "linear-gradient(180deg, #e3ebfc 0%, #ccd3e3 100%)",
                        }}
                      >
                        {activeStatus === "Active" ? (
                          <div className="text-green-500">
                            <IoMdCheckmarkCircleOutline className="text-xl" />
                          </div>
                        ) : (
                          <div className="text-red-500">
                            <AiOutlineWarning className="text-xl" />
                          </div>
                        )}
                        <div
                          className={`${
                            activeStatus === "Active"
                              ? "text-green-500"
                              : "text-red-500"
                          } py-4 md:py-0`}
                        >
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
                        <div>{parameterCount}</div>
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
                        {dataFromAppFile.length > 0 &&
                          new Date(dataFromAppFile[0].createdAt).toLocaleString(
                            "en-GB"
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* speedometer */}
                <div className="h-[60%] flex flex-col shadow-lg shadow-gray-600">
                  <div className="flex text-white">
                    <div className="bg-gray-700 flex-1 p-1 font-medium">
                      Peak Value
                    </div>
                    <div className="p-1 bg-[#e9903d] text-xl flex items-center justify-center">
                      <FaThinkPeaks />
                    </div>
                  </div>
                  <div
                    className="flex-1 flex items-center justify-evenly py-4 xl:py-0 bg-white/5"
                    // style={{
                    //   background:
                    //     "linear-gradient(180deg, #737780 0%, #6c7587 100%)",
                    // }}
                  >
                    <div className="flex gap-1">
                      {peakValues.map(([key, value]) => (
                        <div
                          key={key}
                          className=" font-medium w-full text-white  "
                        >
                          {`${key},`}
                        </div>
                      ))}
                    </div>
                    <div className=" 2xl:hidden">
                      <Chart
                        chartType="Gauge"
                        height={125}
                        data={gaugeData}
                        options={gaugeOptions}
                      />
                    </div>
                    <div className=" hidden 2xl:block">
                      <Chart
                        chartType="Gauge"
                        height={200}
                        data={gaugeData}
                        options={gaugeOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* bottom section */}
          <div className="flex flex-col-reverse xl:flex-row gap-2 xl:h-1/2 mb-[8vh] xl:mb-0">
            {/* section 3 - table */}
            <div
              className="w-full xl:w-1/2 overflow-auto text-gray-200 h-[250px] xl:h-auto bg-white/5 border border-gray-400"
              style={{
                // background: "linear-gradient(180deg, #737780 0%, #6c7587 100%)",
                scrollbarWidth: "thin",
                scrollbarColor: "#4B5563 transparent",
              }}
            >
              <table className="w-full">
                <thead className="sticky top-0 bg-gray-700">
                  <tr>
                    <th className="border text-white border-gray-500">S.No</th>
                    {filteredParameterData.length > 0 &&
                      Object.keys(filteredParameterData[0]).map((key) => (
                        <th
                          key={key}
                          className="text-white border border-gray-500"
                        >
                          {key}
                        </th>
                      ))}
                    <th className="border text-white border-gray-500">
                      Updated At
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {dataFromAppFile.length > 0 &&
                    dataFromAppFile.map((item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-500 text-center">
                          {index + 1}
                        </td>
                        {filteredParameterData.length > 0 &&
                          Object.keys(filteredParameterData[0]).map(
                            (key, i) => (
                              <td
                                key={i}
                                className="border border-gray-500 text-center"
                              >
                                {item[key]}
                              </td>
                            )
                          )}
                        <td className="border border-gray-500 text-center">
                          {new Date(item.createdAt).toLocaleString("en-GB")}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* section 4 - line graph */}
            <div className="w-full xl:w-1/2 flex flex-col border border-gray-400">
              <div className="flex text-white">
                <div className="bg-gray-700 flex-1 p-1 font-medium">
                  Line Plot
                </div>
                <div className="p-1 bg-[#e9903d] text-xl flex items-center justify-center">
                  <FaChartArea />
                </div>
              </div>
              <div
                className="p-2 flex flex-col flex-1 py-8 xl:py-0 text-white text-sm font-medium bg-white/5"
                // style={{
                //   background:
                //     "linear-gradient(180deg, #737780 0%, #6c7587 100%)",
                // }}
              >
                <div className="flex items-center justify-between px-3">
                  <div className="flex items-center ">
                    <div className="mr-2">Set Limit:</div>
                    <input
                      type="radio"
                      id="option1"
                      name="options"
                      value={100}
                      checked={autoDashLineLimit === 100}
                      className="cursor-pointer mt-0.5"
                      onChange={handleLineLimit}
                    />
                    <label htmlFor="option1" className="mr-2 cursor-pointer">
                      100
                    </label>
                    <input
                      type="radio"
                      id="option2"
                      name="options"
                      value={500}
                      checked={autoDashLineLimit === 500}
                      className="cursor-pointer mt-0.5"
                      onChange={handleLineLimit}
                    />
                    <label htmlFor="option2" className="mr-2 cursor-pointer">
                      500
                    </label>
                    <input
                      type="radio"
                      id="option3"
                      name="options"
                      value={1000}
                      checked={autoDashLineLimit === 1000}
                      className="cursor-pointer mt-0.5"
                      onChange={handleLineLimit}
                    />
                    <label htmlFor="option3" className="mr-2 cursor-pointer">
                      1000
                    </label>
                    <input
                      type="radio"
                      id="option4"
                      name="options"
                      value={1500}
                      checked={autoDashLineLimit === 1500}
                      className="cursor-pointer mt-0.5"
                      onChange={handleLineLimit}
                    />
                    <label htmlFor="option4" className="mr-2 cursor-pointer">
                      1500
                    </label>
                  </div>

                  {/* <div>Edit Range</div> */}
                </div>
                <div className="flex-1 flex w-full">
                  <div className="w-[8%] flex items-center justify-center">
                    <ReactSlider
                      className="w-10 h-[94%] flex justify-center items-center"
                      thumbClassName="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer text-white font-medium text-xs hover:scale-110"
                      trackClassName="w-0.5 rounded-full bg-red-600"
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
                    <Line
                      data={lineData}
                      options={lineOptions}
                      width={"100%"}
                    />
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
