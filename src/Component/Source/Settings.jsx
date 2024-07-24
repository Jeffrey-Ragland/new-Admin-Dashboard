import React from 'react';
import Navbar from "./Navbar";

const Settings = () => {
  return (
    <>
      <div className="xl:h-screen flex flex-col 2xl:text-2xl">
        {/* navbar */}
        <div className="h-[7%]">
          <Navbar />
        </div>

        {/* main content */}
        <div className='h-[93%]'>
          
        </div>
      </div>
    </>
  );
}

export default Settings
