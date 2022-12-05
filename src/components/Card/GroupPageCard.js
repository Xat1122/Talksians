import React, { useState, useEffect } from "react";
import { GroupPageContainer } from "./Card.style";
import GroupImg from "../../assets/page.jpg";
import { Button, Image } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import userImg from "../../../src/assets/user.png";
import { useSelector } from "react-redux";
import { API } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const token = localStorage.getItem("Token");

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
  totalMembersl = [],
  isMyGroup,
  type = "",
}) => {
  const selector = JSON.parse(localStorage.getItem("User"));
  const [userdata, setuserdata] = useState(selector);
  const [loading, setLoading] = useState(false);
  const [name, setname] = useState(
    userdata.firstName + " " + userdata.lastName
  );
  const [email, setemail] = useState(userdata.email);
  const [avatarImg, setavatarImg] = useState(userdata.profileImage);
  const navigate = useNavigate();
  const notify = (Message) => toast(Message);

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
      if (ShowFollowButton() === false) {
        navigate(`/MyGroupPage/${id}`);
      } else {
        notify(
          "You are not allowed to visit the group please follow the group"
        );
      }
      // navigate(`/UserGroupPage/${id}`);
    }
  };

  const followPage = () => {
    setLoading(true);
    axios(`${process.env.REACT_APP_BASE_URL}/group/${id}/follow-request`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoading(false);
        notify("Follow request sent");
      })
      .catch((e) => {
        setLoading(false);
        notify("Request already sent");
        console.log(e);
      });
  };
  const ShowFollowButton = () => {
    const ShowBtn = totalMembersl?.find((m) => {
      console.log(m, "mmm");
      return m.user === userdata._id;
    });
    if (ShowBtn !== undefined || userdata._id === creatorId) {
      return false;
    }
    console.log(ShowBtn, "ahowbutton");
    console.log(totalMembersl.length, "totalMembers");
    return true;
  };
  const onClickButton = async () => {};

  return (
    <>
      <GroupPageContainer>
        {/* <GroupPageContainer onClick={handleCardClick}> */}
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
        <div className="pl-4 pt-2">
          {ShowFollowButton() && userdata._id !== creatorId && (
            <Button variant="primary" onClick={followPage}>
              Follow
            </Button>
          )}
          <Button variant="primary" className="ml-2" onClick={handleCardClick}>
            Visit page
          </Button>
        </div>
      </GroupPageContainer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default GroupPageCard;
