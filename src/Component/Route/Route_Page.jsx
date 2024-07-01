import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Route_Page = () => {
    const token = localStorage.getItem('token')
    if(token){
        return <Outlet/>
    }else{
        return<Navigate to={'/login'}/>;
    }
}

export default Route_Page
