import React, { useEffect, useState, useMemo } from 'react';
import { BiWater } from "react-icons/bi";
import { IoBeaker } from "react-icons/io5";
import axios from 'axios';
import xymaLogo from '../Assets/xyma - Copy.png'
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
  scales,
  Zoom,
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

const Bpcl_MainPage = () => {

  const [levelData, setLevelData] = useState([]);
  const [levelChartData, setLevelChartData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getLevelData();
    getLevelChartData();
    getVolumeChartData();

    const levelDataInterval = setInterval(getLevelData, 2000);
    const levelChartDataInterval = setInterval(getLevelChartData, 2000);
    const volumeChartDataInterval = setInterval(getVolumeChartData, 2000);

    return () => {
      clearInterval(levelDataInterval);
      clearInterval(levelChartDataInterval);
      clearInterval(volumeChartDataInterval);
    };
  }, []);

    useEffect(() => {
      // chart data assignment
      if (
        Array.isArray(levelChartData) &&
        levelChartData.length > 0 &&
        Array.isArray(volumeData) &&
        volumeData.length > 0
      ) {
        const reversedData = [...levelChartData].reverse();
        const reversedVolumeData = [...volumeData].reverse();

        const lineLabels = reversedData.map((item) => {
          const createdAt = new Date(item.createdAt).toLocaleString("en-GB");
          return createdAt;
        });

        const levelData = reversedData.map((item) => item.level);
        const volume = reversedVolumeData.map((item) => item.devicetemp);

        setLineData({
          labels: lineLabels,
          datasets: [
            {
              label: "Level",
              data: levelData,
              borderColor: "rgb(0, 123, 255)",
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 1.25,
            },
            {
              label: "Volume",
              data: volume,
              borderColor: "rgb(40, 167, 69)",
              backgroundColor: "rgba(40, 167, 69, 0.2)",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 1.25,
              hidden: true,
            },
          ],
        });
      }
    }, [levelChartData, volumeData]);

  const lineOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#4B5563",
            font: {
              size: 8,
            },
          },
        },
        // tooltip: {
        //   enabled: true,
        //   callbacks: {
        //     label: function (context) {
        //       return `${context.dataset.label}: ${context.formattedValue}`;
        //     },
        //   },
        // },
        // interaction: {
        //   mode: "nearest", // Control hover behavior
        //   intersect: false, // Allows hover even if not directly on the point
        //   axis: "x", // Only trigger on the x-axis
        // },
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
            color: "#4B5563",
            font: {
              size: 8,
            },
          },
        },
        y: {
          ticks: {
            color: "#4B5563",
            font: {
              size: 8,
            },
          },
        },
      },
    }),
    []
  );



  const getLevelData = async() => {
    try {
      const response = await axios.get('http://43.204.133.45:4000/sensor/leveldata/XY001');
      if(response.data) {
        setLevelData(response.data);
      } else {
        console.log('cant fetch data');
      }
    } catch(error) {
      console.log('catched error', error);
    }
  };

  const getLevelChartData = async () => {
    try {
      const response = await axios.get(
        "http://43.204.133.45:4000/sensor/levelchartdata/XY001/level"
      );
      if (response.data) {
        setLevelChartData(response.data);
      } else {
        console.log("cant fetch data");
      }
    } catch (error) {
      console.log("catched error", error);
    }
  };

  const getVolumeChartData = async () => {
    try {
      const response = await axios.get(
        "http://43.204.133.45:4000/sensor/levelchartdata/XY001/devicetemp"
      );
      if (response.data) {
        setVolumeData(response.data);
      } else {
        console.log("cant fetch data");
      }
    } catch (error) {
      console.log("catched error", error);
    }
  };

  // console.log("level data", levelData);
  console.log('level chart data', levelChartData);
  console.log('volumedata', volumeData)

  return (
    <div className="text-white p-2 flex flex-col gap-2 xl:h-screen">
      <div className="text-center text-base md:text-xl font-medium xl:h-[8%] flex justify-between items-center">
        <div>
          <img src={xymaLogo} className="max-w-20 md:max-w-24" />
        </div>
        <div>Level Measurement</div>
        {/* empty div for alignment */}
        <div className="w-20" />
      </div>
      {/* card */}
      <div className="flex justify-start gap-4 xl:h-[12%]">
        <div className="flex gap-2 items-center justify-center p-4 rounded-md bg-white text-gray-600 font-medium">
          <BiWater className="text-5xl md:text-6xl" />
          <div className="text-lg md:text-xl">
            <div className="text-sm md:text-base">Level</div>
            <div>{levelData && levelData.level}&nbsp;mm</div>
          </div>
        </div>

        <div className="flex gap-2 items-center justify-center p-4 rounded-md bg-white text-gray-600 font-medium">
          <IoBeaker className="text-5xl md:text-6xl" />
          <div className="text-lg md:text-xl">
            <div className="text-sm md:text-base">Volume</div>
            <div>{levelData && levelData.devicetemp}&nbsp;ml</div>
          </div>
        </div>
      </div>
      {/* graph */}
      <div className="rounded-md p-2 bg-white h-[300px] lg:[400px] xl:h-[80%]">
        <Line data={lineData} options={lineOptions} width={"100%"} />
      </div>
    </div>
  );
}

export default Bpcl_MainPage
