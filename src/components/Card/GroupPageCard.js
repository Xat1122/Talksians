import React, { useState, useEffect } from "react";
import { GroupPageContainer } from "./Card.style";
import GroupImg from "../../assets/page.jpg";
import { Image } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import userImg from "../../../src/assets/user.png";
import { useSelector } from "react-redux";
import { API } from "../../services/api";
import { useNavigate } from "react-router-dom";
const GroupPageCard = ({
  id,
  page = null,
  Imgurl,
  myGroup = null,
  follow = null,
  creatorId = null,
  title = "",
  totalPosts = 0,
  totalMembers = 0,
  isMyGroup,
  type = "",
}) => {
  const selector = JSON.parse(localStorage.getItem("User"));
  const [userdata, setuserdata] = useState(selector);
  const [name, setname] = useState(
    userdata.firstName + " " + userdata.lastName
  );
  const [email, setemail] = useState(userdata.email);
  const [avatarImg, setavatarImg] = useState(userdata.profileImage);
  const navigate = useNavigate();
  const showButtonType = () => {
    if (myGroup !== null) {
      return (
        <button className="follow-btn" style={{ opacity: 0 }}>
          UnFollow
        </button>
      );
    } else if (follow !== null) {
      return follow === true ? (
        <button className="follow-btn">UnFollow</button>
      ) : (
        <button className="follow-btn">Follow</button>
      );
    } else if (page !== null) {
      return page === true ? (
        <button className="follow-btn">Like</button>
      ) : (
        <button className="follow-btn">Dislike</button>
      );
    } else {
    }
  };
  const getUser = async () => {
    if (creatorId !== null) {
      let r = await API.get(`/user/${creatorId}`);
      if (r) {
        setname(r.firstName + " " + r.lastName);
        setemail(r.email);
        setavatarImg(r.profileImage);
      }
    }
  };
  useEffect(() => {
    getUser();
  }, [creatorId]);
  const handleCardClick = (e) => {
    e.preventDefault();
    if (creatorId == userdata._id) {
      navigate(`/MyGroupPage/${id}`);
    } else {
      navigate(`/UserGroupPage/${id}`);
    }
  };

  const onClickButton = async () => {};

  return (
    <GroupPageContainer onClick={handleCardClick}>
      <div
        className="background-img"
        style={{ background: `url(${Imgurl})`, backgroundSize: "cover" }}
      ></div>
      <div className="card-body">
        {/* <div className='avatar-container'>
       <Avatar alt="Cindy Baker" src={avatarImg} sx={{cursor:"pointer",width:"70px",height:"70px"}}/>
       </div> */}

        <div className="group-content">
          <h5>{title}</h5>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p>{totalMembers + " Member"}</p>
            <p style={{ marginLeft: "10px" }}>{totalPosts + " Post"}</p>
          </div>
        </div>

        <div className="group-button-container">{showButtonType()}</div>
      </div>
    </GroupPageContainer>
  );
};

export default GroupPageCard;
