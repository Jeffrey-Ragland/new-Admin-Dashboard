import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import IoclSidebar from './IoclSidebar';
import {
  Chart as ChartJS,
  BarElement, 
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  scales
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { LiaChartLineSolid } from "react-icons/lia";
import { BsThermometerHalf } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import ioclLogo from "../Assets/ioclRound.png";
import xymaLogo from '../Assets/xyma.png';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const IoclMainPage = (dataFromApp) => {

  const [lineData, setLineData] = useState({
    labels:[],
    datasets: []
  });

  const getInitialLimit = () => {
    const storedLimit = localStorage.getItem("IOCLLimit");
    return storedLimit ? parseInt(storedLimit) : 100;
  };

  const [ioclLineLimit, setIoclLineLimit] = useState(getInitialLimit);
  
  const handleLineLimit = (e) => {
    const limit = parseInt(e.target.value);
    setIoclLineLimit(limit);
    localStorage.setItem("IOCLLimit", limit.toString());
  };

  
  useEffect(() => {
    console.log("data from app file", dataFromApp.dataFromApp);
    if (
      Array.isArray(dataFromApp.dataFromApp) &&
      dataFromApp.dataFromApp.length > 0
    ) {
      const reversedData = [...dataFromApp.dataFromApp].reverse();

      const lineLabels = reversedData.map((item) => {
        const createdAt = new Date(item.createdAt).toLocaleString('en-GB');
        return createdAt;
       });
      const sensor1Data = reversedData.map((item) => item.Sensor1);
      const sensor2Data = reversedData.map((item) => item.Sensor2);
      const sensor3Data = reversedData.map((item) => item.Sensor3);

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
        ],
      });
    }
  }, [dataFromApp]);

  console.log('line data',lineData);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "left",
      },
      title: {
        display: true,
        text: "Sensor Temperature Measurement",
      },
    },
      scales: {
        x: {
          ticks: {
            font: {
              size: 6
            }
          }
        }
      }
  };

  // bar chart data
  const barData = {
    labels: ["S1", "S2", "S3"],
    datasets: [
      {
        label: "Temperature Data",
        data: [73, 87, 56],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1
      },
    ],
  };

   const barOptions = {
     indexAxis: "x",
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
       legend: {
         position: "top",
       },
       title: {
         display: true,
         text: "Peak Analysis",
       },
     },
   };


  return (
    <div
      className="flex md:h-screen text-sm md:text-base 2xl:text-2xl"
      style={{
        background: "linear-gradient(180deg, #cdd3de 0%, #8b92b1 100%)",
      }}
    >
      {/* sidebar */}
      <div className="lg:w-[20%] xl:w-[15%] h-full">
        <IoclSidebar />
      </div>

      {/* main content */}
      <div className="w-full lg:w-[80%] xl:w-[85%]  p-4 h-full">
        {/* header */}
        <div className="flex justify-between items-center md:h-[5%] px-2 mb-2">
          {/* logo for mobile and tab view */}
          <div className="flex gap-2 md:hidden">
            <img src={ioclLogo} alt="iocl" className="max-h-8" />
            <img src={xymaLogo} alt="xyma" className="max-h-8" />
          </div>
          <div className="font-semibold text-[#08174e]">IOCL Dashboard</div>
          <Link to="/login" className="hover:scale-110 duration-200">
            <span
              className=" py-1 px-2 2xl:py-2 2xl:px-4 text-white font-medium text-sm 2xl:text-lg rounded-md "
              style={{
                background: "linear-gradient(90deg, #f22213 0%, #f03f32 100%)",
              }}
              onClick={() => {
                localStorage.clear();
              }}
            >
              Logout
            </span>
          </Link>
        </div>

        {/* content */}
        <div className="xl:flex md:h-[95%]  ">
          {/* cards */}
          <div className="w-full xl:w-[20%] md:h-[20%] xl:h-auto flex flex-col gap-2 p-2 text-white font-medium">
            <div className="h-1/2 flex flex-col md:flex-row xl:flex-col gap-2">
              <div
                className="xl:h-1/2 md:w-1/2 xl:w-auto rounded-md 2xl:rounded-xl p-4 flex justify-center items-center"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                }}
              >
                <BsThermometerHalf size={35} className="md:hidden" />
                <BsThermometerHalf
                  size={45}
                  className="hidden md:block 2xl:hidden"
                />
                <BsThermometerHalf size={65} className="hidden 2xl:block" />
                <div className="flex gap-2 md:flex-col md:gap-0">
                  <div>Sensor 1:</div>
                  <div>
                    {dataFromApp.dataFromApp.length > 0 &&
                      dataFromApp.dataFromApp[0].Sensor1}{" "}
                    °C
                  </div>
                </div>
              </div>
              <div
                className="xl:h-1/2 md:w-1/2 xl:w-auto rounded-md 2xl:rounded-xl p-4 flex justify-center items-center"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                }}
              >
                <BsThermometerHalf size={35} className="md:hidden" />
                <BsThermometerHalf
                  size={45}
                  className="hidden md:block 2xl:hidden"
                />
                <BsThermometerHalf size={65} className="hidden 2xl:block" />
                <div className="flex gap-2 md:flex-col md:gap-0">
                  <div>Sensor 2:</div>
                  <div>
                    {dataFromApp.dataFromApp.length > 0 &&
                      dataFromApp.dataFromApp[0].Sensor1}{" "}
                    °C
                  </div>
                </div>
              </div>
            </div>
            <div className="h-1/2 flex flex-col md:flex-row xl:flex-col gap-2">
              <div
                className="xl:h-1/2 md:w-1/2 xl:w-auto rounded-md 2xl:rounded-xl p-4 flex justify-center items-center"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                }}
              >
                <BsThermometerHalf size={35} className="md:hidden" />
                <BsThermometerHalf
                  size={45}
                  className="hidden md:block 2xl:hidden"
                />
                <BsThermometerHalf size={65} className="hidden 2xl:block" />
                <div className="flex gap-2 md:flex-col md:gap-0">
                  <div>Sensor 3:</div>
                  <div>
                    {dataFromApp.dataFromApp.length > 0 &&
                      dataFromApp.dataFromApp[0].Sensor1}{" "}
                    °C
                  </div>
                </div>
              </div>
              <div
                className="xl:h-1/2 md:w-1/2 xl:w-auto rounded-md 2xl:rounded-xl p-4 flex md:flex-col gap-2 md:gap-1 justify-center items-center"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                }}
              >
                <div className="flex items-center gap-2">
                  <FaHistory size={25} className="2xl:hidden" />
                  <FaHistory size={35} className="hidden 2xl:block" />
                  <div>Last Update:</div>
                </div>
                <div>
                  {dataFromApp.dataFromApp.length > 0 &&
                    new Date(
                      dataFromApp.dataFromApp[0].createdAt
                    ).toLocaleString("en-GB")}
                </div>
              </div>
            </div>
          </div>

          {/* graphs and table */}
          <div className="w-full xl:w-[80%] md:h-[80%] xl:h-auto  p-2 flex flex-col gap-2">
            {/* line graph */}
            <div
              className="md:h-[50%] lg:h-[60%] bg-white flex flex-col rounded-md overflow-x-auto overflow-y-hidden"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#08174e transparent",
              }}
            >
              <div className="flex justify-between">
                <div
                  className="py-1 px-2 2xl:py-2 2xl:px-4 flex flex-1 text-white rounded-tl-md font-medium"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                  }}
                >
                  Line Representation of Temperature
                </div>
                <div
                  className=" py-1 px-2 2xl:py-2 2xl:px-4 flex justify-center items-center text-[#08174e] rounded-tr-md"
                  style={{
                    background:
                      "linear-gradient(90deg, #f47424 0%, #f58a47 100%)",
                  }}
                >
                  <LiaChartLineSolid size={20} />
                </div>
              </div>

              <div className="flex items-center px-2 py-1 text-sm font-medium">
                <div className="mr-2">Set Limit:</div>
                <input
                  type="radio"
                  id="option1"
                  name="options"
                  value={100}
                  checked={ioclLineLimit === 100}
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
                  checked={ioclLineLimit === 500}
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
                  checked={ioclLineLimit === 1000}
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
                  checked={ioclLineLimit === 1500}
                  className="cursor-pointer mt-0.5"
                  onChange={handleLineLimit}
                />
                <label htmlFor="option4" className="mr-2 cursor-pointer">
                  1500
                </label>
                <input
                  type="radio"
                  id="option5"
                  name="options"
                  value={2000}
                  checked={ioclLineLimit === 2000}
                  className="cursor-pointer mt-0.5"
                  onChange={handleLineLimit}
                />
                <label htmlFor="option5" className="mr-2 cursor-pointer">
                  2000
                </label>
              </div>

              <div className="flex flex-1 rounded-b-md px-2 w-[20000px]">
                <Line data={lineData} options={lineOptions} width={"100%"} />
              </div>
            </div>

            <div className="md:h-[50%] lg:md:h-[40%] flex flex-col-reverse md:flex-row gap-2 ">
              {/* table */}
              <div
                className="w-full md:w-1/2 h-60 md:h-auto bg-white overflow-auto rounded-md mb-[6vh] md:mb-[8vh] lg:mb-0"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#08174e transparent",
                }}
              >
                <table className=" w-full text-center">
                  <thead
                    className="sticky top-0 text-white"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                    }}
                  >
                    <tr className="">
                      <th className="w-1/5 p-1 2xl:p-2">S.No</th>
                      <th className="w-1/5 p-1 2xl:p-2">Sensor&nbsp;1</th>
                      <th className="w-1/5 p-1 2xl:p-2">Sensor&nbsp;2</th>
                      <th className="w-1/5 p-1 2xl:p-2">Sensor&nbsp;3</th>
                      <th className="w-1/5 p-1 2xl:p-2">Last&nbsp;Updated</th>
                    </tr>
                  </thead>

                  <tbody className="text-xs md:text-sm text-gray-600">
                    {dataFromApp.dataFromApp.length > 0 &&
                      dataFromApp.dataFromApp.map((data, index) => (
                        <tr>
                          <td className="border border-black ">{index + 1}</td>
                          <td className="border border-black ">
                            {data.Sensor1}
                          </td>
                          <td className="border border-black ">
                            {data.Sensor2}
                          </td>
                          <td className="border border-black ">
                            {data.Sensor3}
                          </td>
                          <td className="text-[10px] border border-black ">
                            {new Date(data.createdAt).toLocaleString("en-GB")}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full md:w-1/2 flex flex-col  bg-white rounded-md md:mb-[8vh] lg:mb-0">
                <div
                  className="py-1 px-2 2xl:py-2 2xl:px-4 text-white rounded-t-md font-medium"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                  }}
                >
                  Peak Analysis
                </div>
                <div className="flex flex-1 px-2">
                  <Bar data={barData} options={barOptions} height={"100%"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IoclMainPage
   