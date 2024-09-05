import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import xymaLogo from '../Assets/xyma - Copy.png';
import homePageCover from '../Assets/homePage.png';
import { BsThermometerSun } from "react-icons/bs";
import { BiWater } from "react-icons/bi";

const DemokitMainpage = () => {

  const handleProjectChange = async (projectName) => {
    try {
      await axios.post("http://34.93.162.58:4000/sensor/updateProcessControl", {
      // await axios.post("http://localhost:4000/sensor/updateProcessControl", {
        projectName,
      });
    } catch(error) {
      console.error('Error updating project', error);
    };
  };

  return (
    <div
      className="h-screen text-white p-2 flex flex-col gap-4"
      style={{
        // background: "radial-gradient(circle, #525257 0%, #2c2c2c 50%)",
        backgroundImage: `url(${homePageCover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* top bar */}
      <div className="flex justify-between items-center">
        <img src={xymaLogo} alt="logo" className="max-h-10 2xl:max-h-16" />
        <Link to="/login">
          <button
            className=" py-1 pb-2 px-2 text-white font-medium text-sm 2xl:text-lg rounded-md hover:scale-110 duration-200"
            style={{
              background: "linear-gradient(90deg, #f22213 0%, #f03f32 100%)",
            }}
            onClick={() => {
              localStorage.clear();
            }}
          >
            Logout
          </button>
        </Link>
      </div>

      {/* title */}
      <center className="text-base md:text-xl 2xl:text-3xl font-medium">
        Sensor for Critical Parameter Measurements
      </center>

      <div className="flex-1 flex flex-col md:flex-row justify-evenly items-center font-medium text-lg 2xl:text-2xl">
        <div>
          <div className="flex justify-center mb-4 text-6xl xl:text-7xl 2xl:text-8xl">
            <BsThermometerSun />
          </div>
          <Link to="/utmaps">
            <button
              className="py-2 px-6 2xl:py-4 w-40 2xl:w-80 rounded-md hover:scale-110 duration-200  border border-white hover:border-4"
              style={{
                background: "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
              }}
              onClick={() => handleProjectChange("utmaps")}
            >
              μTMapS
            </button>
          </Link>
        </div>

        {/* <Link to="/ports">
          <button
            className="py-2 px-6 2xl:py-4 w-40 2xl:w-80 rounded-md hover:scale-110 duration-200  border border-white hover:border-4"
            style={{
              background: "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
            }}
          >
            PoRTS
          </button>
        </Link> */}

        <div>
          <div className="flex justify-center mb-4 text-6xl xl:text-7xl 2xl:text-8xl">
            <BiWater />
          </div>
          <Link to="/ztar">
            <button
              className="py-2 px-6 2xl:py-4 w-40 2xl:w-80 rounded-md hover:scale-110 duration-200  border border-white hover:border-4"
              style={{
                background: "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
              }}
              onClick={() => handleProjectChange("ztar")}
            >
              Ztar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DemokitMainpage
