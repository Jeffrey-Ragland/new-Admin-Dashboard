import React from 'react';
import { Link } from "react-router-dom";
import xymaLogo from "../Assets/xyma - Copy.png";
import { BsThermometerSun } from "react-icons/bs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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

const DemokitUtmaps = () => {

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Dataset 2",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: "rgba(153,102,255,0.2)",
        borderColor: "rgba(153,102,255,1)",
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

  return (
    <div
      className="h-screen text-white p-2 flex flex-col gap-0.5"
      style={{
        background: "radial-gradient(circle, #7e7e85 0%, #2c2c2c 50%)",
      }}
    >
      <div className="flex justify-between items-center">
        <img src={xymaLogo} alt="logo" className="max-h-10" />
        <div className="text-xl font-medium">μTMapS</div>
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

      <center className="font-medium text-lg">
        Multi-Point Temperature Measurement Sensor
      </center>

      <div className="flex-1  flex gap-2">
        {/* 3d model - left section */}
        <div className=" w-1/3 flex justify-center items-center border border-white rounded-md">
          3d model
        </div>

        {/* right section */}
        <div className=" w-2/3 flex flex-col gap-2">
          {/* right top */}
          <div className=" h-[40%] flex gap-2">
            {/* cards */}
            <div className="w-[50%] flex flex-col gap-2">
              <div className="flex gap-2 h-1/2">
                <div
                  className="rounded-md w-1/2 flex flex-col items-center justify-center gap-2 font-medium text-lg"
                  style={{
                    background:
                      "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <BsThermometerSun className="text-5xl" />
                    <div className="flex flex-col text-base">
                      <div>Sensor 1</div>
                      <div>45 °C</div>
                    </div>
                  </div>
                </div>
                <div
                  className="rounded-md w-1/2 flex flex-col items-center justify-center gap-2 font-medium text-lg"
                  style={{
                    background:
                      "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <BsThermometerSun className="text-5xl" />
                    <div className="flex flex-col text-base">
                      <div>Sensor 2</div>
                      <div>83 °C</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 h-1/2">
                <div
                  className="rounded-md w-1/2 flex flex-col items-center justify-center gap-2 font-medium text-lg"
                  style={{
                    background:
                      "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <BsThermometerSun className="text-5xl" />
                    <div className="flex flex-col text-base">
                      <div>Sensor 3</div>
                      <div>76 °C</div>
                    </div>
                  </div>
                </div>
                <div
                  className="rounded-md w-1/2 flex flex-col items-center justify-center gap-2 font-medium text-lg"
                  style={{
                    background:
                      "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <BsThermometerSun className="text-5xl" />
                    <div className="flex flex-col text-base">
                      <div>Sensor 4</div>
                      <div>21 °C</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* table */}
            <div
              className=" w-[50%] rounded-md overflow-auto text-center bg-white"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "gray transparent",
              }}
            >
              <table className="">
                <thead className="sticky top-0 bg-gray-700 text-white">
                  <tr>
                    <th className="px-2">S.No</th>
                    <th className="px-2">Sensor&nbsp;1</th>
                    <th className="px-2">Sensor&nbsp;2</th>
                    <th className="px-2">Sensor&nbsp;3</th>
                    <th className="px-2">Sensor&nbsp;4</th>
                    <th className="px-2">Updated&nbsp;At</th>
                  </tr>
                </thead>

                <tbody className="text-sm text-gray-600">
                  <tr>
                    <td>1</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>3</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>4</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>5</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>6</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>7</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>8</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>9</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>10</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>11</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>12</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>13</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>14</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>

                  <tr>
                    <td>15</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                    <td>2:55 pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* right bottom */}
          <div className=" h-[60%] rounded-md flex gap-2">
            {/* line graph */}
            <div className="border border-white rounded-md w-[70%]">
              <Line data={lineData} options={lineOptions} width={'100%'}/>
            </div>

            <div className="rounded-md w-[30%] flex flex-col gap-2">
              {/* bar chart */}
              <div className="h-[60%] border border-white rounded-md"></div>

              {/* report */}
              <div className="h-[40%] border border-white rounded-md text-sm px-2 py-1 flex flex-col">
                <center className="font-medium">Report Generation</center>

                <div className="flex justify-center gap-2 text-xs">
                  <div className="flex flex-col gap-1">
                    <label>From</label>
                    <input
                      type="date"
                      placeholder="From"
                      className="text-black rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>To</label>
                    <input
                      type="date"
                      placeholder="To"
                      className="text-black rounded-md"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-center items-center flex-1">
                  <button className="rounded-md bg-red-500 hover:scale-105 duration-200 py-1 px-2">
                    PDF
                  </button>
                  <button className="rounded-md bg-green-500 hover:scale-105 duration-200 py-1 px-2">
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

export default DemokitUtmaps
