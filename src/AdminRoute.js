import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const AdminRoute = () => {
  const selector = JSON.parse(localStorage.getItem("User"));
  const [userdata, setuserdata] = useState(selector);
  return userdata.role === "admin" ? <Outlet /> : <Navigate to="/Home" />;
};

export default AdminRoute;
