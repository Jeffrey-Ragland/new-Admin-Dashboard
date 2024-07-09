import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Source/Sidebar'
const Source_Outlet = () => {
    return (
    <div className='flex'>
        <div>
            <Sidebar/>
        </div>
         <div className='w-full'>
             <Outlet/>
        </div>
    </div>
    )
}

export default Source_Outlet
