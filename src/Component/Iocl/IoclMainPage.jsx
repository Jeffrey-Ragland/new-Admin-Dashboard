import React from 'react'
import { Link } from 'react-router-dom';
import IoclSidebar from './IoclSidebar';

const IoclMainPage = () => {
  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <div className="w-[15%] border border-black h-full">
        <IoclSidebar />
      </div>

      {/* main content */}
      <div className="w-[85%] border border-black p-4 h-full">
        {/* header */}
        <div className="flex justify-between h-[5%] border border-black ">
          <div>Activity Status</div>
          <div>IOCL Dashboard</div>
          <Link to="/login">
            <span
              className="border border-black p-1 bg-red-400"
              onClick={() => {
                localStorage.removeItem("Project");
                localStorage.removeItem("token");
                localStorage.removeItem("Controles");
              }}
            >
              logout
            </span>
          </Link>
        </div>

        {/* content */}
        <div className="flex h-[95%] border border-black ">
          {/* cards */}
          <div className="w-[20%] border border-black flex flex-col gap-2 p-2 text-white">
            <div
              className="h-1/4 rounded-md"
              style={{
                background:
                  "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
              }}
            >
              Last Update
            </div>
            <div
              className="h-1/4 rounded-md "
              style={{
                background:
                  "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
              }}
            >
              Sensor 1
            </div>
            <div
              className="h-1/4 rounded-md "
              style={{
                background:
                  "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
              }}
            >
              Sensor 2
            </div>
            <div
              className="h-1/4 rounded-md "
              style={{
                background:
                  "linear-gradient(90deg, rgba(2,22,79,255) 0%, #02306b 100%)",
              }}
            >
              Sensor 3
            </div>
          </div>

          {/* graphs and table */}
          <div className="w-[80%] border border-black p-2 flex flex-col gap-2">
            {/* line graph */}
            <div className="h-1/2 border border-black bg-white"> Line graph</div>
            <div className="h-1/2 flex gap-2 border border-black">
              <div className="w-1/2 border border-black bg-white"> table </div>
              <div className="w-1/2 border border-black bg-white"> bar chart </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IoclMainPage
