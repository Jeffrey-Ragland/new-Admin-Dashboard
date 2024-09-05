import React, { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { LuCalendarSearch } from "react-icons/lu";
import { BsDatabaseDown } from "react-icons/bs";
import { MdOutlineSensors } from "react-icons/md";
import { TbHash } from "react-icons/tb";
import { FaFileDownload, FaCloudDownloadAlt } from "react-icons/fa";
import axios from 'axios';
import Navbar from "./Navbar";
import xymaImg from "../Assets/xyma.png";
import coverImg from "../Assets/pdfcover.jpg";
import sensorPage from "../Assets/utmapsPage.jpg";
import disclaimerPage from "../Assets/disclaimerPage.jpg";
import reportsImg from '../Assets/reports.jpeg';


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

  // console.log("unselected sensors:", unselectedSensors);

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
        "http://34.93.162.58:4000/sensor/getAutoDashReportData",
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
        <div className="h-[93%] text-white p-4 overflow-hidden flex flex-col gap-4">
          <div className="flex gap-2 justify-evenly font-medium">
            <div
              className={`flex flex-col gap-1 items-center hover:scale-125 duration-200 cursor-pointer hover:text-[#D3A4B8] text-xs md:text-base ${
                selectedReportOption === "datePicker" && "text-[#D3A4B8]"
              }`}
              onClick={() => {
                setSelectedReportOption("datePicker");
                setCount();
                setSensorWiseCount();
                setUnselectedSensors([]);
                setSensorWiseFromDate("");
                setSensorWiseToDate("");
                setEnableCount(false);
              }}
            >
              <LuCalendarSearch className="text-3xl md:text-6xl 2xl:text-8xl" />
              Date&nbsp;Picker
            </div>

            <div
              className={`flex flex-col gap-1 items-center hover:scale-125 duration-200 cursor-pointer hover:text-[#D3A4B8] text-xs md:text-base text-center ${
                selectedReportOption === "countWiseData" && "text-[#D3A4B8]"
              }`}
              onClick={() => {
                setSelectedReportOption("countWiseData");
                setFromDate("");
                setToDate("");
                setCount(100);
                setSensorWiseCount();
                setUnselectedSensors([]);
                setSensorWiseFromDate("");
                setSensorWiseToDate("");
                setEnableCount(false);
              }}
            >
              <TbHash className="text-3xl md:text-6xl 2xl:text-8xl" />
              Count-wise Data
            </div>

            <div
              className={`flex flex-col gap-1 items-center hover:scale-125 duration-200 cursor-pointer hover:text-[#D3A4B8] text-xs md:text-base text-center ${
                selectedReportOption === "overallData" && "text-[#D3A4B8]"
              }`}
              onClick={() => {
                setSelectedReportOption("overallData");
                setFromDate("");
                setToDate("");
                setCount();
                setSensorWiseCount();
                setUnselectedSensors([]);
                setSensorWiseFromDate("");
                setSensorWiseToDate("");
                setEnableCount(false);
              }}
            >
              <BsDatabaseDown className="text-3xl md:text-6xl 2xl:text-8xl" />
              Overall Data
            </div>

            <div
              className={`flex flex-col gap-1 items-center hover:scale-125 duration-200 cursor-pointer hover:text-[#D3A4B8] text-xs md:text-base text-center ${
                selectedReportOption === "sensorWiseData" && "text-[#D3A4B8]"
              }`}
              onClick={() => {
                setSelectedReportOption("sensorWiseData");
                setFromDate("");
                setToDate("");
                setCount();
                setSelectedSensorWiseReportOption("datePicker");
                setEnableCount(false);
              }}
            >
              <MdOutlineSensors className="text-3xl md:text-6xl 2xl:text-8xl" />
              Sensor-wise Data
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col md:flex-row p-4 md:p-8 bg-white/10 rounded-xl">
              <div className="p-2 md:p-4 flex items-center justify-center">
                <img
                  src={reportsImg}
                  alt="reportsVector"
                  className="max-w-[150px] md:max-w-[300px] rounded-xl"
                />
              </div>
              {/* datepicker option */}
              {selectedReportOption === "datePicker" && (
                <div className="p-4 md:p-8 flex flex-col items-center justify-center gap-6">
                  <center className="text-xl font-medium">Select Date</center>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-4 font-medium">
                      <label>From</label>
                      <label>To</label>
                    </div>
                    <div className="flex flex-col gap-4">
                      <input
                        type="date"
                        className="text-gray-600 rounded-md px-0.5"
                        required
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                      <input
                        type="date"
                        className="text-gray-600 rounded-md px-0.5"
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
                      PDF <FaCloudDownloadAlt className="text-lg" />
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
                <div className="flex flex-col gap-4 py-4 md:py-8 px-5 md:px-10 items-center justify-center">
                  <center className="text-xl font-medium">Select Count</center>
                  <div className="flex flex-col gap-2 md:gap-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="option1"
                        name="options"
                        value={100}
                        checked={count === 100}
                        readOnly
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
                        checked={count === 500}
                        readOnly
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
                        checked={count === 1000}
                        readOnly
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
                        checked={enableCount === true}
                        readOnly
                        onClick={() => {
                          setCount(0);
                          setEnableCount(true);
                        }}
                      />
                      <label htmlFor="option4" className="cursor-pointer">
                        Custom Count
                      </label>
                    </div>

                    {enableCount && (
                      <>
                        <label htmlFor="count">Enter Count:</label>
                        <input
                          type="number"
                          id="count"
                          value={count}
                          className="text-gray-600 w-32 rounded-md px-2"
                          onChange={(e) =>
                            setCount(parseInt(e.target.value) || 0)
                          }
                        />
                      </>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="rounded-md bg-red-500 hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-2"
                      onClick={generatePdf}
                    >
                      PDF <FaCloudDownloadAlt className="text-lg" />
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

              {/* overall data option */}
              {selectedReportOption === "overallData" && (
                <div className="p-8 flex flex-col items-center justify-center gap-6">
                  <div className="font-medium">
                    Entire data from the database <br /> will be downloaded!
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="rounded-md bg-red-500 hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-2"
                      onClick={generatePdf}
                    >
                      PDF <FaCloudDownloadAlt className="text-lg" />
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

              {/* sensorwise data option */}
              {selectedReportOption === "sensorWiseData" && (
                <div className="px-4 md:px-8 py-2 md:py-4 flex flex-col items-center justify-center gap-4 text-sm md:text-base">
                  <center className="text-sm md:text-xl font-medium">
                    Select sensor
                  </center>
                  {/* sensor selection */}
                  <div className="flex gap-2 md:gap-4">
                    {parameters &&
                      Object.keys(parameters).length > 0 &&
                      Object.keys(parameters).map((key) => (
                        <div className="flex gap-1 items-center" key={key}>
                          <input
                            type="checkbox"
                            className="h-3 md:h-6 w-3 md:w-6 cursor-pointer"
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
                      className={`flex flex-col gap-1 items-center hover:scale-110 duration-200 cursor-pointer hover:text-[#D3A4B8] text-xs md:text-base ${
                        selectedSensorWiseReportOption === "datePicker" &&
                        "text-[#D3A4B8]"
                      }`}
                      onClick={() => {
                        setSelectedSensorWiseReportOption("datePicker");
                        setSensorWiseCount();
                        setEnableSensorWiseCount(false);
                      }}
                    >
                      <LuCalendarSearch className="text-2xl md:text-5xl" />
                      Date Picker
                    </div>

                    <div
                      className={`flex flex-col gap-1 items-center hover:scale-110 duration-200 cursor-pointer hover:text-[#D3A4B8] text-xs md:text-base ${
                        selectedSensorWiseReportOption === "countWiseData" &&
                        "text-[#D3A4B8]"
                      }`}
                      onClick={() => {
                        setSelectedSensorWiseReportOption("countWiseData");
                        setSensorWiseFromDate("");
                        setSensorWiseToDate("");
                        setSensorWiseCount(100);
                        setEnableSensorWiseCount(false);
                      }}
                    >
                      <TbHash className="text-2xl md:text-5xl" />
                      Count-wise Data
                    </div>

                    <div
                      className={`flex flex-col gap-1 items-center hover:scale-110 duration-200 cursor-pointer hover:text-[#D3A4B8] text-xs md:text-base ${
                        selectedSensorWiseReportOption === "overallData" &&
                        "text-[#D3A4B8]"
                      }`}
                      onClick={() => {
                        setSelectedSensorWiseReportOption("overallData");
                        setSensorWiseFromDate("");
                        setSensorWiseToDate("");
                        setSensorWiseCount();
                        setEnableSensorWiseCount(false);
                      }}
                    >
                      <BsDatabaseDown className="text-2xl md:text-5xl" />
                      Overall Data
                    </div>
                  </div>

                  {/* sensorwise datepicker option */}
                  {selectedSensorWiseReportOption === "datePicker" && (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <center className="text-sm md:text-xl font-medium">
                        Select date
                      </center>
                      <div className="flex gap-2">
                        <div className="flex flex-col gap-2 font-medium">
                          <label>From</label>
                          <label>To</label>
                        </div>
                        <div className="flex flex-col gap-2">
                          <input
                            type="date"
                            className="text-gray-600 rounded-md px-0.5"
                            required
                            value={sensorWiseFromDate}
                            onChange={(e) =>
                              setSensorWiseFromDate(e.target.value)
                            }
                          />
                          <input
                            type="date"
                            className="text-gray-600 rounded-md px-0.5"
                            required
                            value={sensorWiseToDate}
                            onChange={(e) =>
                              setSensorWiseToDate(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* sensorwise countwise option */}
                  {selectedSensorWiseReportOption === "countWiseData" && (
                    <div className="flex flex-col gap-2">
                      <center className="text-sm md:text-xl font-medium">
                        Select Count
                      </center>
                      <div className="flex gap-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="option1"
                              name="options"
                              value={100}
                              checked={sensorWiseCount === 100}
                              readOnly
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
                              id="option3"
                              name="options"
                              value={1000}
                              checked={sensorWiseCount === 1000}
                              readOnly
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
                        </div>

                        <div className="flex flex-col gap-2">
                          <div>
                            <input
                              type="radio"
                              id="option2"
                              name="options"
                              value={500}
                              checked={sensorWiseCount === 500}
                              readOnly
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
                              id="option4"
                              name="options"
                              checked={enableSensorWiseCount === true}
                              readOnly
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
                      </div>
                      {enableSensorWiseCount && (
                        <div className="flex gap-2">
                          <label htmlFor="count">Enter Count:</label>
                          <input
                            type="number"
                            id="count"
                            value={sensorWiseCount}
                            className="text-gray-600 w-40 rounded-md px-2"
                            onChange={(e) =>
                              setSensorWiseCount(parseInt(e.target.value) || 0)
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* sensorwise overall data option */}
                  {selectedSensorWiseReportOption === "overallData" && (
                    <div className="font-medium">
                      Entire data from the database will be <br />
                      downloaded!
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      className="rounded-md bg-red-500 hover:scale-110 duration-200 py-1 px-2 2xl:py-2 2xl:px-4 flex items-center gap-2"
                      onClick={generatePdf}
                    >
                      PDF <FaCloudDownloadAlt className="text-lg" />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports

// background-image: linear-gradient(to right top, );