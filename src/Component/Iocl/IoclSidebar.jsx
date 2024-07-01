import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ioclLogo from "../Assets/iocl2.png";
import xymaLogo from "../Assets/xyma.png";
import { AiOutlineDashboard } from "react-icons/ai";
import { PiChartLineUp } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { FaAnglesRight } from "react-icons/fa6";

const IoclSidebar = () => {

  const [dashboardEnter, setDashboardEnter] = useState(false);
  const [graphsEnter, setGraphsEnter] = useState(false);
  const [reportsEnter, setReportsEnter] = useState(false);
  const [settingsEnter, setSettingsEnter] = useState(false);

  const location = useLocation();

  return (
    <div className="border border-black h-full">
      <div className="min-h-[25%] border border-black p-4 flex justify-center items-center">
        <img
          src={ioclLogo}
          className="max-w-[100px] object-cover"
          alt="ioclLogo"
        />
      </div>
      <div className="h-[55%] border border-black font-medium text-gray-800">
        <Link to="/">
          <div
            className={`border border-black h-1/4 flex items-center gap-2 p-2 hover:bg-white duration-200 ${
              location.pathname === "/" ? "bg-white" : ""
            }`}
            onMouseEnter={() => setDashboardEnter(true)}
            onMouseLeave={() => setDashboardEnter(false)}
          >
            {(dashboardEnter || location.pathname === "/") && (
              <div className="text-[#f3741c]">
                <FaAnglesRight size={20} />
              </div>
            )}
            <div>
              <AiOutlineDashboard size={25} />
            </div>
            <div>Dashboard</div>
          </div>
        </Link>
        <Link to="/ioclGraphs">
          <div
            className={`border border-black h-1/4 flex items-center gap-2 p-2 hover:bg-white ${
              location.pathname === "/ioclGraphs" ? "bg-white" : ""
            } duration-200`}
            onMouseEnter={() => setGraphsEnter(true)}
            onMouseLeave={() => setGraphsEnter(false)}
          >
            {(graphsEnter || location.pathname === "/ioclGraphs") && (
              <div className="text-[#f3741c]">
                <FaAnglesRight size={20} />
              </div>
            )}
            <div>
              <PiChartLineUp size={25} />
            </div>
            <div>Graphs</div>
          </div>
        </Link>
        <Link to="/ioclReports">
          <div
            className={`border border-black h-1/4 flex items-center gap-2 p-2 hover:bg-white duration-200 ${
              location.pathname === "/ioclReports" ? "bg-white" : ""
            }`} 
            onMouseEnter={() => setReportsEnter(true)}
            onMouseLeave={() => setReportsEnter(false)}
          >
            {(reportsEnter || location.pathname === "/ioclReports") && (
              <div className="text-[#f3741c]">
                <FaAnglesRight size={20} />
              </div>
            )}
            <div>
              <TbReportSearch size={25} />
            </div>
            <div>Reports</div>
          </div>
        </Link>
        <Link to="/ioclSettings">
          <div
            className={`border border-black h-1/4 flex items-center gap-2 p-2 hover:bg-white duration-200 ${
              location.pathname === "/ioclSettings" ? "bg-white" : ""
            }`}
            onMouseEnter={() => setSettingsEnter(true)}
            onMouseLeave={() => setSettingsEnter(false)}
          >
            {(settingsEnter || location.pathname === "/ioclSettings") && (
              <div className="text-[#f3741c]">
                <FaAnglesRight size={20} />
              </div>
            )}
            <div>
              <MdOutlineSettings size={25} />
            </div>
            <div>Settings</div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 min-h-[20%] border border-black p-4">
        <div className="text-sm text-center">All Rights Reserved By</div>
        <div>
          <img src={xymaLogo} className="max-w-[100px]" alt="xymaLogo" />
        </div>
      </div>
    </div>
  );
}

export default IoclSidebar
