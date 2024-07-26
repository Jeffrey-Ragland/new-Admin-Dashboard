import React, { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { LuCalendarSearch } from "react-icons/lu";
import { BsDatabaseDown } from "react-icons/bs";
import { MdOutlineSensors } from "react-icons/md";
import { TbHash } from "react-icons/tb";
import axios from 'axios';
import Navbar from "./Navbar";
import xymaImg from "../Assets/xyma.png";
import coverImg from "../Assets/pdfcover.jpg";
import sensorPage from "../Assets/utmapsPage.jpg";
import disclaimerPage from "../Assets/disclaimerPage.jpg";
import reportsImg from '../Assets/reports.jpeg';
import { LuDownloadCloud } from "react-icons/lu";
import { FaFileDownload } from "react-icons/fa";

const Reports = (dataFromApp) => {
  const [selectedReportOption, setSelectedReportOption] =
    useState("datePicker");
  const [count, setCount] = useState(100);
  const [enableCount, setEnableCount] = useState(false);
  const [parameters, setParameters] = useState({}); // for sensor-wise data
  const [selectedSensors, setSelectedSensors] = useState([]); //for sensor wise data
  const [unselectedSensors, setUnselectedSensors] = useState([]);
  const [selectedSensorWiseReportOption, setSelectedSensorWiseReportOption] =
    useState("datePicker"); // for sensor wise data
  const [sensorWiseCount, setSensorWiseCount] = useState(100); // for sensor-wise data
  const [enableSensorWiseCount, setEnableSensorWiseCount] = useState(false); // for sensor-wise data
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sensorWiseFromDate, setSensorWiseFromDate] = useState('');
  const [sensorWiseToDate, setSensorWiseToDate] = useState('');
  const [reportData, setReportData] = useState('');

  const dataFromAppFile = dataFromApp.dataFromApp;
  const projectName = localStorage.getItem('Project');

  // console.log('selected sensors', selectedSensors)

  // used for displaying the sensor names in sensor wise data option
  useEffect(() => {
    if (dataFromAppFile) {
      const { createdAt, ...filteredData } = dataFromAppFile;
      setParameters(filteredData);
    }
  }, [dataFromAppFile]);

  // used for setting unselected sensor
  useEffect(() => {
    if (
      parameters &&
      selectedSensors &&
      selectedReportOption === "sensorWiseData"
    ) {
      const allSensors = Object.keys(parameters);
      const unselected = allSensors.filter(
        (sensor) => !selectedSensors.includes(sensor)
      );

      setUnselectedSensors(unselected);
    };
  }, [parameters, selectedSensors]);

  console.log("unselected sensors:", unselectedSensors);

  const handleSensorWiseDataSensorSelection = (key) => {
    setSelectedSensors((prevSelectedSensors) => {
      if (prevSelectedSensors.includes(key)) {
        return prevSelectedSensors.filter((sensor) => sensor !== key);
      } else {
        return [...prevSelectedSensors, key];
      }
    });
  };

  // fetch data
  useEffect(() => {
    handleReportData();
  }, [fromDate, toDate, count, unselectedSensors, sensorWiseFromDate, sensorWiseToDate, sensorWiseCount]);

  const handleReportData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/sensor/getAutoDashReportData",
        {
          params: {
            projectName: projectName,
            fromDate: fromDate,
            toDate: toDate,
            count: count,
            unselectedSensors: unselectedSensors.join(","),
            sensorWiseFromDate: sensorWiseFromDate,
            sensorWiseToDate: sensorWiseToDate,
            sensorWiseCount: sensorWiseCount,
          },
        }
      );
      setReportData(response.data.data);
      console.log('report data',response.data.data);
    } catch (error) {
      console.error(error);
    };
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    const logo = xymaImg;
    const cover = coverImg;
    const desc = sensorPage;
    const disclaimer = disclaimerPage;

    // cover img
    doc.addImage(cover, "JPG", 0, 0, 210, 297);
    doc.addPage();

    //logo
    doc.addImage(logo, "PNG", 10, 10, 40, 20);

    //sensor description
    doc.addImage(desc, "PNG", 0, 40, 220, 250);
    doc.addPage();

    //logo
    doc.addImage(logo, "PNG", 10, 10, 40, 20);

    // table
    if(reportData.length > 0) {
      // pdf headers 
      const headers = [
        'S.No',
        ...Object.keys(reportData[0])
      ];

      // pdf table data
      const body = reportData.map((item, index) => {
        const rows = [
          index + 1,
          ...Object.keys(item)
          .filter((key) => key !== 'createdAt')
          .map((key) => item[key]),
          new Date(item.createdAt).toLocaleString('en-GB')
        ];
        return rows;
      });

      doc.autoTable({
        head: [headers],
        body: body,
        startY: 40,
        headStyles: {
          fillColor: [222, 121, 13],
        },
      });
    };

    doc.addPage();

    //logo
    doc.addImage(logo, "PNG", 10, 10, 40, 20);

    //disclaimer
    doc.addImage(disclaimer, "PNG", 0, 50, 210, 250);

    const blob = doc.output("blob");

    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      reportData.map(
        ({ createdAt, ...rest }) => ({
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
    saveAs(info, `${projectName}_Report.xlsx`);
  }

  return (
    <>
      {/* background-image: linear-gradient(); */}
      <div
        className="xl:h-screen flex flex-col 2xl:text-2xl"
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
        <div className="h-[93%] text-white p-4 overflow-hidden flex flex-col gap-4">
          <div className="flex justify-evenly font-medium">
            <div
              className="flex flex-col gap-1 items-center hover:scale-125 duration-200 cursor-pointer"
              onClick={() => {
                setSelectedReportOption("datePicker");
                setCount();
                setSensorWiseCount();
                setUnselectedSensors([]);
                setSensorWiseFromDate("");
                setSensorWiseToDate("");
              }}
            >
              <LuCalendarSearch className="text-6xl" />
              Date Picker
            </div>

            <div
              className="flex flex-col gap-1 items-center hover:scale-125 duration-200 cursor-pointer"
              onClick={() => {
                setSelectedReportOption("countWiseData");
                setFromDate("");
                setToDate("");
                setCount(100);
                setSensorWiseCount();
                setUnselectedSensors([]);
                setSensorWiseFromDate("");
                setSensorWiseToDate("");
              }}
            >
              <TbHash className="text-6xl" />
              Count-wise Data
            </div>

            <div
              className="flex flex-col gap-1 items-center hover:scale-125 duration-200 cursor-pointer"
              onClick={() => {
                setSelectedReportOption("overallData");
                setFromDate("");
                setToDate("");
                setCount();
                setSensorWiseCount();
                setUnselectedSensors([]);
                setSensorWiseFromDate("");
                setSensorWiseToDate("");
              }}
            >
              <BsDatabaseDown className="text-6xl" />
              Overall Data
            </div>

            <div
              className="flex flex-col gap-1 items-center hover:scale-125 duration-200 cursor-pointer"
              onClick={() => {
                setSelectedReportOption("sensorWiseData");
                setFromDate("");
                setToDate("");
                setCount();
                setSelectedSensorWiseReportOption("datePicker");
              }}
            >
              <MdOutlineSensors className="text-6xl" />
              Sensor-wise Data
            </div>
          </div>

          {/* background-image: ; */}

          <div className="flex-1 flex items-center justify-center">
            <div className="flex p-8 bg-white/10 rounded-xl">
              <div className="p-4">
                <img
                  src={reportsImg}
                  alt="reportsVector"
                  className="max-w-[300px] rounded-xl"
                />
              </div>
              {/* datepicker option */}
              {selectedReportOption === "datePicker" && (
                <div
                  className="p-8 flex flex-col items-center justify-center gap-6 "
                  // style={{
                  //   background:
                  //     "radial-gradient(circle, #7fd1ae, #6ec5a5, #5cba9c, #49ae93, #34a38a, #2a9c8b, #23948b, #208d8a, #38878d, #4c808b, #5d7984, #68737a)",
                  // }}
                >
                  <center className="text-xl font-medium">Select Date</center>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-4 font-medium">
                      <label>From</label>
                      <label>To</label>
                    </div>
                    <div className="flex flex-col gap-4">
                      <input
                        type="date"
                        className="text-gray-600 rounded-md px-0.5 2xl:p-2"
                        required
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                      <input
                        type="date"
                        className="text-gray-600 rounded-md px-0.5 2xl:p-2"
                        required
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 font-medium">
                    <button
                      className="rounded-md bg-red-500 hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-2"
                      onClick={generatePdf}
                    >
                      PDF <LuDownloadCloud className="text-lg" />
                    </button>
                    <button
                      className="rounded-md bg-green-500 hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-2"
                      onClick={generateExcel}
                    >
                      Excel <FaFileDownload className="text-lg" />
                    </button>
                  </div>
                </div>
              )}

              {/* countwise option */}
              {selectedReportOption === "countWiseData" && (
                <div className="border border-black ">
                  <center>Select Count</center>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="option1"
                        name="options"
                        value={100}
                        defaultChecked
                        className="cursor-pointer mr-1"
                        onClick={() => {
                          setCount(100);
                          setEnableCount(false);
                        }}
                      />
                      <label htmlFor="option1" className="cursor-pointer">
                        Last 100 Data
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="option2"
                        name="options"
                        value={500}
                        className="cursor-pointer mr-1"
                        onClick={() => {
                          setCount(500);
                          setEnableCount(false);
                        }}
                      />
                      <label htmlFor="option2" className="cursor-pointer">
                        Last 500 Data
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="option3"
                        name="options"
                        value={1000}
                        className="cursor-pointer mr-1"
                        onClick={() => {
                          setCount(1000);
                          setEnableCount(false);
                        }}
                      />
                      <label htmlFor="option3" className="cursor-pointer">
                        Last 1000 Data
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="option4"
                        name="options"
                        className="cursor-pointer mr-1"
                        onClick={() => {
                          setCount(0);
                          setEnableCount(true);
                        }}
                      />
                      <label htmlFor="option4" className="cursor-pointer">
                        Custom Count
                      </label>
                    </div>
                  </div>
                  {enableCount && (
                    <>
                      <label htmlFor="count">Enter Count:</label>
                      <input
                        type="number"
                        id="count"
                        value={count}
                        className="border border-black text-black"
                        onChange={(e) =>
                          setCount(parseInt(e.target.value) || 0)
                        }
                      />
                    </>
                  )}
                  <div className="flex gap-4">
                    <button
                      className="border border-black "
                      onClick={generatePdf}
                    >
                      PDF
                    </button>
                    <button
                      className="border border-black "
                      onClick={generateExcel}
                    >
                      Excel
                    </button>
                  </div>
                </div>
              )}

              {/* overall data option */}
              {selectedReportOption === "overallData" && (
                <div className="border border-black ">
                  <div>Entire data from the database will be downloaded!</div>
                  <div className="flex gap-4">
                    <button
                      className="border border-black "
                      onClick={generatePdf}
                    >
                      PDF
                    </button>
                    <button
                      className="border border-black "
                      onClick={generateExcel}
                    >
                      Excel
                    </button>
                  </div>
                </div>
              )}

              {/* sensorwise data option */}
              {selectedReportOption === "sensorWiseData" && (
                <div className="border border-black ">
                  <center>Select sensor</center>
                  {/* sensor selection */}
                  <div className="flex gap-4">
                    {parameters &&
                      Object.keys(parameters).length > 0 &&
                      Object.keys(parameters).map((key) => (
                        <div key={key}>
                          <input
                            type="checkbox"
                            value={key}
                            onClick={() =>
                              handleSensorWiseDataSensorSelection(key)
                            }
                          />
                          <label>{key}</label>
                        </div>
                      ))}
                  </div>

                  <div className="flex gap-4 font-medium">
                    <div
                      className="flex flex-col gap-1 items-center hover:scale-110 duration-200 cursor-pointer"
                      onClick={() => {
                        setSelectedSensorWiseReportOption("datePicker");
                        setSensorWiseCount();
                      }}
                    >
                      <LuCalendarSearch className="text-5xl" />
                      Date Picker
                    </div>

                    <div
                      className="flex flex-col gap-1 items-center hover:scale-110 duration-200 cursor-pointer"
                      onClick={() => {
                        setSelectedSensorWiseReportOption("countWiseData");
                        setSensorWiseFromDate("");
                        setSensorWiseToDate("");
                        setSensorWiseCount(100);
                      }}
                    >
                      <TbHash className="text-5xl" />
                      Count-wise Data
                    </div>

                    <div
                      className="flex flex-col gap-1 items-center hover:scale-110 duration-200 cursor-pointer"
                      onClick={() => {
                        setSelectedSensorWiseReportOption("overallData");
                        setSensorWiseFromDate("");
                        setSensorWiseToDate("");
                        setSensorWiseCount();
                      }}
                    >
                      <BsDatabaseDown className="text-5xl" />
                      Overall Data
                    </div>
                  </div>

                  {/* sensorwise datepicker option */}
                  {selectedSensorWiseReportOption === "datePicker" && (
                    <div>
                      <center>Select date</center>
                      <div>
                        <label>From</label>
                        <input
                          type="date"
                          className="text-black rounded-md px-0.5 2xl:p-2"
                          required
                          value={sensorWiseFromDate}
                          onChange={(e) =>
                            setSensorWiseFromDate(e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label>To</label>
                        <input
                          type="date"
                          className="text-black rounded-md px-0.5 2xl:p-2"
                          required
                          value={sensorWiseToDate}
                          onChange={(e) => setSensorWiseToDate(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* sensorwise countwise option */}
                  {selectedSensorWiseReportOption === "countWiseData" && (
                    <div>
                      <center>Select Count</center>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="option1"
                            name="options"
                            value={100}
                            defaultChecked
                            className="cursor-pointer mr-1"
                            onClick={() => {
                              setSensorWiseCount(100);
                              setEnableSensorWiseCount(false);
                            }}
                          />
                          <label htmlFor="option1" className="cursor-pointer">
                            Last 100 Data
                          </label>
                        </div>

                        <div>
                          <input
                            type="radio"
                            id="option2"
                            name="options"
                            value={500}
                            className="cursor-pointer mr-1"
                            onClick={() => {
                              setSensorWiseCount(500);
                              setEnableSensorWiseCount(false);
                            }}
                          />
                          <label htmlFor="option2" className="cursor-pointer">
                            Last 500 Data
                          </label>
                        </div>

                        <div>
                          <input
                            type="radio"
                            id="option3"
                            name="options"
                            value={1000}
                            className="cursor-pointer mr-1"
                            onClick={() => {
                              setSensorWiseCount(1000);
                              setEnableSensorWiseCount(false);
                            }}
                          />
                          <label htmlFor="option3" className="cursor-pointer">
                            Last 1000 Data
                          </label>
                        </div>

                        <div>
                          <input
                            type="radio"
                            id="option4"
                            name="options"
                            className="cursor-pointer mr-1"
                            onClick={() => {
                              setSensorWiseCount(0);
                              setEnableSensorWiseCount(true);
                            }}
                          />
                          <label htmlFor="option4" className="cursor-pointer">
                            Custom Count
                          </label>
                        </div>
                      </div>
                      {enableSensorWiseCount && (
                        <>
                          <label htmlFor="count">Enter Count:</label>
                          <input
                            type="number"
                            id="count"
                            value={sensorWiseCount}
                            className="border border-black text-black"
                            onChange={(e) =>
                              setSensorWiseCount(parseInt(e.target.value) || 0)
                            }
                          />
                        </>
                      )}
                    </div>
                  )}

                  {/* sensorwise overall data option */}
                  {selectedSensorWiseReportOption === "overallData" && (
                    <div>Entire data from the database will be downloaded!</div>
                  )}

                  <div className="flex gap-4">
                    <button
                      className="border border-black "
                      onClick={generatePdf}
                    >
                      PDF
                    </button>
                    <button
                      className="border border-black "
                      onClick={generateExcel}
                    >
                      Excel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports

// background-image: linear-gradient(to right top, );