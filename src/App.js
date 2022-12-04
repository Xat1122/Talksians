import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Login from "./pages/Login/Login";
import Userprofile from "./pages/UserProfile/Userprofile";
import Userdashboard from "./pages/UserDashboard/Userdashboard";
import Signup from "./pages/Signup/Signup";
import Setting from "./pages/Setting/Setting";
import AccountInformation from "./pages/AccountInformation/AccountInformation";
import Password from "./pages/Password/Password";
import Request from "./pages/RequestPage/Request";
import AllGroupPage from "./pages/AllGroupPage/AllGroupPage";
import AllPages from "./pages/AllPages/AllPages";
import MyProfile from "./pages/MyProfile/MyProfile";
import Friends from "./pages/Friends/Friends";
import AccountRecovery from "./pages/AccountRecovery/AccountRecovery";
import CreateGroup from "./pages/CreateGroup/CreateGroup";
import CreatePage from "./pages/CreatePage/CreatePage";
import Library from "./pages/Library/Library";
import Chat from "./pages/Chat/Chat";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import MyGroupPage from "./pages/MyGroupPage/MyGroupPage";
import UserGroupPage from "./pages/UserGroupPage/UserGroupPage";
import axios from "axios";
import Catagories from "./pages/Library/Catagories";
import Material from "./pages/Library/Material";
import Admin from "./Admin";
import AdminReports from "./Admin/AdminReports";
import AdminVerification from "./Admin/AdminVerification";
import Page from "./pages/Page/Page";
import UpdatePage from "./pages/UpdatePage/UpdatePage";
import { useState } from "react";

const theme = {
  colors: {
    primary: "#6C0BA9",
    light: "#A020F0",
    txtColor: "#000",
    WhiteColor: "#fff",
    headingColor: "#A020F0",
    lightGray: "#A9A9A9",
    gray: "#eee",
    darkgray: "#696969",
    notficationColor: "#fe9431",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/UserProfile" element={<Userprofile />} />
            <Route exact path="/UserProfile/:id" element={<Userprofile />} />
            <Route exact path="/Home" element={<Userdashboard />} />
            <Route exact path="/Setting" element={<Setting />} />
            <Route
              exact
              path="/AccountInformation"
              element={<AccountInformation />}
            />
            <Route exact path="/Password" element={<Password />} />
            <Route exact path="/Request" element={<Request />} />
            <Route exact path="/allGroups" element={<AllGroupPage />} />
            <Route exact path="/allPages" element={<AllPages />} />
            <Route exact path="/Page/:id" element={<Page />} />
            <Route exact path="/MyProfile" element={<MyProfile />} />
            <Route exact path="/friends" element={<Friends />} />
            <Route exact path="/Library" element={<Library />} />
            <Route exact path="/Catagory/:id" element={<Catagories />} />
            <Route exact path="/Material/:id" element={<Material />} />
            <Route exact path="/CreateGroup" element={<CreateGroup />} />
            <Route exact path="/CreatePage" element={<CreatePage />} />
            <Route exact path="/UpdatePage/:id" element={<UpdatePage />} />
            <Route exact path="/Chat" element={<Chat />} />
            <Route exact path="/MyGroupPage/:id" element={<MyGroupPage />} />
            <Route
              exact
              path="/UserGroupPage/:id"
              element={<UserGroupPage />}
            />
          </Route>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/AccountRecovery" element={<AccountRecovery />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/admin-reports" element={<AdminReports />} />
          <Route
            exact
            path="/admin-verifications"
            element={<AdminVerification />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
