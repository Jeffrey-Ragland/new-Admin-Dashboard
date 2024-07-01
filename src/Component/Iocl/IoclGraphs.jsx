import React from 'react';
import IoclSidebar from './IoclSidebar';

const IoclGraphs = () => {
  return (
    <div className='flex h-screen'>
      {/* sidebar */}
      <div className="w-[15%] border border-black h-full">
        <IoclSidebar />
      </div>

      {/* main content */}
      <div className="w-[85%] border border-black p-4 h-full">
        graphs
      </div>
    </div>
  )
}

export default IoclGraphs
