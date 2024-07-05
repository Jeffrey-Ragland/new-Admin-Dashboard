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
          {/* sidebar - desktop */}
          <div
            className=" h-full text-white"
            style={{
              background:
                "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
            }}
          >
            <div className="h-[25%]  p-4 flex flex-col justify-center items-center text-white font-semibold text-2xl 2xl:text-3xl">
              <img
                src={ioclLogo}
                className="max-w-[100px] 2xl:max-w-[150px] object-cover"
                alt="ioclLogo"
              />
              IndianOil
            </div>
            <div className="h-[55%]  font-medium p-4 flex flex-col justify-around">
              <Link to="/">
                <div
                  className={`  flex items-center gap-2 py-2 2xl:py-5 px-2 rounded-lg hover:bg-white hover:text-[#f47424] duration-200 ${
                    location.pathname === "/" ? "bg-white text-[#f47424]" : ""
                  }`}
                >
                  {location.pathname === "/" && (
                    <div className="text-[#f47424]">
                      <FaAnglesRight size={20} className="2xl:hidden" />
                      <FaAnglesRight size={25} className="hidden 2xl:block" />
                    </div>
                  )}
                  <div>
                    <AiOutlineDashboard size={25} className="2xl:hidden" />
                    <AiOutlineDashboard
                      size={30}
                      className="hidden 2xl:block"
                    />
                  </div>
                  <div>Dashboard</div>
                </div>
              </Link>
              <Link to="/ioclGraphs">
                <div
                  className={`  flex items-center gap-2 py-2 2xl:py-5 px-2 rounded-lg hover:bg-white hover:text-[#f47424] ${
                    location.pathname === "/ioclGraphs"
                      ? "bg-white text-[#f47424]"
                      : ""
                  } duration-200`}
                >
                  {location.pathname === "/ioclGraphs" && (
                    <div className="text-[#f47424]">
                      <FaAnglesRight size={20} className="2xl:hidden" />
                      <FaAnglesRight size={25} className="hidden 2xl:block" />
                    </div>
                  )}
                  <div>
                    <PiChartLineUp size={25} className="2xl:hidden" />
                    <PiChartLineUp size={30} className="hidden 2xl:block" />
                  </div>
                  <div>Graphs</div>
                </div>
              </Link>
              <Link to="/ioclReports">
                <div
                  className={` flex items-center gap-2 py-2 2xl:py-5 px-2 rounded-lg hover:bg-white hover:text-[#f47424] duration-200 ${
                    location.pathname === "/ioclReports"
                      ? "bg-white text-[#f47424]"
                      : ""
                  }`}
                >
                  {location.pathname === "/ioclReports" && (
                    <div className="text-[#f47424]">
                      <FaAnglesRight size={20} className="2xl:hidden" />
                      <FaAnglesRight size={25} className="hidden 2xl:block" />
                    </div>
                  )}
                  <div>
                    <TbReportSearch size={25} className="2xl:hidden" />
                    <TbReportSearch size={30} className="hidden 2xl:block" />
                  </div>
                  <div>Reports</div>
                </div>
              </Link>
              <Link to="/ioclSettings">
                <div
                  className={`  flex items-center gap-2 py-2 2xl:py-5 px-2 rounded-lg hover:bg-white hover:text-[#f47424] duration-200 ${
                    location.pathname === "/ioclSettings"
                      ? "bg-white text-[#f47424]"
                      : ""
                  }`}
                >
                  {location.pathname === "/ioclSettings" && (
                    <div className="text-[#f47424]">
                      <FaAnglesRight size={20} className="2xl:hidden" />
                      <FaAnglesRight size={25} className="hidden 2xl:block" />
                    </div>
                  )}
                  <div>
                    <MdOutlineSettings size={25} className="2xl:hidden" />
                    <MdOutlineSettings size={30} className="hidden 2xl:block" />
                  </div>
                  <div>Settings</div>
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 min-h-[20%]  p-4">
              <div className="text-sm 2xl:text-lg text-center">
                {" "}
                &copy; All Rights Reserved By
              </div>
              <div>
                <img
                  src={xymaLogo}
                  className="max-w-[100px] 2xl:max-w-[150px]"
                  alt="xymaLogo"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        // sidebar - mobile view
        <div
          className="bg-white w-full fixed bottom-0 text-white p-2 flex justify-evenly items-center z-10 h-[8vh]"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
          }}
        >
          <Link to="/">
            <div
              className={`  flex flex-col items-center gap-1 p-1 md:p-2 rounded-lg hover:bg-white hover:text-[#f47424] duration-200 ${
                location.pathname === "/" ? "bg-white text-[#f47424]" : ""
              }`}
            >
              <div>
                <AiOutlineDashboard size={25} />
              </div>
            </div>
          </Link>
          <Link to="/ioclGraphs">
            <div
              className={` flex flex-col items-center gap-1 p-1 md:p-2 rounded-lg hover:bg-white hover:text-[#f47424] ${
                location.pathname === "/ioclGraphs"
                  ? "bg-white text-[#f47424]"
                  : ""
              } duration-200`}
            >
              <div>
                <PiChartLineUp size={25} />
              </div>
            </div>
          </Link>
          <Link to="/ioclReports">
            <div
              className={` flex flex-col items-center gap-1 p-1 md:p-2 rounded-lg hover:bg-white hover:text-[#f47424] duration-200 ${
                location.pathname === "/ioclReports"
                  ? "bg-white text-[#f47424]"
                  : ""
              }`}
            >
              <div>
                <TbReportSearch size={25} />
              </div>
            </div>
          </Link>
          <Link to="/ioclSettings">
            <div
              className={`  flex flex-col items-center gap-1 p-1 md:p-2 rounded-lg hover:bg-white hover:text-[#f47424] duration-200 ${
                location.pathname === "/ioclSettings"
                  ? "bg-white text-[#f47424]"
                  : ""
              }`}
            >
              <div>
                <MdOutlineSettings size={25} />
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default IoclSidebar
