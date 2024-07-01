// import React,{useState} from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import report from '../Assets/4936937.jpg'
// import Select from 'react-select';
// import { MdDownload } from "react-icons/md";
// import { FaRegFilePdf } from "react-icons/fa6";
// import { RiFileExcel2Line } from "react-icons/ri";
// import DatePicker from "react-datepicker";
// import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
// import "react-datepicker/dist/react-datepicker.css";
// const Reports = () => {
//   const [toDate, setToDate] = useState(null);
//   const [fromDate, setFromDate] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]); 
//   const [selectAll, setSelectAll] = useState(false);
//   const [projectData, setProjectData] = useState([]);

//         const handleFromDate = (date) => {
//           setFromDate(date);
//           console.log(date);
//         };
//         const handleToDate = (date) => {
//           setToDate(date);
//           console.log(date);
//         };
      
//         const toggleDropdown = () => {
//           setIsOpen(!isOpen);
//           setSelectedOptions([]);
//           setSelectAll(false);
//         };

//         const handleSelectAll = () => {
//           if (selectAll) {
//             setSelectedOptions([]);
//           } else {
//             setSelectedOptions(
//               Object.keys(projectData[0]).filter(
//                 (key) => key !== "_id" && key !== "__v" && key !== "Time"
//               )
//             );
//           }
//           setSelectAll(!selectAll);
//         };
//         const handleDropdownOptions = (key) => {
//             if (selectedOptions.includes(key)) {
//               setSelectedOptions(selectedOptions.filter((k) => k !== key));
//             } else {
//               setSelectedOptions([...selectedOptions, key]);
//         }

        
//           };
//             //download pdf
//   const generatePdf = () => {
//     const doc = new jsPDF();
//     const logo = xymaimg;
//     const cover = coverImg;
//     const disclaimer = disclaimerPage;
    
//     //pdf table headers
//     const headers = [
//       "S.No",
//       ...Object.keys(filteredData[0]).filter(
//         (key) =>
//           key !== "_id" &&
//           key !== "Time" &&
//           key !== "__v" &&
//           selectedOptions.includes(key)
//       ),
//       "Updated At",
//     ];

//     //pdf table data
//     const body = filteredData.map((item, index) => {
//       const stringTime = item.Time.toString();
//       const dateWithoutTimezone = stringTime.split("GMT")[0].trim();
//       const rows = [
//         index + 1,
//         ...Object.keys(item)
//           .filter(
//             (key) =>
//               key !== "_id" &&
//               key !== "Time" &&
//               key !== "__v" &&
//               selectedOptions.includes(key)
//           )
//           .map((key) => item[key]),
//         dateWithoutTimezone,
//       ];
//       return rows;
//     });

//     //cover img
//     doc.addImage(cover, "JPG", 0, 0, 210, 297);
//     doc.addPage();

//     //logo
//     doc.addImage(logo, "PNG", 10, 10, 40, 20);

//     //table
//     doc.autoTable({
//       head: [headers],
//       body: body,
//       startY: 40,
//       headerStyles: {
//         fillColor: [222, 121, 13],
//       },
//     });
//     doc.addPage();

//     //logo
//     doc.addImage(logo, "PNG", 10, 10, 40, 20);

//     //disclaimer
//     doc.addImage(disclaimer, "PNG", 0, 50, 210, 250);
//     //doc.save(`${projectName}_reports.pdf`);

//     const pdfBlob = doc.output("blob");
//     const pdfUrl = URL.createObjectURL(pdfBlob);
//     window.open(pdfUrl);
//   };



//   return (
//     <div className='flex justify-center items-center'>
//       <div className='flex flex-col items-center justify-start bg-gray-600 w-5/6 mt-2 rounded-md shadow-lg h-[95vh]'>
//         <span className='font-bold border-b font-sans mt-2 hover:font-serif text-[#fcfcfc]'>
//           XYMA Analytics Private Limited
//         </span>
//         <div className="h-[87%] flex items-center justify-center">
//             <div className=" shadow-2xl bg-white">
//               {/* top part */}
//               <div className="text-sm  font-medium flex justify-between bg-gray-500 text-white">
//                 <div className="p-2">Download Report</div>
//                 <div className="p-2 bg-amber-400">
//                   <MdDownload size={20} />
//                 </div>
//               </div>
//               {/* bottom part */}
//               <div className="flex items-center flex-col gap-4 p-6">
//                 {/* date picker */}
//                 <div className="flex flex-col gap-4">
//                   <div>
//                     <div className="mb-1 text-sm font-medium">From:</div>
//                     <DatePicker
//                       className="rounded-lg border border-black p-1"
//                       selected={fromDate}
//                       name="fromdate"
//                       onChange={handleFromDate}
//                       dateFormat={"dd/MM/yyyy"}
//                       showIcon
//                     />
//                   </div>
//                   <div className="w-full">
//                     <div className="mb-1 text-sm font-medium">To:</div>
//                     <DatePicker
//                       className="rounded-lg border border-black w-full"
//                       selected={toDate}
//                       name="todate"
//                       onChange={handleToDate}
//                       dateFormat={"dd/MM/yyyy"}
//                       showIcon
//                     />
//                   </div>
//                 </div>

//                 {/* dropdown */}

//                 <div className="bg-white border border-black rounded-md cursor-pointer w-full mt-2">
//                   <div onClick={toggleDropdown} className="flex">
//                     <div
//                       className="text-sm p-2 text-gray-500 w-[180px] h-[34px] overflow-auto"
//                       style={{ scrollbarWidth: "none" }}
//                     >
//                       {selectedOptions.length === 0
//                         ? "Select Parameters"
//                         : selectedOptions.join(", ")}
//                     </div>
//                     <div className="flex items-center justify-center w-[37px] bg-gray-300 rounded-r-md">
//                       {isOpen ? (
//                         <IoIosArrowUp size={25} />
//                       ) : (
//                         <IoIosArrowDown size={25} />
//                       )}
//                     </div>
//                   </div>
//                   {isOpen && (
//                     <div
//                       className="w-full h-24 overflow-auto bg-white"
//                       style={{ scrollbarWidth: "none" }}
//                     >
//                       <label className="flex hover:bg-gray-300 p-2 text-xs font-medium cursor-pointer gap-2 duration-200">
//                         <input
//                           type="checkbox"
//                           id="selectAll"
//                           className="cursor-pointer"
//                           checked={selectAll}
//                           onChange={handleSelectAll}
//                         />
//                         <label htmlFor="selectAll" className="cursor-pointer">
//                           Select All
//                         </label>
//                       </label>
//                       {Object.keys(projectData[0])
//                         .filter(
//                           (key) =>
//                             key !== "_id" && key !== "__v" && key !== "Time"
//                         )
//                         .map((key, index) => (
//                           <label
//                             key={key}
//                             className={`flex gap-2 text-gray-700 text-xs font-medium p-2 hover:bg-gray-300 duration-200 cursor-pointer ${
//                               selectAll
//                                 ? "opacity-50  hover:bg-white cursor-not-allowed"
//                                 : ""
//                             }`}
//                           >
//                             <input
//                               id={key}
//                               type="checkbox"
//                               className="cursor-pointer"
//                               disabled={selectAll}
//                               checked={
//                                 selectAll || selectedOptions.includes(key)
//                               }
//                               onChange={() => handleDropdownOptions(key)}
//                             />
//                             <div>{`${key}`}</div>
//                           </label>
//                         ))}
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex gap-4">
//                   {/* download pdf button */}
//                   <div
//                     className="flex items-center p-3 rounded-xl text-white bg-red-500  hover:bg-red-600 duration-200 cursor-pointer hover:scale-110"
//                     onClick={generatePdf}
//                   >
//                     <FaRegFilePdf size={25} />
//                   </div>

//                   {/* download excel button */}
//                   <div
//                     className="flex flex-col items-center p-3 rounded-xl text-white bg-green-500  hover:bg-green-600 duration-200 cursor-pointer hover:scale-110"
//                     onClick={generateExcel}
//                   >
//                     <RiFileExcel2Line size={25} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         {/* <div className='grid xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 mt-2 w-full'>
//           <div className='w-full h-full'>
//             <span className='font-Helvetica font-bold flex flex-col items-center text-[#fce565] mt-4 sm:text-sm md:text xl:text-3xl'>Download You Report</span>
//             <div className='flex items-center'>
//               <div className='font-semibold text-white'>
//                 Select Sensor Id:
//               </div>
//               <div>
//               <Select className="ml-4" options={options} styles={customStyles} onChange={handleSensorChange} />
//               </div>
//             </div>
//           </div>
//           <div className='w-full h-full'>
//             <div className='flex flex-col items-center'>
//               <img className='ml-4 mr-4 rounded-3xl' src={report}></img>
//             </div>
//           </div>
//         </div> */}
//         <span className="text-center text-gray-400 mt-2">©2024 XYMA Analytics Private Limited</span>
//       </div>

//     </div>
//   )
// }
// export default Reports

import React,{useState} from 'react'
import reportimg from '../Assets/chartreport.png'
import datepicker from '..//Assets/datepicker.png'
import db from '..//Assets/db.png'
import count from '..//Assets/count.png'
import {Line} from 'react-chartjs-2';
import '../Source/style.css'
import DatePicker from "react-datepicker";
import Search from "../Assets/search_15372880.png"

 


const Reports = ({report_data}) => {
  const[show_error_popup,setPopu1]= useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [fromDate1, setFromDate1] = useState(null);
  const [papup1,setpopup1]=useState(false)
  const [papup2,setpopup2]=useState(false)
  const [papup3,setpopup3]=useState(false)
  const [papup4,setpopup4]=useState(false)



  const sensordata=report_data.map(item=>item.s1);
  const time=report_data.map(item=>item.timestamp)
  const reversedata =sensordata.reverse()
  const timestamp =time.reverse()
console.log(time)

const data={
  labels:timestamp,
  datasets:[{
      // label: 'Headers',
      data: reversedata,
      backgroundColor:'block',
      borderColor:'red',
      pointBordColor:'aqua',
      fill:true,
      tension:0.4,
      pointLabel: ({ dataIndex }) => {
          // Return the data value for the corresponding point
          return data.datasets[0].data[dataIndex];
      },
  }]
}
const options ={
  plugins:{
    // legend:true,
  },
  scales:{
      x: {
          grid:{
              color:'white'
          },
          ticks: {
              color: '#2d2d2d', 
          },
      },
      y: {
          // min:lineSliderValues[0],
          // max:lineSliderValues[1],
          ticks: {
              color: '#2d2d2d',
          },
          grid:{
              color:'white'
          },
      },
  }
}
  const handleClosePopup = () => {
    setPopu1(false);
    setpopup1(false);
    setpopup2(false);
    setpopup3(false);
    setpopup4(false);
  };

const handlechartAnalysis1 =()=>{
  setPopu1(true);
  setpopup1(true);
}

const handlechartAnalysis2 =()=>{
  setPopu1(true);
  setpopup2(true);
}

const handlechartAnalysis3 =()=>{
  setPopu1(true);
  setpopup3(true);
}

const handlechartAnalysis4 =()=>{
  // setPopu1(true);
  // setpopup4(true);

}
const handleFromDate = (date) => {
    setFromDate(date);
    console.log(date);
  };

  const handleFromDate1 = (date) => {
    setFromDate1(date);
    console.log(date);
  };

  const datastatus =(number)=>{
    console.log("number",number)
    if(number === 500){
      localStorage.setItem('CountReportData',500)
    } else if(number === 1000){
      localStorage.setItem('CountReportData',1000)
    }
    else if(number === 2000){
      localStorage.setItem('CountReportData',2000)
    }
  }

  const a =4;
  const b ="border-gray-600";

  return (
    <div className='grid grid-rows-2 md:flex md:flex-col w-[100%] h-[100%]'>
      <div className='md:flex h-[20%] gap-2 justify-center items-center'>
        <div className=' gap-2 hover:scale-125 cursor-pointer duration-200 mt-2 w-full h-full flex justify-center items-center' onClick={handlechartAnalysis1}>
          <img src={reportimg} className=''/>
          <p className='font-bold text-white'>Chart Analysis</p>
        </div>
        <div className=' gap-2 hover:scale-125 cursor-pointer  duration-200 mt-2 w-full h-full flex justify-center items-center'onClick={handlechartAnalysis2}>
        <img src={datepicker}/>
        <p className='font-bold text-white'>Date Picker</p>
        </div>
        <div className=' gap-2 hover:scale-125 cursor-pointer  duration-200 mt-2 w-full h-full flex justify-center items-center'onClick={handlechartAnalysis3}>
        <img src={db}/>
        <p className='font-bold text-white'>Overall Data</p>
        </div>
        <div className=' gap-2 hover:scale-125 cursor-pointer  duration-200 mt-2 w-full h-full flex justify-center items-center'onClick={handlechartAnalysis4}>
        <img src={count}/>
        <p className='font-bold text-white'>Count wise Data</p>
        </div>
      </div>
      <div className='h-[78%]'>
        <div className='border border-white h-full mt-2'>
          <div id="chart">
            <Line data={data} width={1000} height={400}  options={options} />
          </div>
        </div>
      </div>
      {show_error_popup &&(
         <div className='popup' id='popup-1'>
         <div className='overlay'></div>
         <div className='content'>
           {/* <div className='close-btn' onClick={handleClosePopup}>&times;</div> */}
           {papup2 && (
            <div>
              <div className='close-btn' onClick={handleClosePopup}>&times;</div>
              <div className='flex justify-center items-center'>
                <div className='w-[30%]'>
                  <img className='block mx-auto' src={Search} />
                </div>
              </div>
              <div className='gap-2'>
                <span className='text-black font-bold'>From</span>
                <div>
                  <DatePicker
                    className="rounded-lg border border-black p-1"
                    selected={fromDate}
                    name="fromdate"
                    onChange={handleFromDate}
                    dateFormat={"dd/MM/yyyy"}
                    showIcon
                  />
                </div>
              </div>
              <div>
                <span className='text-black font-bold'>To</span>
                <div>
                  <DatePicker
                    className="rounded-lg border border-black p-1"
                    selected={fromDate1}
                    name="fromdate"
                    onChange={handleFromDate1}
                    dateFormat={"dd/MM/yyyy"}
                    showIcon
                  />
                </div>
              </div>
              <div className='mt-2'>
              <button className='border rounded-md bg-[#2d2d2d] text-white p-2 font-bold hover:scale-105'>Download</button>
            </div>
            </div>
           )}

           {papup1 &&(
            
             <div className='content flex justify-center items-center h-screen'> 
              <div className='close-btn' onClick={handleClosePopup}>&times;</div>
             <div className='flex items-center justify-center'>
                 <div className='flex justify-center gap-4'>
                 <div className={`border-${a} ${b} p-6 rounded-lg cursor-pointer hover:scale-105 duration-50`} onClick={() => datastatus(500)}>
                 <span className='font-bold text-black'>Last-500</span>
                     </div>
                     <div className={`border-${a} ${b} p-6 rounded-lg cursor-pointer hover:scale-105 duration-50`} onClick={() => datastatus(1000)}>
                         <span className='font-bold text-black'>Last-1000</span>
                     </div>
                     <div className={`border-${a} ${b} p-6 rounded-lg cursor-pointer hover:scale-105 duration-50`} onClick={() => datastatus(2000)}>
                         <span className='font-bold text-black'>Last-2000</span>
                     </div>
                 </div>
              </div>
            </div>
           )}
           {papup4 &&(
            <div className='content flex justify-center items-center h-screen'> 
            <div className='close-btn' onClick={handleClosePopup}>&times;</div>
           <div className='flex items-center justify-center'>
               <div className='flex justify-center gap-4'>
                  <div className={`border-${a} ${b} p-6 rounded-lg cursor-pointer hover:scale-105 duration-50`}>
                    <span className='font-bold text-black'>500</span>
                    <p className='font-bold text-black'>Data</p>
                  </div>
                  <div className={`border-${a} ${b} p-6 rounded-lg cursor-pointer hover:scale-105 duration-50`}>
                      <span className='font-bold text-black'>5000</span>
                      <p className='font-bold text-black'>Data</p>
                  </div>
                  <div className={`border-${a} ${b} p-6 rounded-lg cursor-pointer hover:scale-105 duration-50`}>
                      <span className='font-bold text-black'>10000</span>
                      <p className='font-bold text-black'>Data</p>
                  </div>
               </div>
            </div>
          </div>
           )}
         </div>
       </div>
      )}
    </div>
  )
}

export default Reports
