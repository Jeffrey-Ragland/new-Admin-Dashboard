import React from 'react';
import { Link } from 'react-router-dom';
import Xyma from '../Assets/xyma - Copy.png';
const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-2">
      <img src={Xyma} className="w-24" />
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
