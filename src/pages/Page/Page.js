import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  AllPostContainer,
  CreatePostContainer,
  DashboardMidContainer,
} from "../UserDashboard/UserDashboard.style";
import PageHeader from "../../components/PageHeader/PageHeader";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Avatar from "@mui/material/Avatar";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePageByIdFromAction,
  getPageByIdFromAction,
} from "../../redux/action/Pages";
import { GroupPageContainer } from "./Pages.style";
import { Image, Spinner } from "react-bootstrap";
import Post from "../../components/Post/Post";
import axios from "axios";
import { API } from "../../services/api";
const Page = (props) => {
  const selector = JSON.parse(localStorage.getItem("User"));
  const [userdata, setuserdata] = useState(selector);
  const [img, setImg] = useState("");
  const [AllPost, setAllPost] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [postType, setpostType] = useState("Public");
  const postRef = useRef(null);
  const [postdata, setpostdata] = useState({
    title: "",
    description: "",
    file: "",
    isPublic: true,
  });
  console.log(userdata, "userdata");
  const navigate = useNavigate();
  const { id } = useParams();
  const { getPageById, getPageData, getPageDataLoading, deletePageById } =
    props;

  const handleDropDown = (value) => {
    if (value == "click") {
      postRef.current.style.display == "block"
        ? (postRef.current.style.display = "none")
        : (postRef.current.style.display = "block");
    } else {
      postRef.current.style.display = "none";
    }
  };
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
      let r = await API.post(`/page/${id}/post/`, newdata);
      console.log(r);
      setImg("");
      getPageById(id)
    }
  };

  const deletePageHandler = () => {
    deletePageById(id).then((res) => {
      if (res.type === "DELETE_PAGE_SUCCESS") {
        navigate("/allPages");
      }
    });
  };

  const updatePageHandler = (pageId) => {
    navigate(`/UpdatePage/${pageId}`);
  };
  useEffect(() => {
    getPageById(id).then((res) => {
      console.log(res.data, "res.data");
    });
  }, []);

  console.log(getPageData?.posts, "getPageData?.posts");
  return (
    <DashboardContainer>
      <Header />
      <DashboardContentContainer>
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <DashboardMidContainer>
          {/* <PageHeader title="Page" /> */}

          {/* Page Header */}
          {getPageDataLoading ? (
            <div className="w-full flex justify-center items-center">
              <Spinner
                animation="grow"
                style={{
                  width: "200px",
                  height: "200px",
                  backgroundColor: "#A020F0",
                }}
              />
            </div>
          ) : (
            <GroupPageContainer onClick={() => {}}>
              <div
                className="background-img"
                style={{
                  background: `url(${getPageData?.coverImage})`,
                  backgroundSize: "cover",
                  width: "100%",
                  height: "200px",
                }}
              ></div>
              <div className="card-body">
                <div className="avatar-container">
                  <Avatar
                    alt="Cindy Baker"
                    src={getPageData?.logo}
                    sx={{ cursor: "pointer", width: "70px", height: "70px" }}
                  />
                </div>
                <div className="group-content">
                  <h1>{getPageData?.title}</h1>
                  <p>{getPageData?.description}</p>
                </div>
                <div className="group-button-container">
                  <button
                    className="bg-blue-400 rounded-full py-2 px-6 text-white mr-2"
                    onClick={() => updatePageHandler(getPageData?._id)}
                  >
                    Update Page
                  </button>
                  <button
                    className="bg-red-600 rounded-full py-2 px-6 text-white"
                    onClick={deletePageHandler}
                  >
                    Delete Page
                  </button>
                </div>
              </div>
            </GroupPageContainer>
          )}

          <div className="mt-2">
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
                    src={userdata.profileImage}
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
          </div>

          <div>
            <AllPostContainer>
              {getPageData?.posts.length > 0 ? (
                getPageData?.posts.map((item) => {
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
                  No Post found for this page
                </h1>
              )}
            </AllPostContainer>
          </div>
        </DashboardMidContainer>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    getPageData: state.pages.getPageByIdFromRedux.data,
    getPageDataLoading: state.pages.getPageByIdFromRedux.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPageById: (id) => dispatch(getPageByIdFromAction(id)),
    deletePageById: (id) => dispatch(deletePageByIdFromAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
