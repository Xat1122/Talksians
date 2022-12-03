import React, { useState, useEffect } from "react";
import { PostComment } from "./Post.style";
import Avatar from "@mui/material/Avatar";
import userImg from "../../../src/assets/user.png";
import { API } from "../../services/api";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
const PostComent = ({ comment, commentBy, commentId, postId, getData }) => {
  const [username, setusername] = useState("Mateen");
  const [profileImage, setprofileImage] = useState(userImg);
  const getUser = async () => {
    let r = await API.get(`/user/${commentBy}`);
    if (r) {
      setusername(r.firstName + " " + r.lastName);
      setprofileImage(r.profileImage);
    }
  };
  useEffect(() => {
    getUser();
  }, [commentBy]);
  const handleDeleteComment = async () => {
    let r = await API.delete(`/post/${postId}/${commentId}/delete-comment`);
    console.log(r);
    getData();
  };
  return (
    <div className="post-comment">
      <div className="commnet-left">
        <Avatar
          alt="Cindy Baker"
          src={profileImage}
          sx={{ cursor: "pointer" }}
        />
        <div className="post-header-content">
          <p className="person">{username} </p>
          <p className="hours">{comment}</p>
        </div>
      </div>
      <ClearIcon
        style={{ color: "#A020F0", cursor: "pointer" }}
        onClick={handleDeleteComment}
      />
    </div>
  );
};

export default PostComent;
