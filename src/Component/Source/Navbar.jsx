import React from 'react'
import Xyma from '../Assets/xyma.png'
const Navbar = () => {
  return (
    <div className='flex justify-between'>
      <img src={Xyma} className='w-24 ml-2'/>
      <img src={Xyma} className='w-24 mr-2'/>
    </div>
  )
}

export default Navbar
