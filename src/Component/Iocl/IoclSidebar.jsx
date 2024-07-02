import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ioclLogo from "../Assets/ioclRound.png";
import xymaLogo from "../Assets/xyma - Copy.png";
import { AiOutlineDashboard } from "react-icons/ai";
import { PiChartLineUp } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { FaAnglesRight } from "react-icons/fa6";

const IoclSidebar = () => {

  const location = useLocation();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isLargeScreen ? (
        <>
          <div
            className=" h-full text-white"
            style={{
              background:
                "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
            }}
          >
            <div className="h-[25%]  p-4 flex justify-center items-center">
              <img
                src={ioclLogo}
                className="max-w-[100px] object-cover"
                alt="ioclLogo"
              />
            </div>
            <div className="h-[55%]  font-medium p-4 flex flex-col justify-around">
              <Link to="/">
                <div
                  className={`  flex items-center gap-2 py-4 px-2 rounded-lg hover:bg-white hover:text-[#08174e] duration-200 ${
                    location.pathname === "/" ? "bg-white text-[#08174e]" : ""
                  }`}
                >
                  {location.pathname === "/" && (
                    <div className="text-[#08174e]">
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
                  className={`  flex items-center gap-2 py-4 px-2 rounded-lg hover:bg-white hover:text-[#08174e] ${
                    location.pathname === "/ioclGraphs"
                      ? "bg-white text-[#08174e]"
                      : ""
                  } duration-200`}
                >
                  {location.pathname === "/ioclGraphs" && (
                    <div className="text-[#08174e]">
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
                  className={` flex items-center gap-2 py-4 px-2 rounded-lg hover:bg-white hover:text-[#08174e] duration-200 ${
                    location.pathname === "/ioclReports"
                      ? "bg-white text-[#08174e]"
                      : ""
                  }`}
                >
                  {location.pathname === "/ioclReports" && (
                    <div className="text-[#08174e]">
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
                  className={`  flex items-center gap-2 py-4 px-2 rounded-lg hover:bg-white hover:text-[#08174e] duration-200 ${
                    location.pathname === "/ioclSettings"
                      ? "bg-white text-[#08174e]"
                      : ""
                  }`}
                >
                  {location.pathname === "/ioclSettings" && (
                    <div className="text-[#08174e]">
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
            <div className="flex flex-col items-center justify-center gap-2 min-h-[20%]  p-4">
              <div className="text-sm text-center">
                {" "}
                &copy; All Rights Reserved By
              </div>
              <div>
                <img src={xymaLogo} className="max-w-[100px]" alt="xymaLogo" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className="bg-white w-full fixed bottom-0 text-white p-2 flex justify-evenly"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
          }}
        >
          <Link to="/">
            <div
              className={`  flex flex-col items-center gap-1 p-1 rounded-lg hover:bg-white hover:text-[#08174e] duration-200 ${
                location.pathname === "/" ? "bg-white text-[#08174e]" : ""
              }`}
            >
              <div>
                <AiOutlineDashboard size={25} />
              </div>
              {/* <div className="text-[10px]">Dashboard</div> */}
            </div>
          </Link>
          <Link to="/ioclGraphs">
            <div
              className={` flex flex-col items-center gap-1 p-1 rounded-lg hover:bg-white hover:text-[#08174e] ${
                location.pathname === "/ioclGraphs"
                  ? "bg-white text-[#08174e]"
                  : ""
              } duration-200`}
            >
              <div>
                <PiChartLineUp size={25} />
              </div>
              {/* <div className="text-[10px]">Graphs</div> */}
            </div>
          </Link>
          <Link to="/ioclReports">
            <div
              className={` flex flex-col items-center gap-1 p-1 rounded-lg hover:bg-white hover:text-[#08174e] duration-200 ${
                location.pathname === "/ioclReports"
                  ? "bg-white text-[#08174e]"
                  : ""
              }`}
            >
              <div>
                <TbReportSearch size={25} />
              </div>
              {/* <div className="text-[10px]">Reports</div> */}
            </div>
          </Link>
          <Link to="/ioclSettings">
            <div
              className={`  flex flex-col items-center gap-1 p-1 rounded-lg hover:bg-white hover:text-[#08174e] duration-200 ${
                location.pathname === "/ioclSettings"
                  ? "bg-white text-[#08174e]"
                  : ""
              }`}
            >
              <div>
                <MdOutlineSettings size={25} />
              </div>
              {/* <div className="text-[10px]">Settings</div> */}
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default IoclSidebar
