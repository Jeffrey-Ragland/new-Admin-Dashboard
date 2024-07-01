import React from 'react'
import { Outlet } from 'react-router-dom'
import BpclSideBar from '../Bpcl/BpclSideBar'
const OutletPage = () => {
  return (
    <div className='flex'>
    <div>
      <BpclSideBar/>
    </div>
     <div className='w-full md:w-[96%]'>
      <Outlet>
      </Outlet>
    </div>
  </div>
  )
}

export default OutletPage
