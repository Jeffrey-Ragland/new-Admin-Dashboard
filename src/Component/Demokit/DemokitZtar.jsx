import React from "react";
import { Link } from "react-router-dom";
import xymaLogo from "../Assets/xyma - Copy.png";
import { MdManageHistory } from "react-icons/md";
import { PiCloudWarningBold } from "react-icons/pi";
import { BiWater } from "react-icons/bi";
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

const DemokitZtar = () => {
  // line chart data
  const lineData = {
    labels: ["S1", "S2", "S3"],
    datasets: [
      {
        label: "S1",
        data: [60, 40, 80, 20],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "S2",
        data: [20, 70, 30, 40],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "S3",
        data: [10, 50, 90, 100],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: {
            size: 10,
          },
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

  // bar chart data
  const barData = {
    labels: ["S1"],
    datasets: [
      {
        label: "Temperature Data",
        data: [73],
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)",
        ],
        borderWidth: 1,
        barPercentage: 0.25,
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
        position: "top",
        labels: {
          color: "white",
          font: {
            size: 10,
          },
        },
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
          Ztar - Ultrasonic level measurement sensor
        </div>
        <div className="md:hidden font-medium text-xl">Ztar</div>
        <Link to="/">
          <button
            className=" py-1 pb-2 px-4 font-medium text-sm 2xl:text-lg rounded-md hover:scale-110 duration-200"
            style={{
              background: "linear-gradient(90deg, #f22213 0%, #f03f32 100%)",
            }}
            onClick={() => {
              localStorage.clear();
            }}
          >
            Back
          </button>
        </Link>
      </div>

      <center className="md:hidden font-medium text-sm">
        Ultrasonic level measurement sensor
      </center>

      <div className="xl:h-[92%] flex flex-col-reverse xl:flex-row gap-4 xl:gap-2">
        {/* 3d model - left section */}
        <div className="h-[300px] md:h-[500px] xl:h-auto w-full xl:w-1/3 flex justify-center items-center border border-white bg-white/5 rounded-md mb-4 xl:mb-0">
          3d model
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
                <BiWater className="text-6xl xl:text-7xl 2xl:text-8xl" />
                <div className="flex flex-col text-base 2xl:text-2xl">
                  <div>Liquid Level</div>
                  <div>255 mm</div>
                </div>
              </div>

              {/* recent update and activity status */}
              <div className="flex flex-col md:flex-row xl:flex-col gap-2 w-1/2 md:w-2/3 xl:w-1/2  2xl:text-xl">
                <div className="rounded-md h-1/2 md:h-auto xl:h-1/2 md:w-1/2 xl:w-auto flex flex-col items-center justify-center gap-2 font-medium py-4 xl:py-0 border border-white bg-white/5">
                  <div className="flex items-center gap-2">
                    <MdManageHistory className="text-3xl 2xl:text-5xl" />
                    <div>Last Update:</div>
                  </div>
                  <div className="text-sm 2xl:text-base font-normal">
                    02/04/2024 02:55 pm
                  </div>
                </div>

                <div className="rounded-md h-1/2 md:h-auto xl:h-1/2 md:w-1/2 xl:w-auto flex  items-center justify-center gap-2 font-medium py-4 xl:py-0 border border-white bg-white/5 text-red-400 shadow-md shadow-red-800">
                  <PiCloudWarningBold className="text-3xl 2xl:text-5xl" />
                  Inactive
                </div>
              </div>
            </div>

            {/* table */}
            <div
              className=" w-full xl:w-[50%] rounded-md h-[250px] md:h-[300px] xl:h-auto overflow-auto text-center bg-white"
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
                    <th className="px-2">Level</th>
                    <th className="px-2">Updated&nbsp;At</th>
                  </tr>
                </thead>

                <tbody className="text-sm 2xl:text-base text-gray-600">
                  <tr>
                    <td>1</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>3</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>4</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>5</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>6</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>7</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>8</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>9</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>10</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>11</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>12</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>13</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>14</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>15</td>
                    <td>20</td>
                    <td>2:55 pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* right bottom */}
          <div className=" xl:h-[60%] rounded-md flex flex-col xl:flex-row gap-4 xl:gap-2">
            {/* line graph */}
            <div className="border border-white bg-white/5 rounded-md w-full xl:w-[70%] px-2 pb-2 h-[250px] md:h-[300px] lg:h-[400px] xl:h-full flex flex-col">
              <div>
                <center className="font-medium">
                  Sensor Temperature Measurement
                </center>
                <div className="flex items-center px-2 py-1 text-sm font-medium">
                  <div className="mr-2">Set Limit:</div>
                  <input
                    type="radio"
                    id="option1"
                    name="options"
                    value={100}
                    // checked={ioclLineLimit === 100}
                    defaultChecked
                    className="cursor-pointer mt-0.5"
                    // onChange={handleLineLimit}
                  />
                  <label htmlFor="option1" className="mr-2 cursor-pointer">
                    100
                  </label>
                  <input
                    type="radio"
                    id="option2"
                    name="options"
                    value={500}
                    // checked={ioclLineLimit === 500}
                    className="cursor-pointer mt-0.5"
                    // onChange={handleLineLimit}
                  />
                  <label htmlFor="option2" className="mr-2 cursor-pointer">
                    500
                  </label>
                  <input
                    type="radio"
                    id="option3"
                    name="options"
                    value={1000}
                    // checked={ioclLineLimit === 1000}
                    className="cursor-pointer mt-0.5"
                    // onChange={handleLineLimit}
                  />
                  <label htmlFor="option3" className="mr-2 cursor-pointer">
                    1000
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
              <div className="h-[200px] md:h-auto xl:h-[40%] md:w-[35%] xl:w-full border border-white bg-white/5 rounded-md text-sm 2xl:text-lg px-2 py-1 flex flex-col">
                <center className="font-medium">Report Generation</center>

                <div className="flex md:flex-col xl:flex-row justify-center items-center gap-2 text-xs h-1/2">
                  <div className="flex flex-col gap-1">
                    <label>From</label>
                    <input
                      type="date"
                      placeholder="From"
                      className="text-black rounded-md px-0.5 2xl:p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>To</label>
                    <input
                      type="date"
                      placeholder="To"
                      className="text-black rounded-md px-0.5 2xl:p-2"
                    />
                  </div>
                </div>

                <div className="flex md:flex-col xl:flex-row gap-2 justify-center items-center h-1/2">
                  <button className="rounded-md bg-red-500 hover:scale-105 duration-200 py-1 px-2 md:w-28 xl:w-auto 2xl:py-2 2xl:px-4">
                    PDF
                  </button>
                  <button className="rounded-md bg-green-500 hover:scale-105 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 md:w-28 xl:w-auto">
                    Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemokitZtar
