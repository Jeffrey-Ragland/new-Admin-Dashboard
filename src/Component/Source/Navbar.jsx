import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Xyma from '../Assets/xyma - Copy.png';
const Navbar = () => {

  const location = useLocation();

  return (
    <div className="flex justify-between items-center px-2">
      <img src={Xyma} className="w-24" />

      <div className="text-white texl-xl xl:text-2xl 2xl:text-3xl font-medium underline">
        {location.pathname === "/" && <div>Dashboard</div>}

        {location.pathname === "/Graph" && <div>Graphical Representation</div>}

        {location.pathname === "/Report" && <div>Report Generation</div>}

        {location.pathname === "/Settings" && <div>Settings</div>}
      </div>

      <Link to="/login" className="hover:scale-110 duration-200">
        <span
          className=" py-1 px-2 2xl:py-2 2xl:px-4 text-white font-medium text-sm 2xl:text-lg rounded-md "
          style={{
            background: "linear-gradient(90deg, #f22213 0%, #f03f32 100%)",
          }}
          onClick={() => {
            localStorage.clear();
          }}
        >
          Logout
        </span>
      </Link>
    </div>
  );
};

export default Navbar;
