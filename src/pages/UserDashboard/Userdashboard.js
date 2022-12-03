import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  DashboardMidContainer,
  CreatePostContainer,
  AllPostContainer,
} from "./UserDashboard.style";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Avatar from "@mui/material/Avatar";
import userImg from "../../../src/assets/user.png";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { Image, Spinner } from "react-bootstrap";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import Post from "../../components/Post/Post";
import RightSidebar from "../../components/Sidebar/RightSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/api";
import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
const Userdashboard = () => {
  const [img, setImg] = useState("");
  const [AllPost, setAllPost] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [postType, setpostType] = useState("Public");
  const postRef = useRef(null);
  const selector = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();
  const [mydata, setmydata] = useState({
    email: "",
    firstName: "",
    lastName: "",
    profileImage: "",
    images: [],
    registerationNo: "",
  });

  const [postdata, setpostdata] = useState({
    title: "",
    description: "",
    file: "",
    isPublic: true,
  });
  const AddPost = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", postdata.file);
    let { data, status } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/upload`,
      formdata
    );
    if (status == 200) {
      let newdata = {
        title: postdata.title,
        description: postdata.description,
        file: data.url,
        isPublic: postdata.isPublic,
      };
      setpostdata({ title: "", description: "", file: "", isPublic: true });
      let r = await API.post("/post/", newdata);
      console.log(r);
      setImg("");
      getAllPost();
    }
  };
  const handleDropDown = (value) => {
    if (value == "click") {
      postRef.current.style.display == "block"
        ? (postRef.current.style.display = "none")
        : (postRef.current.style.display = "block");
    } else {
      postRef.current.style.display = "none";
    }
  };
  const handleClickOutside = (event) => {
    if (postRef.current && !postRef.current.contains(event.target)) {
      console.log("outside click");
      handleDropDown("notclick");
    }
  };
  const getMyProfile = async () => {
    let response = await API.get("/user/profile");

    if (response) {
      setmydata(response);
    }
    console.log(response);
  };
  // Geeting All Posts
  const getAllPost = async () => {
    setPostLoading(true);
    let response = await API.get("/post/");
    if (response.error) {
      setPostLoading(false);
      setAllPost([]);
    } else {
      setAllPost(response.post);
      setPostLoading(false);
    }
    console.log(response);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [postRef]);
  const userInfo = JSON.parse(localStorage.getItem("User"));
  const [userdata, setuserdata] = useState(userInfo);
  // const { data } = useContext(ChatContext);

  const Connect = async () => {
    console.log("Click");
    const res = await getDoc(doc(db, "users", userdata._id));
    if (!res.exists()) {
      await setDoc(doc(db, "users", userdata._id), {
        uid: userdata._id,
        displayName: userdata.firstName,
        email: userdata.email,
      });
      await setDoc(doc(db, "userChats", userdata._id), {});
    }
  };
  useEffect(() => {
    getAllPost();
    getMyProfile();
    Connect();
  }, []);
  return (
    <DashboardContainer>
      <Header />
      <DashboardContentContainer>
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <DashboardMidContainer>
          <CreatePostContainer>
            <div
              className="create"
              style={{ cursor: "pointer" }}
              onClick={AddPost}
            >
              <BorderColorOutlinedIcon style={{ color: "#A020F0" }} />
              <p>Create Post</p>
            </div>
            <div className="postcontainer">
              <div className="post-header">
                <h5>Title</h5>
                <input
                  placeholder="Enter Post Title"
                  value={postdata.title}
                  onChange={(e) =>
                    setpostdata({ ...postdata, title: e.target.value })
                  }
                />
              </div>
              <div className="post-content">
                <Avatar
                  alt="Cindy Baker"
                  src={mydata.profileImage}
                  sx={{ cursor: "pointer" }}
                />
                <textarea
                  name="desc"
                  rows="4"
                  cols="70"
                  placeholder="Whats on your mind?"
                  value={postdata.description}
                  onChange={(e) =>
                    setpostdata({ ...postdata, description: e.target.value })
                  }
                ></textarea>
              </div>
              {img.length > 0 && (
                <Image
                  src={img}
                  alt=""
                  width="200px"
                  height="200px"
                  style={{ marginTop: "20px" }}
                />
              )}
              <div className="post-footer">
                <div>
                  <WallpaperIcon sx={{ color: "#10d876" }} />
                  <input
                    type="file"
                    onChange={(e) => {
                      setImg(URL.createObjectURL(e.target.files[0]));
                      setpostdata({ ...postdata, file: e.target.files[0] });
                    }}
                  />
                  <p>Photo/Video</p>
                </div>

                <div>
                  <MiscellaneousServicesIcon
                    sx={{ color: "#fe9431" }}
                    onClick={handleDropDown}
                  />
                  <p onClick={() => handleDropDown("click")}>{postType}</p>
                  <div
                    className="dropDownbox animate__animated animate__zoomIn"
                    ref={postRef}
                  >
                    <p
                      className={postType == "Public" ? "active" : ""}
                      onClick={() => setpostType("Public")}
                    >
                      <PublicIcon /> Public
                    </p>
                    <p
                      className={postType == "Private" ? "active" : ""}
                      onClick={() => setpostType("Private")}
                    >
                      <SecurityIcon /> Private
                    </p>
                    <p
                      className={postType == "only_me" ? "active" : ""}
                      onClick={() => setpostType("only_me")}
                    >
                      <EnhancedEncryptionIcon /> only_me
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CreatePostContainer>
          <AllPostContainer>
            {postLoading ? (
              <div className="w-full h-full bg-white rounded-xl flex items-center justify-center p-20">
                <Spinner
                  animation="grow"
                  style={{
                    width: "200px",
                    height: "200px",
                    backgroundColor: "#A020F0",
                  }}
                />
              </div>
            ) : AllPost.length > 0 ? (
              AllPost.map((item) => {
                return (
                  <Post
                    // getData={() => getAllPost()}
                    postId={item._id}
                    title={item.title}
                    totalcomment={item.noComment}
                    totallike={item.numberOfLike}
                    comments={item.comments}
                    privacy={item.privacy}
                    user={item.user}
                    description={item.description}
                    postImg={item.file}
                  />
                );
              })
            ) : (
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "25px",
                  width: "100%",
                  color: "#A020F0",
                }}
              >
                No Post found
              </h1>
            )}
          </AllPostContainer>
        </DashboardMidContainer>
        <div className="sidebar-right-container">
          <RightSidebar />
        </div>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

export default Userdashboard;
