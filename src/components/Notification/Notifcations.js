import React from "react";
import {
  UserNotifcationContainer,
  NotificationText,
  NotificationTextContainer,
  NotificationButtonContainer,
  NotificationButton,
} from "./Notification.style";
import Avatar from "@mui/material/Avatar";
import userImg from "../../../src/assets/user.png";
const UserNotifcations = ({
  type,
  text,
  borderBottom = "yes",
  acceptFriendRequest,
  rejectFriendRequest,
}) => {
  return (
    <UserNotifcationContainer borderBottom={borderBottom}>
      <Avatar alt="Cindy Baker" src={userImg} sx={{ cursor: "pointer" }} />
      <NotificationTextContainer>
        <NotificationText>{text}</NotificationText>
        {type == "request" && (
          <NotificationButtonContainer>
            <NotificationButton bgcolor color onClick={acceptFriendRequest}>
              Accept
            </NotificationButton>
            <NotificationButton onClick={rejectFriendRequest}>
              Decline
            </NotificationButton>
          </NotificationButtonContainer>
        )}
        {type == "pagelike" && (
          <NotificationButtonContainer>
            <NotificationButton bgcolor color>
              Like
            </NotificationButton>
            <NotificationButton>Delete</NotificationButton>
          </NotificationButtonContainer>
        )}
      </NotificationTextContainer>
    </UserNotifcationContainer>
  );
};

export default UserNotifcations;
