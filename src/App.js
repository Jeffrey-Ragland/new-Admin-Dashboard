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
import Settings_Page from './Component/Source/Settings_Page'
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

// let iocl = 0;

const App = () => {
const [Tof_data,setTofdata]=useState('')
const [projectData, setProjectData] = useState([]);
const[chartdata,setChartData]=useState([]);
const[ReportData,setReportData]=useState([]);
const [ioclData, setIoclData] = useState([]);
const [utmapsData, setUtmapsData] = useState([]);

// const getInitialCondition = () => {
//   const storedLimit = localStorage.getItem("IOCLLimit");
//   return storedLimit ? 1 : 0;
// }

// const [ioclCondition, setIoclCondition] = useState(getInitialCondition);

const getInitialUtmapsCondition = () => {
  const storedLimit = localStorage.getItem('UtmapsLimit');
  return storedLimit ? 1 : 0
};

const [utmapsCondition, setUtmapsCondition] = useState(getInitialUtmapsCondition);

useEffect(() => {
  if(utmapsCondition === 0) {
    localStorage.setItem('UtmapsLimit', '100');
    setUtmapsCondition(1);
  }
}, []);

  let controls =localStorage.getItem("Controles");

  // useEffect(() => {
  //   if(ioclCondition === 0) {
  //     localStorage.setItem('IOCLLimit', "100");
  //     setIoclCondition(1);
  //   }
  // }, []);


  useEffect(()=>{
    // fetch_tof_fata();
    // fetchProductData();
    // chartdatafetch();
    // getIOCLData();
    getDemokitUtmapsData();
  // const data = setInterval(fetch_tof_fata,2000);
  // const sensors =setInterval(fetchProductData,5000);
  // const chartdata =setInterval(chartdatafetch,2000);
  // const ioclData = setInterval(getIOCLData,2000);
  const utmapsData = setInterval(getDemokitUtmapsData, 2000);
  return()=>{
    // clearInterval(data);
    // clearInterval(sensors);
    // clearInterval(chartdata);
    // clearInterval(ioclData);
    clearInterval(utmapsData);
  }
  },[])

  // console.log('iocl data',ioclData);


const fetch_tof_fata =async()=>{
  try{
    const response = await fetch("http://localhost:4000/sensor/BPCL_READ");
    const info = await response.json();
    setTofdata(info.data)
    
  }catch(error){
    console.error("Error fetching data",error)
  }
}


const fetchProductData = async () => {
  try {
      const projectName = localStorage.getItem('Project');
      const Count =localStorage.getItem('CountReportData')

      let Count_final =0;
      if(Count == null){
        Count_final =500;
      }else{
        Count_final =localStorage.getItem('CountReportData')
      }

      const response = await axios (`http://localhost:4000/sensor/displayProjectData?project=${projectName}`);
      const report = await axios(`http://localhost:4000/sensor/DisplayProjectReport?project=${projectName}&Count=${Count_final}`);

      if(response.data.success)
      {
          setProjectData(response.data.data);
          setReportData(report.data.data);
          const modifiedData = response.data.data.map(item =>
            {
              if(item.Time && typeof item.Time === 'string')
              {
              const dateParts = item.Time.split(/[,\s:/]+/);
              const day = parseInt(dateParts[0]); 
              const month = parseInt(dateParts[1]); 
              const year = parseInt(dateParts[2]);  
              let hours = parseInt(dateParts[3]);
              const minutes = parseInt(dateParts[4]);
              const seconds = parseInt(dateParts[5]);
              const meridian = dateParts[6];
              if (meridian === 'pm' && hours !== 12) {
                  hours += 12;
              }
              const date = new Date(year, month - 1, day, hours, minutes, seconds);
              const unixTimestamp = date.getTime();
              return { ...item, Time: unixTimestamp };
            }
            else
            {
              return item;
            }
          }
        );    
      }
      else
      {
        console.log('cant fetch project data');
      }
      
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
}


const chartdatafetch =async()=>{
  try{
    const  chartlength =sessionStorage.getItem("chartLength");
    const  sensorname = sessionStorage.getItem("Chart_status");
    const projectName = localStorage.getItem('Project');
    const response = await axios(`http://localhost:4000/sensor/project_all_data?project=${projectName}&sensorname=${sensorname}&chartlength=${chartlength}`);
    if(response.data.success){
        setChartData(response.data.data);
    }else{
      toast.error('No Data found!!');
    }
  }catch(error){
    console.error("Error Fetching Data: ",error)
  }
}

const getIOCLData = async () => {
  try {
    const ioclLimit = localStorage.getItem('IOCLLimit');
    const response = await axios.get(`http://localhost:4000/sensor/getIOCLData?limit=${ioclLimit}`);
    if(response.data.success) {
      setIoclData(response.data.data);
    } else {
      toast.error('No Data Found!');
    }
  } catch(error) {
    console.error('Error fetching IOCL data', error);
  }
};

const getDemokitUtmapsData = async() => {
  try {
    const projectNumber = localStorage.getItem("projectNumber");
    const utmapsLimit = localStorage.getItem("UtmapsLimit");
    const response = await axios.get(
      `http://localhost:4000/sensor/getDemokitUtmapsData?projectNumber=${projectNumber}&limit=${utmapsLimit}`
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
              <Route path="utmaps" element={<DemokitUtmaps dataFromApp={utmapsData}/>} />
              <Route path="ports" element={<DemokitPorts />} />
              <Route path="ztar" element={<DemokitZtar />} />
            </Route>
          ) : null}
          {controls !== "SKF" &&
            controls !== "ADMIN" &&
            controls !== "IOCL" &&
            controls !== "BPCL" &&
            controls !== "DEMOKIT" && (
              <Route path="/" element={<Source_Outlet />}>
                <Route
                  index
                  element={<Source_MainPage all_sensor_data={projectData} />}
                />
                <Route
                  path="Graph"
                  element={
                    <GraphPage
                      all_sensor_data={projectData}
                      Chartdata={chartdata}
                    />
                  }
                />
                <Route
                  path="Report"
                  element={<Reports_Page report_data={ReportData} />}
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
