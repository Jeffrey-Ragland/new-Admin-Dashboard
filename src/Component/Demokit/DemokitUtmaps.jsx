import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import 'jspdf-autotable';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ThreeDModelUtmaps from './ThreeDModelUtmaps';
import xymaLogo from "../Assets/xyma - Copy.png";
import loadingGif from '../Assets/loading.gif';
import { BsThermometerSun } from "react-icons/bs";
import { MdManageHistory } from "react-icons/md";
import { ImUpload3 } from "react-icons/im";
import { LiaRulerHorizontalSolid } from "react-icons/lia";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { MdSystemSecurityUpdateWarning } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DemokitUtmaps = ({dataFromApp, modelLimitS1FromApp, modelLimitS2FromApp}) => {

  const [activeStatus, setActiveStatus] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [modelLimitS1, setModelLimitS1] = useState('');
  const [modelLimitS2, setModelLimitS2] = useState("");
  const [reportLoading, setReportLoading] = useState(false);

  // console.log('model limit', modelLimit);
  // console.log("model limit in dashboard file", modelLimitFromApp);

  const [lineData, setLineData] = useState({
    labels: [],
    datasets: []
  });

  // console.log('utmaps data from app', dataFromApp);
  // console.log(dataFromApp[0]);

  const getInitialLimit = () => {
    const storedLimit = localStorage.getItem("UtmapsLimit");
    return storedLimit ? parseInt(storedLimit) : 100;
  };

  const [utmapsLineLimit, setUtmapsLineLimit] = useState(getInitialLimit);

  const handleLineLimit = (e) => {
    const limit = parseInt(e.target.value);
    setUtmapsLineLimit(limit);
    localStorage.setItem("UtmapsLimit", limit.toString());
  };

  // console.log('utmaps unit', localStorage.getItem('UtmapsUnit'));

  const storedUnit = localStorage.getItem("UtmapsUnit");

  const [selectedUnit, setSelectedUnit] = useState(storedUnit);

  const handleUnitChange = (e) => {
    const unit = e.target.value;
    setSelectedUnit(unit);
    localStorage.setItem("UtmapsUnit", unit);
  };

  // console.log('selected unit',selectedUnit);

  // if(storedUnit === 'C') {
  //   setSelectedUnit('C');
  // } else if(storedUnit === 'F') {
  //   setSelectedUnit('F');
  // } else if(storedUnit === 'K') {
  //   setSelectedUnit('K');
  // };

  // line chart data
    useEffect(() => {
      if (
        Array.isArray(dataFromApp) &&
        dataFromApp.length > 0
      ) {
        const reversedData = [...dataFromApp].reverse();

        const lineLabels = reversedData.map((item) => {
          const createdAt = new Date(item.createdAt).toLocaleString("en-GB");
          return createdAt;
        });
        const sensor1Data = reversedData.map((item) => item.Sensor1);
        const sensor2Data = reversedData.map((item) => item.Sensor2);
        const sensor3Data = reversedData.map((item) => item.Sensor3);
        const sensor4Data = reversedData.map((item) => item.Sensor4);

        setLineData({
          labels: lineLabels,
          datasets: [
            {
              label: "S1",
              data: sensor1Data,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "S2",
              data: sensor2Data,
              borderColor: "rgb(54, 162, 235)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
            },
            {
              label: "S3",
              data: sensor3Data,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
            {
              label: "S4",
              data: sensor4Data,
              borderColor: "rgb(255, 255, 0)",
              backgroundColor: "rgba(255, 255, 0, 0.2)",
            },
          ],
        });
      }
    }, [dataFromApp]);

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
  };

  // bar chart data
  const barData = {
    labels: ["S1", "S2", "S3", "S4"],
    datasets: [
      {
        data: [
          dataFromApp.length > 0 &&
            dataFromApp[0].Sensor1,
          dataFromApp.length > 0 &&
            dataFromApp[0].Sensor2,
          dataFromApp.length > 0 &&
            dataFromApp[0].Sensor3,
          dataFromApp.length > 0 &&
            dataFromApp[0].Sensor4,
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(75, 192, 192)",
          "rgb(255, 255, 0)",
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 255, 0, 0.5)",
        ],
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  const barOptions = {
    indexAxis: "x",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Peak Analysis",
        color: "white",
        font: {
          size: 15,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
          font: {
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            size: 10,
          },
        },
      },
    },
  };

  // for activity status 
  useEffect (() => {
    if (dataFromApp.length > 0) {
      const currentDate = new Date();
      const lastDataEntry = dataFromApp[0];

      if (lastDataEntry && lastDataEntry.createdAt) {
        const lastDataTime = new Date(lastDataEntry.createdAt);

        const timeDifference = currentDate.getTime() - lastDataTime.getTime();
        const differenceInMinutes = timeDifference / (1000 * 60);

        if (differenceInMinutes < 5) {
          setActiveStatus("Active");
        } else {
          setActiveStatus("Inactive");
        }
      } else {
        console.error("createdAt field is missing in the data");
      }
    }
  }, [dataFromApp])

  // report data
  const generateExcel = async() => {
    if(fromDate && toDate) {
      try {
        setReportLoading(true);
        const projectName = localStorage.getItem('projectNumber');
        const response = await axios.get(
        `http://34.93.162.58:4000/sensor/getDemokitUtmapsReport?fromDate=${fromDate}&toDate=${toDate}&projectName=${projectName}`
        // `http://localhost:4000/sensor/getDemokitUtmapsReport?fromDate=${fromDate}&toDate=${toDate}&projectName=${projectName}`
        );
        setReportLoading(false);
        setFromDate('');
        setToDate('');
        const ws = XLSX.utils.json_to_sheet(
          response.data.data.map(
            ({ _id, ProjectName, createdAt, updatedAt, __v, ...rest }) => ({
              ...rest,
              createdAt: new Date(createdAt).toLocaleString("en-GB"),
            })
          )
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const info = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(info, "Utmaps_Report.xlsx");
      } catch(error) {
        console.error("Error fetching data: ", error);
      }
    } else {
      alert("Date Range Required");
    }
  };

  const handleModelLimit = async(e) => {
    try {
      e.preventDefault();
      const projectNumber = localStorage.getItem("projectNumber");
      const response = await axios.post(
        "http://34.93.162.58:4000/sensor/updateDemokitUtmapsModelLimit",
        {
          projectNumber,
          modelLimitS1,
          modelLimitS2,
        }
      );
      if(response.status === 200) {
        console.log('Limit updated');
        setModelLimitS1('');
        setModelLimitS2("");
      } else {
        console.error('Failed to update model limit', response);
      }
    } catch (error) {
      console.error("Error updating model limit", error);
    };
  };
  
  return (
    <div
      className="xl:h-screen text-white p-2 flex flex-col gap-2 md:gap-0.5"
      style={{
        background: "radial-gradient(circle, #7e7e85 0%, #2c2c2c 50%)",
      }}
    >
      <div className="flex justify-between items-center gap-2 xl:h-[8%]">
        <img src={xymaLogo} alt="logo" className="max-h-10 2xl:max-h-16" />
        <div className="hidden md:block text-xl 2xl:text-2xl font-normal md:font-medium text-center">
          μTMapS - Multi-Point Temperature Mapping Sensor
        </div>
        <div className="md:hidden font-medium text-xl">μTMapS</div>
        <Link to="/">
          <button
            className=" py-1 pb-2 px-4 font-medium text-sm 2xl:text-lg rounded-md hover:scale-110 duration-200"
            style={{
              background: "linear-gradient(90deg, #f22213 0%, #f03f32 100%)",
            }}
          >
            Back
          </button>
        </Link>
      </div>

      <center className="md:hidden font-medium text-sm">
        Multi-Point Temperature Mapping Sensor
      </center>

      <div className="xl:h-[92%] flex flex-col-reverse xl:flex-row gap-4 xl:gap-2">
        {/* 3d model - left section */}
        <div className="flex flex-col gap-2 w-full xl:w-1/3">
          <div className="border border-white bg-white/5 rounded-md p-1 text-sm flex flex-col gap-2">
            <form
              className=" flex gap-4 items-center justify-between"
              onSubmit={handleModelLimit}
            >
              <div className="flex gap-2">
                <div>Indication Limit [S1]:</div>
                <div className="text-red-500 font-medium">
                  {modelLimitS1FromApp}
                  {selectedUnit === "C" && "°C"}
                  {selectedUnit === "F" && "°F"}
                  {selectedUnit === "K" && "K"}
                </div>
              </div>
              <div>-</div>
              <div className="flex gap-2 items-center">
                <div>Change S1 Limit:</div>
                <input
                  type="number"
                  required
                  value={modelLimitS1}
                  className="border border-white w-10 rounded-sm focus:outline-none text-gray-800"
                  onChange={(e) => setModelLimitS1(e.target.value)}
                />
                <button
                  className="bg-green-500 rounded-md text-lg py-0.5 px-2 hover:scale-110 duration-200"
                  data-tooltip-id="tooltip-style"
                  data-tooltip-content="Change Limit"
                >
                  <ImUpload3 />
                </button>
              </div>
            </form>

            <form
              className=" flex gap-4 items-center justify-between"
              onSubmit={handleModelLimit}
            >
              <div className="flex gap-2">
                <div>Indication Limit [S2]:</div>
                <div className="text-red-500 font-medium">
                  {modelLimitS2FromApp}
                  {selectedUnit === "C" && "°C"}
                  {selectedUnit === "F" && "°F"}
                  {selectedUnit === "K" && "K"}
                </div>
              </div>
              <div>-</div>
              <div className="flex gap-2 items-center">
                <div>Change S2 Limit:</div>
                <input
                  type="number"
                  required
                  value={modelLimitS2}
                  className="border border-white w-10 rounded-sm focus:outline-none text-gray-800"
                  onChange={(e) => setModelLimitS2(e.target.value)}
                />
                <button
                  className="bg-green-500 rounded-md text-lg py-0.5 px-2 hover:scale-110 duration-200"
                  data-tooltip-id="tooltip-style"
                  data-tooltip-content="Change Limit"
                >
                  <ImUpload3 />
                </button>
              </div>
            </form>
          </div>
          <div className="h-[300px] md:h-[500px] xl:h-full  flex justify-center items-center border border-white bg-white/5 rounded-md mb-4 xl:mb-0">
            <ThreeDModelUtmaps
              lastData={dataFromApp.length > 0 && dataFromApp[0]}
              updatedLimitS1={modelLimitS1FromApp}
              updatedLimitS2={modelLimitS2FromApp}
            />
          </div>
        </div>

        {/* right section */}
        <div className="w-full xl:w-2/3 flex flex-col gap-4 xl:gap-2">
          {/* right top */}
          <div className=" xl:h-[40%] flex flex-col xl:flex-row gap-4 xl:gap-2">
            {/* cards */}
            <div className="w-full xl:w-[50%] flex flex-col md:flex-row xl:flex-col gap-2">
              <div className="flex gap-2 h-1/2 md:w-1/2 md:h-auto xl:h-1/2 xl:w-auto">
                <div
                  className="rounded-md w-1/2 flex flex-col items-center justify-center gap-2 font-medium py-4 xl:py-0"
                  style={{
                    background:
                      "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <BsThermometerSun className="text-5xl 2xl:text-7xl" />
                    <div className="flex flex-col items-center text-base 2xl:text-2xl">
                      <div>Sensor 1</div>
                      <div
                        className={`text-2xl md:text-3xl 2xl:text-5xl  ${
                          dataFromApp.length > 0 &&
                          (dataFromApp[0].Sensor1 === "N/A" ||
                            dataFromApp[0].Sensor1 === "n/a")
                            ? "text-gray-400"
                            : dataFromApp.length > 0 &&
                              dataFromApp[0].Sensor1 >= modelLimitS1FromApp
                            ? "text-red-500"
                            : "text-green-400"
                        }`}
                      >
                        {parseFloat(
                          dataFromApp.length > 0 && dataFromApp[0].Sensor1
                        ).toFixed(1)}{" "}
                        {selectedUnit === "C" && "°C"}
                        {selectedUnit === "F" && "°F"}
                        {selectedUnit === "K" && "K"}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="rounded-md w-1/2 flex flex-col items-center justify-center gap-2 font-medium py-4 xl:py-0"
                  style={{
                    background:
                      "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <BsThermometerSun className="text-5xl 2xl:text-7xl" />
                    <div className="flex flex-col items-center text-base 2xl:text-2xl">
                      <div>Sensor 2</div>
                      <div
                        className={`text-2xl md:text-3xl 2xl:text-5xl  ${
                          dataFromApp.length > 0 &&
                          (dataFromApp[0].Sensor2 === "N/A" ||
                            dataFromApp[0].Sensor2 === "n/a")
                            ? "text-gray-400"
                            : dataFromApp.length > 0 &&
                              dataFromApp[0].Sensor2 >= modelLimitS2FromApp
                            ? "text-red-500"
                            : "text-green-400"
                        }`}
                      >
                        {parseFloat(
                          dataFromApp.length > 0 && dataFromApp[0].Sensor2
                        ).toFixed(1)}{" "}
                        {selectedUnit === "C" && "°C"}
                        {selectedUnit === "F" && "°F"}
                        {selectedUnit === "K" && "K"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 h-1/2 md:w-1/2 md:h-auto xl:h-1/2 xl:w-auto">
                <div
                  className="rounded-md w-1/2 flex flex-col items-center justify-center gap-2 font-medium py-4 xl:py-0"
                  style={{
                    background:
                      "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <BsThermometerSun className="text-5xl 2xl:text-7xl" />
                    <div className="flex flex-col items-center text-base 2xl:text-2xl">
                      <div>Sensor 3</div>
                      <div
                        className={`text-2xl md:text-3xl 2xl:text-5xl ${
                          (dataFromApp.length > 0 && dataFromApp[0].Sensor3) ===
                          ("N/A" || "n/a")
                            ? "text-gray-400"
                            : "text-green-400"
                        } `}
                      >
                        {dataFromApp.length > 0 && dataFromApp[0].Sensor3}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="rounded-md w-1/2 flex flex-col items-center justify-center gap-2 font-medium py-4 xl:py-0"
                  style={{
                    background:
                      "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <BsThermometerSun className="text-5xl 2xl:text-7xl" />
                    <div className="flex flex-col items-center text-base 2xl:text-2xl">
                      <div>Sensor 4</div>
                      <div
                        className={`text-2xl md:text-3xl 2xl:text-5xl ${
                          (dataFromApp.length > 0 && dataFromApp[0].Sensor3) ===
                          ("N/A" || "n/a")
                            ? "text-gray-400"
                            : "text-green-400"
                        } `}
                      >
                        {dataFromApp.length > 0 && dataFromApp[0].Sensor4}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-full xl:w-[50%] flex flex-col gap-2">
              <div className="xl:h-[25%] flex flex-col-reverse md:flex-row gap-2 font-medium 2xl:text-xl">
                {/* recent update */}
                <div className="w-full xl:w-[40%] border border-white rounded-md bg-white/5 flex flex-row md:flex-col items-center justify-center gap-2 px-2 py-2 xl:py-0 ">
                  <div className="flex items-center gap-2">
                    <MdManageHistory className="text-xl 2xl:text-3xl" />
                    <div>Last&nbsp;Update:</div>
                  </div>
                  <div className="text-sm 2xl:text-base font-normal">
                    {dataFromApp.length > 0 &&
                      new Date(dataFromApp[0].createdAt).toLocaleString(
                        "en-GB"
                      )}
                  </div>
                </div>

                <div className="w-full xl:w-[60%] flex gap-2">
                  {/* unit selection */}
                  <div className="xl:w-[80%] border border-white rounded-md bg-white/5 px-2 py-2 xl:py-0 flex flex-row md:flex-col items-center justify-center gap-1 text-sm md:text-base 2xl:text-lg">
                    <div className="flex gap-2 items-center">
                      <LiaRulerHorizontalSolid className="text-xl 2xl:text-3xl" />
                      <div>Unit&nbsp;preference</div>
                    </div>
                    <div className="text-base 2xl:text-lg font-normal flex gap-2 md:gap-4">
                      <div
                        className="flex gap-1"
                        data-tooltip-id="tooltip-style"
                        data-tooltip-content="Celsius"
                      >
                        <input
                          type="radio"
                          id="cel"
                          name="unit"
                          value="C"
                          className="cursor-pointer mt-0.5"
                          checked={selectedUnit === "C"}
                          onChange={handleUnitChange}
                        />
                        <label htmlFor="cel" className="cursor-pointer">
                          (°C)
                        </label>
                      </div>

                      <div
                        className="flex gap-1"
                        data-tooltip-id="tooltip-style"
                        data-tooltip-content="Fahrenheit"
                      >
                        <input
                          type="radio"
                          id="fah"
                          name="unit"
                          value="F"
                          className="cursor-pointer mt-0.5"
                          checked={selectedUnit === "F"}
                          onChange={handleUnitChange}
                        />
                        <label htmlFor="fah" className="cursor-pointer">
                          (°F)
                        </label>
                      </div>

                      <div
                        className="flex gap-1"
                        data-tooltip-id="tooltip-style"
                        data-tooltip-content="Kelvin"
                      >
                        <input
                          type="radio"
                          id="kel"
                          name="unit"
                          value="K"
                          className="cursor-pointer mt-0.5"
                          checked={selectedUnit === "K"}
                          onChange={handleUnitChange}
                        />
                        <label htmlFor="kel" className="cursor-pointer">
                          (K)
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* activity status */}
                  {activeStatus === "Active" ? (
                    <div
                      className="flex-1 xl:w-[20%] border border-white rounded-md bg-white/5 text-green-400 shadow-green-800 shadow-lg flex justify-center items-center"
                      data-tooltip-id="tooltip-style"
                      data-tooltip-content="Data is being recieved!"
                    >
                      <BsDatabaseFillCheck className="text-2xl md:text-3xl 2xl:text-5xl" />
                    </div>
                  ) : (
                    <div
                      className="flex-1 xl:w-[20%] border border-white rounded-md bg-white/5 text-red-400 shadow-red-800 shadow-lg flex justify-center items-center"
                      data-tooltip-id="tooltip-style"
                      data-tooltip-content="No data is being recieved for more than 5 minutes"
                    >
                      <MdSystemSecurityUpdateWarning className="text-2xl md:text-3xl 2xl:text-5xl" />
                    </div>
                  )}
                </div>
              </div>
              {/* table */}
              <div
                className="bg-white rounded-md h-[250px] md:h-[300px] xl:h-[75%] overflow-auto text-center"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "gray transparent",
                }}
              >
                <table className="w-full">
                  <thead
                    className="sticky top-0 text-white 2xl:text-xl"
                    style={{
                      background:
                        "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
                    }}
                  >
                    <tr>
                      <th className="px-2">S.No</th>
                      <th className="px-2">
                        S1{selectedUnit === "C" && "(°C)"}
                        {selectedUnit === "F" && "(°F)"}
                        {selectedUnit === "K" && "(K)"}
                      </th>
                      <th className="px-2">
                        S2{selectedUnit === "C" && "(°C)"}
                        {selectedUnit === "F" && "(°F)"}
                        {selectedUnit === "K" && "(K)"}
                      </th>
                      <th className="px-2">
                        S3{selectedUnit === "C" && "(°C)"}
                        {selectedUnit === "F" && "(°F)"}
                        {selectedUnit === "K" && "(K)"}
                      </th>
                      <th className="px-2">
                        S4{selectedUnit === "C" && "(°C)"}
                        {selectedUnit === "F" && "(°F)"}
                        {selectedUnit === "K" && "(K)"}
                      </th>
                      <th className="px-2">Updated&nbsp;At</th>
                    </tr>
                  </thead>

                  <tbody className="text-sm 2xl:text-base text-gray-600">
                    {dataFromApp.length > 0 &&
                      dataFromApp.map((data, index) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? "" : "bg-stone-200"}`}
                        >
                          <td className="border border-gray-400 ">
                            {index + 1}
                          </td>
                          <td className="border border-gray-400">
                            {data.Sensor1}
                          </td>
                          <td className="border border-gray-400 ">
                            {data.Sensor2}
                          </td>
                          <td className="border border-gray-400">
                            {data.Sensor3}
                          </td>
                          <td className="border border-gray-400 ">
                            {data.Sensor4}
                          </td>
                          <td className="text-[10px] border border-gray-400">
                            {new Date(data.createdAt).toLocaleString("en-GB")}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* right bottom */}
          <div className=" xl:h-[60%] rounded-md flex flex-col xl:flex-row gap-4 xl:gap-2">
            {/* line graph */}
            <div className="border border-white bg-white/5 rounded-md w-full xl:w-[70%] px-2 pb-2 h-[250px] md:h-[300px] lg:h-[400px] xl:h-full flex flex-col">
              <div className="flex items-start md:items-center gap-2 px-2 py-1 text-sm 2xl:text-lg font-medium">
                <div>Set&nbsp;Data&nbsp;Limit:</div>
                <div className="flex gap-2 flex-wrap">
                  <div className="flex items-center gap-0.5">
                    <input
                      type="radio"
                      id="option1"
                      name="options"
                      value={100}
                      checked={utmapsLineLimit === 100}
                      className="cursor-pointer"
                      onChange={handleLineLimit}
                    />
                    <label htmlFor="option1" className="cursor-pointer">
                      100&nbsp;Data
                    </label>
                  </div>

                  <div className="flex items-center gap-0.5">
                    <input
                      type="radio"
                      id="option2"
                      name="options"
                      value={500}
                      checked={utmapsLineLimit === 500}
                      className="cursor-pointer mt-0.5"
                      onChange={handleLineLimit}
                    />
                    <label htmlFor="option2" className="cursor-pointer">
                      500&nbsp;Data
                    </label>
                  </div>

                  <div className="flex items-center gap-0.5">
                    <input
                      type="radio"
                      id="option3"
                      name="options"
                      value={1000}
                      checked={utmapsLineLimit === 1000}
                      className="cursor-pointer mt-0.5"
                      onChange={handleLineLimit}
                    />
                    <label htmlFor="option3" className="cursor-pointer">
                      1000&nbsp;Data
                    </label>
                  </div>

                  <div className="flex items-center gap-0.5">
                    <input
                      type="radio"
                      id="option4"
                      name="options"
                      value={1500}
                      checked={utmapsLineLimit === 1500}
                      className="cursor-pointer mt-0.5"
                      onChange={handleLineLimit}
                    />
                    <label htmlFor="option4" className="cursor-pointer">
                      1500&nbsp;Data
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <Line data={lineData} options={lineOptions} width={"100%"} />
              </div>
            </div>

            <div className="rounded-md w-full xl:w-[30%] flex flex-col md:flex-row xl:flex-col gap-4 md:gap-2">
              {/* bar chart */}
              <div className="h-[250px] md:h-[300px] md:w-[65%] xl:w-full xl:h-[60%] border border-white rounded-md bg-white/5 px-2 pb-2">
                <Bar data={barData} options={barOptions} height={"100%"} />
              </div>

              {/* report */}
              <div className="relative xl:h-[40%] md:w-[35%] xl:w-full border border-white bg-white/5 rounded-md text-sm 2xl:text-lg px-2 py-6 md:py-1 flex flex-col gap-2">
                <center className="font-medium">Report Analysis</center>

                <div className="flex md:flex-col xl:flex-row justify-center items-center gap-2 text-xs h-1/2">
                  <div className="flex flex-col gap-1">
                    <label>From</label>
                    <input
                      type="date"
                      className="text-black rounded-md p-1 px-0.5 2xl:p-2"
                      required
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>To</label>
                    <input
                      type="date"
                      className="text-black rounded-md p-1 px-0.5 2xl:p-2"
                      required
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex md:flex-col xl:flex-row gap-2 justify-center items-center h-1/2">
                  {/* <button
                    className="rounded-md bg-red-500 hover:scale-105 duration-200 py-1 px-2 md:w-28 xl:w-auto 2xl:py-2 2xl:px-4"
                    onClick={generatePdf}
                  >
                    PDF
                  </button> */}
                  <button
                    className="rounded-md bg-green-500 hover:scale-105 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 md:w-28 xl:w-auto flex items-center gap-1"
                    onClick={generateExcel}
                  >
                    <FaFileDownload className="text-lg 2xl:text-xl" />
                    Download Excel
                  </button>
                </div>
                {reportLoading && (
                  <div className="absolute inset-0 rounded-md bg-black/70 flex flex-col justify-center items-center font-semibold text-sm">
                    <div>Your report is being downloaded!</div>
                    <img src={loadingGif} className='max-w-[40px]' /> 
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip
        id="tooltip-style"
        style={{
          backgroundColor: "white",
          color: "#4B5563",
          fontSize: "0.75rem",
        }}
      />
    </div>
  );
};

export default DemokitUtmaps
