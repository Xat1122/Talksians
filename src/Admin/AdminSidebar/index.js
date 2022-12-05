import React from "react";
import NotificationAvatar from "../../components/NotificationAvatar/NotificationAvatar";
import {
  SidebarNews,
  SidebarSetting,
} from "../../components/Sidebar/Sidebar.style";
import TvIcon from "@mui/icons-material/Tv";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import TokenOutlinedIcon from "@mui/icons-material/TokenOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { Link, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { DeleteUser } from "../../redux/action";
import { useDispatch } from "react-redux";
import BlockIcon from '@mui/icons-material/Block';

const AdminSidebar = () => {
  let dispatch=useDispatch()
  let navigate = useNavigate();
  const HandleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("Token");
    dispatch(DeleteUser());
    navigate("/");
  };
  return (
    <>
      <SidebarNews>
        <p>Admin Panel</p>
        <div className="Avatar-container">
          <NotificationAvatar
            gradient="linear-gradient(to right,#0575e6,#021b79)!important"
            txt="Home"
            link="/admin"
            icon={<TvIcon style={{ color: "white" }} />}
          />
         
          <NotificationAvatar
            gradient="linear-gradient(to right,#ee0979,#ff6a00)!important"
            txt="Reports"
            link="/admin-reports"
            icon={<BoltOutlinedIcon style={{ color: "white" }} />}
          />
           <NotificationAvatar
            gradient="linear-gradient(to right,#0575e6,#021b79)!important"
            txt="Groups Manage"
            link="/group-block-unblock"
            icon={<BlockIcon style={{ color: "white" }} />}
          />
          <NotificationAvatar
            gradient="linear-gradient(to right,#e44d26,#f16529)!important"
            txt="Requests"
            link="/admin-verifications"
            icon={<TokenOutlinedIcon style={{ color: "white" }} />}
          />
          <NotificationAvatar
            gradient="linear-gradient(to right,#0575e6,#021b79)!important"
            txt="Users Manage"
            link="/admin-block-unblock"
            icon={<BlockIcon style={{ color: "white" }} />}
          />
          {/* <NotificationAvatar gradient="linear-gradient(135deg,#A020F0,#6C0BA9)!important" txt="Notifications" link="/admin" icon={<NotificationsNoneOutlinedIcon style={{ color: 'white' }} />} /> */}
        </div>
      </SidebarNews>
      <SidebarSetting>
        <p>Account</p>
        <div className="Setting-container">
          <div>
            <LogoutIcon style={{ color: "#808191" }} />
            <a onClick={HandleLogout} style={{ cursor: "pointer" }}>
              Logout
            </a>
          </div>
        </div>
      </SidebarSetting>
    </>
  );
};

export default AdminSidebar;
