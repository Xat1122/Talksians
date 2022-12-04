import React, { useRef, useState, useEffect } from "react";
import {
  HeaderContainer,
  IconContainer,
  SearchContainer,
  SearchInput,
  MyBadge,
  Roundbox,
  HeaderMiddle,
  IconOuterContainer,
  NotificationContainer,
} from "./Header.style";
import MyLogo from "../Logo/Logo";
import SearchIcon from "@mui/icons-material/Search";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import Avatar from "@mui/material/Avatar";
import { withTheme } from "styled-components";
import userImg from "../../../src/assets/user.png";
import { useLocation } from "react-router-dom";
import UserNotifcations from "../Notification/Notifcations";
import { API } from "../../services/api";
import { useSelector } from "react-redux";
const Header = (props) => {
  const [page, setpage] = useState("Home");
  const [checkuserImg, setCheckUserImg] = useState(userImg);
  const location = useLocation();
  const notificationRef = useRef(null);
  const selector = JSON.parse(localStorage.getItem("User"));

  const ActiveStyle = {
    style: { color: props.theme.colors.light, width: "30px", height: "30px" },
  };
  const NonActiveStyle = {
    style: {
      color: props.theme.colors.lightGray,
      width: "30px",
      height: "30px",
    },
  };
  const handleNotification = (e) => {
    e.preventDefault();
    notificationRef.current.style.display == "block"
      ? (notificationRef.current.style.display = "none")
      : (notificationRef.current.style.display = "block");
  };
  useEffect(() => {
    setpage(location.pathname.slice(1, location.pathname.length));
  }, []);
  const getMyProfile = async () => {
    let r = await API.get("/user/profile");
    console.log(r,"rrrrr");
    if (r) {
      if (r?.profileImage?.length > 0) {
        setCheckUserImg(r.profileImage);
      }
    }
  };
  useEffect(() => {
    getMyProfile();
  }, []);
  return (
    <HeaderContainer>
      <NotificationContainer
        ref={notificationRef}
        className="animate__animated animate__zoomIn"
      >
        <UserNotifcations
          type="request"
          text="shehryar send you friend request"
        />
        <UserNotifcations
          type="pagelike"
          text="asad invited you to like this page"
        />
        <UserNotifcations
          type="request"
          text="mateen send you friend request"
        />
        <UserNotifcations
          type="pagelike"
          text="rehan invited you to like this page"
        />
      </NotificationContainer>
      <MyLogo />
      <HeaderMiddle>
        <SearchContainer>
          <SearchIcon sx={{ color: "#ced4da" }} />
          <SearchInput type="text" placeholder="Search" />
        </SearchContainer>
        <IconOuterContainer active={page == "Home" ? true : false}>
          <HomeOutlinedIcon
            style={page == "Home" ? ActiveStyle.style : NonActiveStyle.style}
          />
        </IconOuterContainer>
        <IconOuterContainer active={page == "Userprofile" ? true : false}>
          <PersonOutlineOutlinedIcon
            style={
              page == "Userprofile" ? ActiveStyle.style : NonActiveStyle.style
            }
          />
        </IconOuterContainer>
        <IconOuterContainer active={page == "Groups" ? true : false}>
          <AutoGraphOutlinedIcon
            style={page == "Groups" ? ActiveStyle.style : NonActiveStyle.style}
          />
        </IconOuterContainer>
      </HeaderMiddle>

      <IconContainer>
        <MyBadge onClick={handleNotification}>
          <Roundbox />
          <NotificationsNoneIcon
            style={{
              color: props.theme.colors.light,
              width: "33px",
              height: "33px",
            }}
          />
        </MyBadge>
        <MyBadge>
          <Roundbox />
          <ChatBubbleOutlineIcon
            style={{
              color: props.theme.colors.light,
              width: "30px",
              height: "30px",
            }}
          />
        </MyBadge>
        <MyBadge>
          <SettingsIcon
            style={{
              color: props.theme.colors.light,
              width: "32px",
              height: "32px",
            }}
          />
        </MyBadge>
        <Avatar
          alt="Cindy Baker"
          src={checkuserImg}
          sx={{ cursor: "pointer" }}
        />
      </IconContainer>
    </HeaderContainer>
  );
};

export default withTheme(Header);
