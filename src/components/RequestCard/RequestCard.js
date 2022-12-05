import React from "react";
import { CardContainer } from "./RequestCard.style";
import Avatar from "@mui/material/Avatar";
import userImg from "../../../src/assets/user.png";
import { useNavigate } from "react-router-dom";
const RequestCard = ({
  name,
  myfriend,
  type,
  acceptFriendRequest,
  rejectFriendRequest,
}) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    if (type == "search") {
      navigate("/Userprofile");
    }
  };
  return (
    <CardContainer onClick={handleClick}>
      <Avatar
        alt="Cindy Baker"
        src={userImg}
        sx={{ cursor: "pointer", width: "70px", height: "70px" }}
      />
      <h1>{name}</h1>
      {type == "search" && (
        <div className="button-container">
          <button className="confirm-button">Add Friend</button>
        </div>
      )}
      {myfriend == true && (
        <div className="button-container">
          <button className="confirm-button">Friend</button>
        </div>
      )}
      {(myfriend == false || myfriend == undefined) &&
        (type !== "search" || type == undefined) && (
          <div className="button-container">
            <button className="confirm-button" onClick={acceptFriendRequest}>
              Confirm
            </button>
            <button onClick={rejectFriendRequest}>Delete</button>
          </div>
        )}
    </CardContainer>
  );
};

export default RequestCard;
