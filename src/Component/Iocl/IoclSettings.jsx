import React from 'react';
import IoclSidebar from "./IoclSidebar";

const IoclSettings = () => {
  return (
    <div className="flex md:h-screen text-sm md:text-base 2xl:text-2xl">
      {/* sidebar */}
      <div className="lg:w-[20%] xl:w-[15%] border border-black h-full">
        <IoclSidebar />
      </div>

      {/* main content */}
      <div className="w-full lg:w-[80%] xl:w-[85%] border border-black p-4 h-full">
        settings
      </div>
    </div>
  );
}

export default IoclSettings
