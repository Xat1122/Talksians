import React, { useState, useEffect } from "react";
import { GroupPageContainer } from "./Card.style";
import GroupImg from "../../assets/page.jpg";
import { Image } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import userImg from "../../../src/assets/user.png";
import { useSelector } from "react-redux";
import { API } from "../../services/api";
import { useNavigate } from "react-router-dom";
const ProfilePageCard = ({
  id,
  page = null,
  Imgurl,
  creatorId = null,
  name = "",
  isMyGroup,
  type = "",
}) => {
  const user = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate();
  const showButtonType = () => {};

  useEffect(() => {
    // getUser();
  }, [creatorId]);
  const handleCardClick = (e) => {
    e.preventDefault();
    // if (creatorId == user._id) {
    //   navigate(`/MyGroupPage/${id}`);
    // } else {
    //   navigate(`/UserGroupPage/${id}`);
    // }
  };

  return (
    <GroupPageContainer onClick={handleCardClick}>
      <div
        className="background-img"
        style={{ background: `url(${Imgurl})`, backgroundSize: "cover" }}
      ></div>
      <div className="card-body">
        <div className="avatar-container">
          {/* <Avatar
            alt="Cindy Baker"
            src={avatarImg}
            sx={{ cursor: "pointer", width: "70px", height: "70px" }}
          /> */}
        </div>

        <div className="group-content">
          <h5>{name}</h5>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p>{name}</p>
            {/* <p style={{ marginLeft: "10px" }}>{totalPosts + " Post"}</p> */}
          </div>
        </div>

        <div className="group-button-container">{"member"}</div>
      </div>
    </GroupPageContainer>
  );
};

export default ProfilePageCard;
