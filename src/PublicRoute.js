import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const PublicRoute = () => {
    let token = localStorage.getItem("Token");
    let auth = {'token':token}
    return (
        auth.token===false ? <Outlet/> : <Navigate to='/Home'/>
      )
}

export default PublicRoute