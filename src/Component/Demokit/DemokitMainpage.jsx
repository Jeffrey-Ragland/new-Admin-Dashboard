import React from 'react';
import { Link } from 'react-router-dom';
import xymaLogo from '../Assets/xyma - Copy.png';

const DemokitMainpage = () => {
  return (
    <div
      className="h-screen text-white p-2 flex flex-col gap-4"
      style={{
        background: "radial-gradient(circle, #525257 0%, #2c2c2c 50%)",
      }}
    >
      {/* top bar */}
      <div className="flex justify-between">
        <img src={xymaLogo} alt="logo" className="max-h-10" />
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
      <center className="text-base md:text-xl font-medium">
        Sensor for Critical Parameter Measurements
      </center>

      <div className="flex-1 flex flex-col md:flex-row justify-evenly md:justify-around items-center font-medium">
        <Link to="/utmaps">
          <button
            className="py-2 px-6 w-40 rounded-md hover:scale-110 duration-200 text-lg border border-orange-400 hover:border-4"
            style={{
              background: "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
            }}
          >
            μTMapS
          </button>
        </Link>

        <Link to="/ports">
          <button
            className="py-2 px-6 w-40 rounded-md hover:scale-110 duration-200 text-lg border border-orange-400 hover:border-4"
            style={{
              background: "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
            }}
          >
            PoRTS
          </button>
        </Link>

        <Link to="/ztar">
          <button
            className="py-2 px-6 w-40 rounded-md hover:scale-110 duration-200 text-lg border border-orange-400 hover:border-4"
            style={{
              background: "linear-gradient(180deg, #75736f 0%, #3d3c3a 100%)",
            }}
          >
            Ztar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DemokitMainpage
