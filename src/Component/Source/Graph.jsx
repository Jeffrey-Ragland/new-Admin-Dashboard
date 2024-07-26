  import React,{useState, useEffect} from 'react'
  import {Line} from 'react-chartjs-2';
  import ReactSlider from 'react-slider';
  import Navbar from "./Navbar";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


  const Graph = (dataFromApp) => {
    const [lineSliderValues, setLineSliderValues] = useState([0, 1000]);
    const [lineData, setLineData] = useState({
      labels: [],
      datasets: [],
    });

    const dataFromAppFile = dataFromApp.dataFromApp;

    // local storage graph limit
    const getInitialLimit = () => {
      const storedLimit = localStorage.getItem("AutoDashLimit");
      return storedLimit ? parseInt(storedLimit) : 100;
    };

    const [autoDashLineLimit, setAutoDashLineLimit] = useState(getInitialLimit);

    const handleLineLimit = (e) => {
      const limit = parseInt(e.target.value);
      setAutoDashLineLimit(limit);
      localStorage.setItem("AutoDashLimit", limit.toString());
    };

    // line chart
    useEffect(() => {
      if (dataFromAppFile.length > 0) {
        const reversedData = [...dataFromAppFile].reverse();

        const lineLabels = reversedData.map((item) => {
          const createdAt = new Date(item.createdAt).toLocaleString("en-GB");
          return createdAt;
        });

        
          const parameterKeys = Object.keys(reversedData[0]).filter(key => key !== 'createdAt');

          const datasets = parameterKeys.map((key, index) => ({
            label: key,
            data: reversedData.map((item) => item[key]),
            borderColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
            backgroundColor: `hsla(${(index * 60) % 360}, 70%, 50%, 0.2)`,
            tension: 0.5
          }));
          setLineData({
            labels: lineLabels,
            datasets,
          });
       
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
          className="h-screen flex flex-col 2xl:text-2xl mb-[8vh] xl:mb-0"
          style={{
            background:
              "linear-gradient(to right top, #000000, #1c191a, #2f2b2f, #423f47, #545560, #5e5f6d, #676a7b, #717589, #7a748c, #85738c, #917189, #9c7083)",
          }}
        >
          {/* navbar */}
          <div className="h-[7%]">
            <Navbar />
          </div>

          {/* main content */}
          <div className="p-4 flex flex-col gap-4 text-white text-sm font-medium h-[93%]">
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

            <div className="flex-1 flex gap-4 w-full">
              <div className="w-[8%] flex items-center justify-center">
                <ReactSlider
                  className="w-10 h-[93%] flex justify-center items-center"
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

              <div className="w-[92%] bg-white/10">
                <Line data={lineData} options={lineOptions} width={"100%"} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default Graph
