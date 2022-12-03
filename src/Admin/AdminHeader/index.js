import React, { useEffect } from "react";
import {
  HeaderContainer,
  HeaderMiddle,
  MyBadge,
  NotificationContainer,
  Roundbox,
} from "../../components/Header/Header.style";
import MyLogo from "../../components/Logo/Logo";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import UserNotifcations from "../../components/Notification/Notifcations";
import { useRef } from "react";
const AdminHeader = () => {
  const notificationRef = useRef(null);
  
  const handleNotification = (e) => {
    e.preventDefault();
    notificationRef.current.style.display == "block"
      ? (notificationRef.current.style.display = "none")
      : (notificationRef.current.style.display = "block");
  };
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
        <MyBadge onClick={handleNotification}>
          <Roundbox />
          <NotificationsNoneIcon
            style={{
              //   color: props.theme.colors.light,
              width: "33px",
              height: "33px",
            }}
          />
        </MyBadge>
        <p className="mx-3 border-2 p-2 rounded border-mainColor">
          Admin Panel
        </p>
      </HeaderMiddle>
    </HeaderContainer>
  );
};

export default AdminHeader;
