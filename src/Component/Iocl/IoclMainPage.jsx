import React from 'react'
import { Link } from 'react-router-dom';
import IoclSidebar from './IoclSidebar';
import {
  Chart as ChartJS,
  BarElement, 
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { LiaChartLineSolid } from "react-icons/lia";
import ioclLogo from "../Assets/ioclRound.png";
import xymaLogo from '../Assets/xyma.png';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const IoclMainPage = () => {

  // line chart data
  const lineData = {
    labels: ["10", "20", "30", "40","50"],
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Dataset 2",
        data: [45, 49, 60, 71, 46],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Dataset 3",
        data: [35, 39, 50, 61, 36],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sensor Temperature Measurement",
      },
    },
  };

  // bar chart data
  const barData = {
    labels: ["Sensor 1", "Sensor 2", "Sensor 3"],
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
      },
    ],
  };

   const barOptions = {
     indexAxis: "y",
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
    <div className="flex md:h-screen text-sm md:text-base 2xl:text-2xl">
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
          <div className="font-semibold">IOCL Dashboard</div>
          <Link to="/login">
            <span
              className=" py-1 px-2 text-white font-medium text-sm rounded-md"
              style={{
                background: "linear-gradient(90deg, #f22213 0%, #f03f32 100%)",
              }}
              onClick={() => {
                localStorage.removeItem("Project");
                localStorage.removeItem("token");
                localStorage.removeItem("Controles");
              }}
            >
              Logout
            </span>
          </Link>
        </div>

        {/* content */}
        <div className="xl:flex md:h-[95%]  ">
          {/* cards */}
          <div className="w-full xl:w-[20%] md:h-[20%] xl:h-auto flex flex-col gap-2 p-2 text-white">
            <div className="h-1/2 flex flex-col md:flex-row xl:flex-col gap-2">
              <div
                className="xl:h-1/2 md:w-1/2 xl:w-auto rounded-md p-4"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                }}
              >
                Sensor 1
              </div>
              <div
                className="xl:h-1/2 md:w-1/2 xl:w-auto rounded-md p-4"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                }}
              >
                Sensor 2
              </div>
            </div>
            <div className="h-1/2 flex flex-col md:flex-row xl:flex-col gap-2">
              <div
                className="xl:h-1/2 md:w-1/2 xl:w-auto rounded-md p-4"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                }}
              >
                Sensor 3
              </div>
              <div
                className="xl:h-1/2 md:w-1/2 xl:w-auto rounded-md p-4"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                }}
              >
                Last Update
              </div>
            </div>
          </div>

          {/* graphs and table */}
          <div className="w-full xl:w-[80%] md:h-[80%] xl:h-auto  p-2 flex flex-col gap-2">
            {/* line graph */}
            <div className="md:h-[50%] lg:h-[60%] bg-white flex flex-col rounded-md">
              <div className="flex justify-between">
                <div
                  className="py-1 px-2 flex flex-1 text-white rounded-tl-md"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                  }}
                >
                  Line Representation of Temperature
                </div>
                <div
                  className=" py-1 px-2  text-[#08174e] rounded-tr-md"
                  style={{
                    background:
                      "linear-gradient(90deg, #f47424 0%, #f58a47 100%)",
                  }}
                >
                  <LiaChartLineSolid size={20} />
                </div>
              </div>
              <div className="flex flex-1  rounded-b-md px-2">
                <Line data={lineData} options={lineOptions} width={"100%"} />
              </div>
            </div>
            <div className="md:h-[50%] lg:md:h-[40%] flex flex-col-reverse md:flex-row gap-2 ">
              {/* table */}
              <div
                className="w-full md:w-1/2 h-60 md:h-auto bg-white overflow-auto rounded-md mb-[6vh] md:mb-[8vh] lg:mb-0"
                style={{ scrollbarWidth: "none" }}
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
                      <th className="w-1/5 p-1">S.No</th>
                      <th className="w-1/5 p-1">Sensor&nbsp;1</th>
                      <th className="w-1/5 p-1">Sensor&nbsp;2</th>
                      <th className="w-1/5 p-1">Sensor&nbsp;3</th>
                      <th className="w-1/5 p-1">Last&nbsp;Updated</th>
                    </tr>
                  </thead>

                  <tbody className="text-sm">
                    <tr className=" ">
                      <td>1</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>2</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>3</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>4</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>5</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>6</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>7</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>8</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>9</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>10</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>11</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>12</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>13</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>14</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                    <tr className=" ">
                      <td>15</td>
                      <td>55</td>
                      <td>65</td>
                      <td>75</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-full md:w-1/2 flex flex-col  bg-white rounded-md md:mb-[8vh] lg:mb-0">
                <div
                  className="py-1 px-2 text-white rounded-t-md"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
                  }}
                >
                  Peak Analysis
                </div>
                <div className="flex flex-1">
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
   