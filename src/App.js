import React, { useEffect, useState } from 'react'
import Login from './Component/Logins/Login'
import { Route, Routes } from 'react-router-dom'
import Route_Page from './Component/Route/Route_Page'
import OutletPage from './Component/Route/OutletPage'
import Mainpage from './Component/skf/Mainpage'
import Graph from './Component/skf/Graph'
import Reports from './Component/skf/Reports'
import Settings from './Component/skf/Settings'
import Admin_Dashboard from './Component/Admin/Admin_Dashboard'
import SkfAdmin from './Component/skf/SkfAdmin'
import Bpcl_MainPage from './Component/Bpcl/Bpcl_MainPage'
import BpclAdmin from './Component/Bpcl/BpclAdmin'
import GraphPage from './Component/Source/Graph'
import Reports_Page from './Component/Source/Reports'
import Source_Outlet from './Component/Route/Source_Outlet'
import Settings_Page from './Component/Source/Settings'
import Source_MainPage from './Component/Source/MainPage'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bpcl_report from './Component/Bpcl/Bpcl_report';
import Bpcl_Setting from './Component/Bpcl/Bpcl_Setting'
import Bpcl_Graph from './Component/Bpcl/Bpcl_Graph';
import OnlyOutlet from './Component/Route/OnlyOutlet';
import IoclMainPage from './Component/Iocl/IoclMainPage';
import IoclGraphs from './Component/Iocl/IoclGraphs';
import IoclReports from './Component/Iocl/IoclReports';
import IoclSettings from './Component/Iocl/IoclSettings';
import DemokitMainpage from "./Component/Demokit/DemokitMainpage";
import DemokitUtmaps from "./Component/Demokit/DemokitUtmaps";
import DemokitPorts from "./Component/Demokit/DemokitPorts";
import DemokitZtar from "./Component/Demokit/DemokitZtar";

const App = () => {
const [Tof_data,setTofdata]=useState('')
const [projectData, setProjectData] = useState([]);
const[chartdata,setChartData]=useState([]);
const[ReportData,setReportData]=useState([]);
const [ioclData, setIoclData] = useState([]);
const [utmapsData, setUtmapsData] = useState([]);
const [demokitUtmapsModelLimitS1, setDemokitUtmapsModelLimitS1] = useState();
const [demokitUtmapsModelLimitS2, setDemokitUtmapsModelLimitS2] = useState();
const [portsData, setPortsData] = useState([]);
const [ztarData, setZtarData] = useState([]);
const [autoDashData, setAutoDashData] = useState([]);

let controls = localStorage.getItem("Controles");

// iocl 
const getInitialCondition = () => {
  const storedLimit = localStorage.getItem("IOCLLimit");
  return storedLimit ? 1 : 0;
};

const [ioclCondition, setIoclCondition] = useState(getInitialCondition);

useEffect(() => {
  if (controls === 'IOCL' && ioclCondition === 0) {
    localStorage.setItem("IOCLLimit", "100");
    setIoclCondition(1);
  }
}, [controls, ioclCondition]);



// utmaps
const getInitialUtmapsCondition = () => {
  const storedLimit = localStorage.getItem('UtmapsLimit');
  return storedLimit ? 1 : 0
};

const [utmapsCondition, setUtmapsCondition] = useState(getInitialUtmapsCondition);

useEffect(() => {
  if (controls === "DEMOKIT" && utmapsCondition === 0) {
    localStorage.setItem("UtmapsLimit", "100");
    setUtmapsCondition(1);
  }
}, [controls, utmapsCondition]);

// utmaps unit selection
const getInitialUtmapsUnit = () => {
  const storedUnit = localStorage.getItem('UtmapsUnit');
  return storedUnit ? 1 : 0
};

const [utmapsUnitCondition, setUtmapsUnitCondition] = useState(getInitialUtmapsUnit);

useEffect(() => {
  if(controls === "DEMOKIT" && utmapsUnitCondition === 0) {
    localStorage.setItem("UtmapsUnit", 'C');
    setUtmapsUnitCondition(1);
  }
}, [controls, utmapsUnitCondition]);

// ports
const getInitialPortsCondition = () => {
  const storedLimit = localStorage.getItem("PortsLimit");
  return storedLimit ? 1 : 0;
};

const [portsCondition, setPortsCondition] = useState(
  getInitialPortsCondition
);

useEffect(() => {
  if (controls === "DEMOKIT" && portsCondition === 0) {
    localStorage.setItem("PortsLimit", "100");
    setPortsCondition(1);
  }
}, [controls, portsCondition]);

// ztar
const getInitialZtarCondition = () => {
  const storedLimit = localStorage.getItem("ZtarLimit");
  return storedLimit ? 1 : 0;
};

const [ztarCondition, setZtarCondition] = useState(getInitialZtarCondition);

useEffect(() => {
  if (controls === "DEMOKIT" && ztarCondition === 0) {
    localStorage.setItem("ZtarLimit", "100");
    setZtarCondition(1);
  }
}, [controls, ztarCondition]);

// automated dashboard
const getInitialAutoDashCondition = () => {
  const storedLimit = localStorage.getItem('AutoDashLimit');
  return storedLimit ? 1 : 0;
};

const [autoDashCondition, setAutoDashCondition] = useState(getInitialAutoDashCondition);

useEffect(() => {
  if(controls === 'AutomatedDashboard' && autoDashCondition === 0) {
    localStorage.setItem("AutoDashLimit", "100");
    setAutoDashCondition(1);
  };
}, [controls, autoDashCondition]);


// fetching data
useEffect(() => {

  // to prevent api errors in login page console
  if(!controls) {
    return;
  }

  // admin
  else if (controls === "ADMIN") {
    fetch_tof_fata();
    const data = setInterval(fetch_tof_fata, 2000);

    return () => {
      clearInterval(data);
    };
  }

  // iocl
  else if (controls === "IOCL") {
    getIOCLData();
    const ioclData = setInterval(getIOCLData, 2000);

    return () => {
      clearInterval(ioclData);
    };
  }

  // demokit
  else if (controls === "DEMOKIT") {
    getDemokitUtmapsData();
    getDemokitPortsData();
    getDemokitZtarData();
    getDemokitUtmapsModelLimit();
    const utmapsData = setInterval(getDemokitUtmapsData, 2000);
    const utmapsModelLimit = setInterval(getDemokitUtmapsModelLimit, 2000);
    const portsData = setInterval(getDemokitPortsData, 2000);
    const ztarData = setInterval(getDemokitZtarData, 2000);

    return () => {
      clearInterval(utmapsData);
      clearInterval(utmapsModelLimit);
      clearInterval(portsData);
      clearInterval(ztarData);
    };
  }
  
  // automated dashboard
  else if (controls === "AutomatedDashboard") {
    getAutoDashData();
    const autoDashData = setInterval(getAutoDashData, 2000);
    // chartdatafetch();
    // const sensors = setInterval(fetchProductData, 5000);
    // const chartdata = setInterval(chartdatafetch, 2000);

    return () => {
      // clearInterval(sensors);
      // clearInterval(chartdata);
      clearInterval(autoDashData);
    };
  }
}, [controls]);

  
// admin
const fetch_tof_fata =async()=>{
  try{
    const response = await fetch("http://34.93.162.58:4000/sensor/BPCL_READ");
    const info = await response.json();
    setTofdata(info.data)
    
  }catch(error){
    console.error("Error fetching data",error)
  }
}

// automated dashboard
const getAutoDashData = async () => {
  try {
    const projectName = localStorage.getItem('Project');
    const autoDashLimit = localStorage.getItem('AutoDashLimit');
    const response = await axios.get(`http://34.93.162.58:4000/sensor/getAutoDashData?project=${projectName}&limit=${autoDashLimit}`);
    if (response.data.success) {
      setAutoDashData(response.data.data);
    } else {
      toast.error('Data not found');
    }
  } catch (error) {
    console.error("Error fetching automated dashboard data", error);
  };
};

// const fetchProductData = async () => {
//   try {
//       const projectName = localStorage.getItem('Project');
//       const Count =localStorage.getItem('CountReportData')

//       let Count_final =0;
//       if(Count == null){
//         Count_final =500;
//       }else{
//         Count_final =localStorage.getItem('CountReportData')
//       }

//       const response = await axios (`http://34.93.162.58:4000/sensor/displayProjectData?project=${projectName}`);
//       const report = await axios(`http://34.93.162.58:4000/sensor/DisplayProjectReport?project=${projectName}&Count=${Count_final}`);

//       if(response.data.success)
//       {
//           setProjectData(response.data.data);
//           setReportData(report.data.data);
//           const modifiedData = response.data.data.map(item =>
//             {
//               if(item.Time && typeof item.Time === 'string')
//               {
//               const dateParts = item.Time.split(/[,\s:/]+/);
//               const day = parseInt(dateParts[0]); 
//               const month = parseInt(dateParts[1]); 
//               const year = parseInt(dateParts[2]);  
//               let hours = parseInt(dateParts[3]);
//               const minutes = parseInt(dateParts[4]);
//               const seconds = parseInt(dateParts[5]);
//               const meridian = dateParts[6];
//               if (meridian === 'pm' && hours !== 12) {
//                   hours += 12;
//               }
//               const date = new Date(year, month - 1, day, hours, minutes, seconds);
//               const unixTimestamp = date.getTime();
//               return { ...item, Time: unixTimestamp };
//             }
//             else
//             {
//               return item;
//             }
//           }
//         );    
//       }
//       else
//       {
//         console.log('cant fetch project data');
//       }
      
//   } catch (error) {
//     console.error('Error fetching product data:', error);
//   }
// }


// const chartdatafetch =async()=>{
//   try{
//     const  chartlength =sessionStorage.getItem("chartLength");
//     const  sensorname = sessionStorage.getItem("Chart_status");
//     const projectName = localStorage.getItem('Project');
//     const response = await axios(`http://34.93.162.58:4000/sensor/project_all_data?project=${projectName}&sensorname=${sensorname}&chartlength=${chartlength}`);
//     if(response.data.success){
//         setChartData(response.data.data);
//     }else{
//       toast.error('No Data found!!');
//     }
//   }catch(error){
//     console.error("Error Fetching Data: ",error)
//   }
// }

const getIOCLData = async () => {
  try {
    const ioclLimit = localStorage.getItem('IOCLLimit');
    const response = await axios.get(`http://34.93.162.58:4000/sensor/getIOCLData?limit=${ioclLimit}`);
    if(response.data.success) {
      setIoclData(response.data.data);
    } else {
      toast.error('No Data Found!');
    }
  } catch(error) {
    console.error('Error fetching IOCL data', error);
  }
};

// utmaps
const getDemokitUtmapsData = async() => {
  try {
    const projectNumber = localStorage.getItem("projectNumber");
    const utmapsLimit = localStorage.getItem("UtmapsLimit");
    const utmapsUnit = localStorage.getItem('UtmapsUnit');
    const response = await axios.get(
      `http://34.93.162.58:4000/sensor/getDemokitUtmapsData?projectNumber=${projectNumber}&limit=${utmapsLimit}&unit=${utmapsUnit}`
      // `http://localhost:4000/sensor/getDemokitUtmapsData?projectNumber=${projectNumber}&limit=${utmapsLimit}&unit=${utmapsUnit}`
    );
    if (response.data.success) {
      setUtmapsData(response.data.data);
    } else {
      toast.error("No Data Found!");
    }
  } catch (error) {
    console.error("Error fetching Demokit Utmaps data", error);
  };
};

const getDemokitUtmapsModelLimit = async() => {
  try {
    const projectNumber = localStorage.getItem("projectNumber");
    const response = await axios.post(
      "http://34.93.162.58:4000/sensor/getDemokitUtmapsModelLimit",
      { projectNumber }
    );
    if(response.data.success) {
      setDemokitUtmapsModelLimitS1(response.data.data.ModelLimitS1);
      setDemokitUtmapsModelLimitS2(response.data.data.ModelLimitS2);
    }
  } catch(error) {
    console.error(error);
  };
};

// console.log('model limit in app', demokitUtmapsModelLimit);
// console.log('utmaps data', utmapsData);

// ports
const getDemokitPortsData = async () => {
  try {
    const projectNumber = localStorage.getItem("projectNumber");
    const portsLimit = localStorage.getItem("PortsLimit");
    const response = await axios.get(
      `http://34.93.162.58:4000/sensor/getDemokitPortsData?projectNumber=${projectNumber}&limit=${portsLimit}`
    );
    if (response.data.success) {
      setPortsData(response.data.data);
    } else {
      toast.error("No Data Found!");
    }
  } catch (error) {
    console.error("Error fetching Demokit Ports data", error);
  };
};

// ztar
const getDemokitZtarData = async () => {
  try {
    const projectNumber = localStorage.getItem("projectNumber");
    const ztarLimit = localStorage.getItem("ZtarLimit");
    const response = await axios.get(
      `http://34.93.162.58:4000/sensor/getDemokitZtarData?projectNumber=${projectNumber}&limit=${ztarLimit}`
    );
    if (response.data.success) {
      setZtarData(response.data.data);
    } else {
      toast.error("No Data Found!");
    }
  } catch (error) {
    console.error("Error fetching Demokit Ztar data", error);
  }
};
 
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Route_Page />}>
          {controls === "SKF" ? (
            <Route path="/" element={<OutletPage />}>
              <Route index element={<Mainpage />} />
              <Route path="dashgraph" element={<Graph />} />
              <Route path="dashreports" element={<Reports />} />
              <Route path="dashsettings" element={<Settings />} />
            </Route>
          ) : null}
          {controls === "ADMIN" ? (
            <Route path="/" element={<OutletPage />}>
              <Route index element={<Admin_Dashboard />} />
              <Route path="skfadmin" element={<SkfAdmin />} />
              <Route path="Bpcl_Admin" element={<BpclAdmin Tof={Tof_data} />} />
            </Route>
          ) : null}
          {controls === "BPCL" ? (
            <Route path="/" element={<OutletPage />}>
              <Route index element={<Bpcl_MainPage />} />
              <Route path="Bpcl_Report" element={<Bpcl_report />} />
              <Route path="Bpcl_Settings" element={<Bpcl_Setting />} />
              <Route path="Bpcl_Graph" element={<Bpcl_Graph />} />
              <Route path="Bpcl_Admin" element={<BpclAdmin />} />
            </Route>
          ) : null}
          {controls === "IOCL" ? (
            <Route path="/" element={<OnlyOutlet />}>
              <Route index element={<IoclMainPage dataFromApp={ioclData} />} />
              <Route path="ioclGraphs" element={<IoclGraphs />} />
              <Route path="ioclReports" element={<IoclReports />} />
              <Route path="ioclSettings" element={<IoclSettings />} />
            </Route>
          ) : null}
          {controls === "DEMOKIT" ? (
            <Route path="/" element={<OnlyOutlet />}>
              <Route index element={<DemokitMainpage />} />
              <Route
                path="utmaps"
                element={
                  <DemokitUtmaps
                    dataFromApp={utmapsData}
                    modelLimitS1FromApp={demokitUtmapsModelLimitS1}
                    modelLimitS2FromApp={demokitUtmapsModelLimitS2}
                  />
                }
              />
              <Route
                path="ports"
                element={<DemokitPorts dataFromApp={portsData} />}
              />
              <Route
                path="ztar"
                element={<DemokitZtar dataFromApp={ztarData} />}
              />
            </Route>
          ) : null}
          {controls === "AutomatedDashboard" && (
            <Route path="/" element={<Source_Outlet />}>
              <Route
                index
                element={<Source_MainPage dataFromApp={autoDashData} />}
              />
              <Route
                path="Graph"
                element={<GraphPage dataFromApp={autoDashData} />}
              />
              <Route
                path="Report"
                element={<Reports_Page dataFromApp={autoDashData[0]} />}
              />
              <Route path="Settings" element={<Settings_Page />} />
            </Route>
          )}
        </Route>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App
