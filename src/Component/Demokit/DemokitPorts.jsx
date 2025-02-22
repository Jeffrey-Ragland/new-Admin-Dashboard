import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect,useMemo } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import xymaLogo from "../Assets/xyma - Copy.png";
import xymaImg from "../Assets/xyma.png";
import coverImg from "../Assets/pdfcover.jpg";
import sensorPage from "../Assets/utmapsPage.jpg";
import disclaimerPage from "../Assets/disclaimerPage.jpg";
import loadingGif from '../Assets/loading.gif';
import { BsThermometerSun, BsDropletHalf } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import { HiMiniBeaker } from "react-icons/hi2";
import { MdManageHistory, MdOutlineCloudDone } from "react-icons/md";
import { PiCloudWarningBold } from "react-icons/pi";
import ThreeDModelPorts from "./ThreeDModelPorts";
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

const DemokitPorts = (dataFromApp) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportLoading, setReportLoading] = useState(false);

  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [],
  });

  console.log("ports data from app", dataFromApp);

  const getInitialLimit = () => {
    const storedLimit = localStorage.getItem("PortsLimit");
    return storedLimit ? parseInt(storedLimit) : 100;
  };

  const [portsLineLimit, setPortsLineLimit] = useState(getInitialLimit);

  const handleLineLimit = (e) => {
    const limit = parseInt(e.target.value);
    setPortsLineLimit(limit);
    localStorage.setItem("PortsLimit", limit.toString());
  };

  // line chart data
  useEffect(() => {
    if (
      Array.isArray(dataFromApp.dataFromApp) &&
      dataFromApp.dataFromApp.length > 0
    ) {
      const reversedData = [...dataFromApp.dataFromApp].reverse();

      const lineLabels = reversedData.map((item) => {
        const createdAt = new Date(item.createdAt).toLocaleString("en-GB");
        return createdAt;
      });
      const temperatureData = reversedData.map((item) => item.Temperature);
      const densityData = reversedData.map((item) => item.Density);
      const viscosityData = reversedData.map((item) => item.Viscosity);

      setLineData({
        labels: lineLabels,
        datasets: [
          {
            label: "Temperature",
            data: temperatureData,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
          {
            label: "Density",
            data: densityData,
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
          },
          {
            label: "Viscosity",
            data: viscosityData,
            borderColor: "rgb(255, 255, 0)",
            backgroundColor: "rgba(255, 255, 0, 0.2)",
          },
        ],
      });
    }
  }, [dataFromApp]);

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

  // bar chart data
  const barData = {
    labels: ["Temperature", "Density", "Viscosity"],
    datasets: [
      {
        data: [
          dataFromApp.dataFromApp.length > 0 &&
            dataFromApp.dataFromApp[0].Temperature,
          dataFromApp.dataFromApp.length > 0 &&
            dataFromApp.dataFromApp[0].Density,
          dataFromApp.dataFromApp.length > 0 &&
            dataFromApp.dataFromApp[0].Viscosity,
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 255, 0)",
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
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
  useEffect(() => {
    if (dataFromApp.dataFromApp.length > 0) {
      const currentDate = new Date();
      const lastDataEntry = dataFromApp.dataFromApp[0];

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
        setActiveStatus("Inactive");
      }
    }
  }, [dataFromApp]);

  // report data
  // useEffect(() => {
  //   handleReportData();
  // }, [fromDate, toDate]);

 

  // to generate report pdf
  // const generatePdf = () => {
  //   const doc = new jsPDF();
  //   const logo = xymaImg;
  //   const cover = coverImg;
  //   const desc = sensorPage;
  //   const disclaimer = disclaimerPage;

  //   // cover img
  //   doc.addImage(cover, "JPG", 0, 0, 210, 297);
  //   doc.addPage();

  //   //logo
  //   doc.addImage(logo, "PNG", 10, 10, 40, 20);

  //   //sensor description
  //   doc.addImage(desc, "PNG", 0, 40, 220, 250);
  //   doc.addPage();

  //   //logo
  //   doc.addImage(logo, "PNG", 10, 10, 40, 20);

  //   if (filteredReportData && filteredReportData.length > 0) {
  //     // table
  //     doc.autoTable({
  //       head: [["S.No", "Temperature", "Density", "Viscosity", "Updated At"]],
  //       body: filteredReportData.map(
  //         ({ Temperature, Density, Viscosity, createdAt }, index) => [
  //           index + 1,
  //           Temperature,
  //           Density,
  //           Viscosity,
  //           new Date(createdAt).toLocaleString("en-GB"),
  //         ]
  //       ),
  //       startY: 40,
  //       headerStyles: {
  //         fillColor: [222, 121, 13],
  //       },
  //     });
  //   }

  //   doc.addPage();

  //   //logo
  //   doc.addImage(logo, "PNG", 10, 10, 40, 20);

  //   //disclaimer
  //   doc.addImage(disclaimer, "PNG", 0, 50, 210, 250);

  //   //  doc.save("sensor_adminData.pdf");
  //   const blob = doc.output("blob");

  //   const url = URL.createObjectURL(blob);
  //   window.open(url, "_blank");
  // };

  // to generate report excel
  const generateExcel = async () => {
    if(fromDate && toDate) {
    try {
      setReportLoading(true);
      const projectName = localStorage.getItem("projectNumber");
      const response = await axios.get(
        `http://34.93.162.58:4000/sensor/getDemokitPortsReport?fromDate=${fromDate}&toDate=${toDate}&projectName=${projectName}`
      );
      // setFilteredReportData(response.data.data);
      console.log("report data", response.data.data);
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
      saveAs(info, "Ports_Report.xlsx");
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  } else {
    alert("Date Range Required");
  }
    
  };

  return (
    <div
      className="xl:h-screen text-white p-2 flex flex-col gap-2 md:gap-0.5"
      style={{
        background: "radial-gradient(circle, #7e7e85 0%, #2c2c2c 50%)",
      }}
    >
      <div className="flex justify-between items-center gap-2 xl:h-[8%]">
        <img src={xymaLogo} alt="logo" className="max-h-10 2xl:max-h-12" />
        <div className="hidden md:block text-xl 2xl:text-2xl font-normal md:font-medium text-center">
          PoRTS - Multi-Parameter Measurement Sensor
        </div>
        <div className="md:hidden font-medium text-xl">PoRTS</div>
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
        Multi-Parameter Measurement Sensor
      </center>

      <div className="xl:h-[92%] flex flex-col-reverse xl:flex-row gap-4 xl:gap-2">
        {/* 3d model - left section */}
        <div className="h-[300px] md:h-[500px] xl:h-auto w-full xl:w-1/3 flex justify-center items-center border border-white bg-white/5 rounded-md mb-4 xl:mb-0">
          <ThreeDModelPorts />
        </div>

        {/* right section */}
        <div className="w-full xl:w-2/3 flex flex-col gap-4 xl:gap-2">
          {/* right top */}
          <div className=" xl:h-[40%] flex flex-col xl:flex-row gap-4 xl:gap-2">
            {/* cards */}
            <div className="w-full xl:w-[50%] flex flex-row gap-2">
              <div
                className="rounded-md w-1/2 md:w-1/3 xl:w-1/2 flex items-center justify-center gap-2 font-medium py-4 xl:py-0"
                style={{
                  background:
                    "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
                }}
              >
                <BsThermometerSun className="text-6xl xl:text-7xl 2xl:text-8xl" />
                <div className="flex flex-col text-base 2xl:text-2xl">
                  <div>Temperature</div>
                  <div className="text-2xl md:text-3xl 2xl:text-5xl text-green-400">
                    {dataFromApp.dataFromApp.length > 0 &&
                      dataFromApp.dataFromApp[0].Temperature+"℃"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row xl:flex-col gap-2 w-1/2 md:w-2/3 xl:w-1/2">
                <div
                  className="rounded-md h-1/2 md:h-auto xl:h-1/2 md:w-1/2 xl:w-auto flex flex-col items-center justify-center gap-2 font-medium py-4 xl:py-0"
                  style={{
                    background:
                      "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <HiMiniBeaker className="text-5xl 2xl:text-7xl" />
                    <div className="flex flex-col text-base 2xl:text-2xl">
                      <div>Density</div>
                      <div className="text-2xl md:text-3xl 2xl:text-5xl text-green-400">
                        {dataFromApp.dataFromApp.length > 0 &&
                          dataFromApp.dataFromApp[0].Density+" kg/m³"}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="rounded-md h-1/2 md:h-auto xl:h-1/2 md:w-1/2 xl:w-auto flex flex-col items-center justify-center gap-2 font-medium py-4 xl:py-0"
                  style={{
                    background:
                      "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <BsDropletHalf className="text-5xl 2xl:text-7xl" />
                    <div className="flex flex-col text-base 2xl:text-2xl">
                      <div>Viscosity</div>
                      <div className="text-2xl md:text-3xl 2xl:text-5xl text-green-400">
                        {dataFromApp.dataFromApp.length > 0 &&
                          dataFromApp.dataFromApp[0].Viscosity+ " cP"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-full xl:w-[50%] flex flex-col gap-2">
              {/* recent update and activity status */}
              <div className="h-[15%] flex gap-2 font-medium 2xl:text-xl">
                <div className="w-1/2 xl:w-[75%] border border-white rounded-md bg-white/5 flex flex-col xl:flex-row items-center gap-2 px-2 py-2 xl:py-0">
                  <div className="flex gap-2">
                    <MdManageHistory className="text-xl 2xl:text-3xl" />
                    <div>Last&nbsp;Update:</div>
                  </div>
                  <div className="text-sm 2xl:text-base font-normal">
                    {dataFromApp.dataFromApp.length > 0 &&
                      new Date(
                        dataFromApp.dataFromApp[0].createdAt
                      ).toLocaleString("en-GB")}
                  </div>
                </div>
                <div
                  className={`w-1/2 xl:w-[25%] border border-white rounded-md bg-white/5 ${
                    activeStatus === "Active"
                      ? "text-green-400 shadow-green-800"
                      : "text-red-400 shadow-red-800"
                  }  shadow-lg  flex justify-center items-center px-2 gap-2`}
                >
                  {activeStatus === "Active" ? (
                    <MdOutlineCloudDone className="text-xl 2xl:text-3xl" />
                  ) : (
                    <PiCloudWarningBold className="text-xl 2xl:text-3xl" />
                  )}
                  {activeStatus}
                </div>
              </div>
              {/* table */}
              <div
                className="bg-white rounded-md h-[250px] md:h-[300px] xl:h-[85%] overflow-auto text-center"
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
                      <th className="px-2">Temp.</th>
                      <th className="px-2">Density</th>
                      <th className="px-2">Viscosity</th>
                      <th className="px-2">Updated&nbsp;At</th>
                    </tr>
                  </thead>

                  <tbody className="text-sm 2xl:text-base text-gray-600">
                    {dataFromApp.dataFromApp.length > 0 &&
                      dataFromApp.dataFromApp.map((data, index) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? "" : "bg-stone-200"}`}
                        >
                          <td className="border border-gray-400 ">
                            {index + 1}
                          </td>
                          <td className="border border-gray-400">
                            {data.Temperature}
                          </td>
                          <td className="border border-gray-400 ">
                            {data.Density}
                          </td>
                          <td className="border border-gray-400">
                            {data.Viscosity}
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
              <div>
                <center className="font-medium">
                  Multi-Parameter Measurement
                </center>
                <div className="flex items-center px-2 py-1 text-sm font-medium">
                  <div className="mr-2">Set Limit:</div>
                  <input
                    type="radio"
                    id="option1"
                    name="options"
                    value={100}
                    checked={portsLineLimit === 100}
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
                    checked={portsLineLimit === 500}
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
                    checked={portsLineLimit === 1000}
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
                    checked={portsLineLimit === 1500}
                    className="cursor-pointer mt-0.5"
                    onChange={handleLineLimit}
                  />
                  <label htmlFor="option4" className="mr-2 cursor-pointer">
                    1500
                  </label>
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
              <div className="relative h-[200px] md:h-auto xl:h-[40%] md:w-[35%] xl:w-full border border-white bg-white/5 rounded-md text-sm 2xl:text-lg px-2 py-1 flex flex-col">
                <center className="font-medium">Report Generation</center>

                <div className="flex md:flex-col xl:flex-row justify-center items-center gap-2 text-xs h-1/2">
                  <div className="flex flex-col gap-1">
                    <label>From</label>
                    <input
                      type="date"
                      className="text-black rounded-md px-0.5 2xl:p-2"
                      required
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>To</label>
                    <input
                      type="date"
                      className="text-black rounded-md px-0.5 2xl:p-2"
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
                    className="rounded-md bg-green-500 hover:scale-105 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-1"
                    onClick={generateExcel}
                  >
                    <FaFileDownload className="text-lg 2xl:text-xl" />
                    Download&nbsp;Excel
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
    </div>
  );
}

export default DemokitPorts
