import React from 'react';
import { Outlet } from 'react-router-dom';

const OnlyOutlet = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
};

export default OnlyOutlet;
