import React from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { IoBarChartOutline } from "react-icons/io5";
import { GrDocumentDownload } from "react-icons/gr";
import { LiaToolsSolid } from "react-icons/lia";
import { useState } from 'react';

const Sidebar = () => {
    const [dashHover, setDashHover] = useState(false);
    const [graphHover, setGraphHover] = useState(false);
    const [reportHover, setReportHover] = useState(false);
    const [settingsHover, setSettingsHover] = useState(false);

    const [isLargeScreen, setIsLargeScreen] = useState(
      window.innerWidth >= 1280
    );
    const location = useLocation();

    useEffect(() => {
      const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 1280);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    
  return (
    <>
      {/* background-image: linear-gradient(); */}
      {isLargeScreen ? (
        <div
          className="flex flex-col h-screen text-gray-100"
          style={{
            background:
              "linear-gradient(to right, #161d27, #1c222b, #23272f, #292d34, #2f3238)",
          }}
        >
          <Link
            to="/"
            className={`h-1/4 p-2 hover:bg-gray-600 duration-200 flex items-center ${
              location.pathname === "/" && "bg-gray-600"
            }`}
            onMouseEnter={() => setDashHover(true)}
            onMouseLeave={() => setDashHover(false)}
          >
            <div>
              <RxDashboard size={25} />
            </div>
            {dashHover && (
              <div className="absolute ml-9 bg-gray-600 p-1 rounded-full text-xs">
                Dashboard
              </div>
            )}
          </Link>

          <Link
            to="/Graph"
            className={`h-1/4 p-2 hover:bg-gray-600 duration-200 flex items-center ${
              location.pathname === "/Graph" && "bg-gray-600"
            }`}
            onMouseEnter={() => setGraphHover(true)}
            onMouseLeave={() => setGraphHover(false)}
          >
            <div>
              <IoBarChartOutline size={25} />
            </div>
            {graphHover && (
              <div className="absolute ml-9 bg-gray-600 p-1 rounded-full text-xs">
                Graphs
              </div>
            )}
          </Link>

          <Link
            to="/Report"
            className={`h-1/4 p-2 hover:bg-gray-600 duration-200 flex items-center ${
              location.pathname === "/Report" && "bg-gray-600"
            }`}
            onMouseEnter={() => setReportHover(true)}
            onMouseLeave={() => setReportHover(false)}
          >
            <div>
              <GrDocumentDownload size={25} />
            </div>
            {reportHover && (
              <div className="absolute ml-9 bg-gray-600 p-1 rounded-full text-xs">
                Reports
              </div>
            )}
          </Link>

          <Link
            to="/Settings"
            className={`h-1/4 p-2 hover:bg-gray-600 duration-200 flex items-center ${
              location.pathname === "/Settings" && "bg-gray-600"
            }`}
            onMouseEnter={() => setSettingsHover(true)}
            onMouseLeave={() => setSettingsHover(false)}
          >
            <div>
              <LiaToolsSolid size={25} />
            </div>
            {settingsHover && (
              <div className="absolute ml-9 bg-gray-600 p-1 rounded-full text-xs">
                Settings
              </div>
            )}
          </Link>
        </div>
      ) : (
        // mobile view bottom navbar
        <div className="bg-gray-900 w-full fixed bottom-0 text-gray-100 p-2 flex justify-evenly items-center z-10 h-[8vh]">
          <Link
            to="/"
            className={`p-2 duration-200 flex items-center rounded-xl ${
              location.pathname === "/" && "bg-gray-200 text-gray-800"
            }`}
            onMouseEnter={() => setDashHover(true)}
            onMouseLeave={() => setDashHover(false)}
          >
            <div>
              <RxDashboard size={25} />
            </div>
          </Link>

          <Link
            to="/Graph"
            className={`p-2 duration-200 flex items-center rounded-xl ${
              location.pathname === "/Graph" && "bg-gray-200 text-gray-800"
            }`}
            onMouseEnter={() => setGraphHover(true)}
            onMouseLeave={() => setGraphHover(false)}
          >
            <div>
              <IoBarChartOutline size={25} />
            </div>
          </Link>

          <Link
            to="/Report"
            className={`p-2 duration-200 flex items-center rounded-xl ${
              location.pathname === "/Report" && "bg-gray-200 text-gray-800"
            }`}
            onMouseEnter={() => setReportHover(true)}
            onMouseLeave={() => setReportHover(false)}
          >
            <div>
              <GrDocumentDownload size={25} />
            </div>
          </Link>

          <Link
            to="/Settings"
            className={`p-2 duration-200 flex items-center rounded-xl ${
              location.pathname === "/Settings" && "bg-gray-200 text-gray-800"
            }`}
            onMouseEnter={() => setSettingsHover(true)}
            onMouseLeave={() => setSettingsHover(false)}
          >
            <div>
              <LiaToolsSolid size={25} />
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default Sidebar
