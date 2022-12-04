import React, { useState, useEffect } from "react";
import { GroupPageContainer } from "./PageCard.style";
import GroupImg from "../../assets/page.jpg";
import { Image } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import userImg from "../../../src/assets/user.png";
import { useSelector } from "react-redux";
import { API } from "../../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const GroupPageCard = ({ page,getAllPagesFromActions }) => {
  const selector = JSON.parse(localStorage.getItem("User"));
  const [userdata, setuserdata] = useState(selector);
  console.log(userdata, "userdata");
  // const [name, setname] = useState(userdata.firstName + " " + userdata.lastName)
  // const [email, setemail] = useState(userdata.email)
  // const [avatarImg, setavatarImg] = useState(userdata.profileImage)
  const navigate = useNavigate();
  // const showButtonType = () => {
  //   if (myGroup !== null) {
  //     return <button className="follow-btn" style={{ opacity: 0 }}>UnFollow</button>
  //   } else if (follow !== null) {
  //     return follow === true ? <button className="follow-btn">UnFollow</button> : <button className="follow-btn">Follow</button>
  //   }
  //   else if (page !== null) {
  //     return page === true ? <button className="follow-btn">Like</button> : <button className="follow-btn">Dislike</button>
  //   } else {

  //   }
  // }
  // const getUser = async () => {
  //   if (creatorId !== null) {
  //     let r = await API.get(`/user/${creatorId}`)
  //     if (r) {
  //       setname(r.firstName + " " + r.lastName)
  //       setemail(r.email)
  //       setavatarImg(r.profileImage)
  //     }
  //   }

  // }
  // useEffect(() => {
  //   getUser();
  // }, [creatorId])

  const showButtonType = () => {
    const findUser = page.likedBy.find((like) => like.user === userdata._id);
    if (findUser) {
      return "Liked";
    }
    return "Like";
  };

  const likePageHandler = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/page/${page._id}/like`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        console.log(res.data, "res.data");
        getAllPagesFromActions()
      });
  };

  const unlikePageHandler = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/page/${page._id}/unlike`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        console.log(res.data, "res.data");
        getAllPagesFromActions()
      });
  };
  const handleCardClick = (id) => {
    navigate(`/Page/${id}`);
  };
  return (
    <GroupPageContainer>
      <div
        className="background-img"
        style={{
          background: `url(${page.coverImage})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="card-body">
        <div className="avatar-container">
          <Avatar
            alt="Cindy Baker"
            src={page.logo}
            sx={{ cursor: "pointer", width: "70px", height: "70px" }}
          />
        </div>
        <div className="group-content">
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>
        <div className="group-button-container">
          <button
            className="follow-btn mr-2"
            onClick={
              showButtonType() === "Like" ? likePageHandler : unlikePageHandler
            }
          >
            {showButtonType()}
          </button>
          <button
            className="follow-btn"
            onClick={() => handleCardClick(page._id)}
          >
            Visit Page
          </button>
        </div>
      </div>
    </GroupPageContainer>
  );
};

export default GroupPageCard;
