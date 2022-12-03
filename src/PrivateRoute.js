import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoute = () => {
  let token = localStorage.getItem("Token");
  console.log(token)
    let auth = {'token':token}
    return (
        auth.token ? <Outlet/> : <Navigate to='/'/>
      )
}

export default PrivateRoute