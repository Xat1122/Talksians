import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import Sidebar from "../../components/Sidebar/Sidebar";

import GroupPageCard from "../../components/Card/GroupPageCard";
import GroupImg from "../../assets/flower.jpg";
import GroupImg2 from "../../assets/group.jpg";
import {
  UserProfileContainer,
  UserTabContainer,
  UserContainer,
  FriendsContainer,
  FriendsCardContainer,
} from "./Userprofile.style";
import userImg from "../../assets/user1.jpg";
import Avatar from "@mui/material/Avatar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Post from "../../components/Post/Post";
import Searchbar from "../../components/Searchbar/Searchbar";
import RequestCard from "../../components/RequestCard/RequestCard";
import { AllPostContainer } from "../UserDashboard/UserDashboard.style";
import Photo from "../../components/Photo/Photo";
import { useParams } from "react-router-dom";
import { API } from "../../services/api";

const Userprofile = ({ page }) => {
  const { id } = useParams();
  const [value, setValue] = React.useState("1");
  const [user, setUser] = useState(null);
  const [AllPost, setAllPost] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // getGroups();
    // getAllPosts();
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    let r = await API.get(`/user/${id}`);

    console.log(r, "profile ");

    setUser(r);
  };

  const getAllPosts = async () => {
    let r = await API.get("/post/user");

    if (r.error) {
      setAllPost([]);
    } else {
      setAllPost(r.posts);
    }
    console.log(r);
  };
  const getGroups = async () => {
    let r = await API.get("/group/");
    setGroups(r);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DashboardContainer>
      <Header />
      <DashboardContentContainer>
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <UserContainer>
          <UserProfileContainer>
            <div
              className="background-img"
              style={{ background: `url(${GroupImg2})` }}
            ></div>
            <div className="card-body">
              <div className="avatar-container">
                <Avatar
                  alt="Cindy Baker"
                  src={user?.profileImage}
                  sx={{ cursor: "pointer", width: "100px", height: "100px" }}
                />
              </div>
              <div className="group-content">
                <h1>{user?.firstName}</h1>
                <p>{user?.email}</p>
              </div>
              <div className="group-button-container">
                <button className="follow-btn">Add Friend</button>
                <div className="message">
                  <MailOutlineIcon />
                </div>
                <div className="setting">
                  <MoreHorizIcon />
                </div>
              </div>
            </div>
          </UserProfileContainer>
          <UserTabContainer>
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                "& .Mui-selected": { color: "#A020F0 !important" },
                "& .MuiTab-textColorPrimary": {
                  fontSize: "12px !important",
                  fontFamily: "Montserrat !important",
                  fontWeight: "bold !important",
                },
                "& .css-1aquho2-MuiTabs-indicator": {
                  backgroundColor: "#A020F0 !important",
                },
                "& .css-jpln7h-MuiTabs-scroller": {
                  backgroundColor: "white !important",
                  borderRadius: "10px !important",
                  overflow: "hidden !important",
                },
                "& .lowSeC": { boxShadow: "none !important" },
                "& .css-13xfq8m-MuiTabPanel-root": {
                  marginTop: "20px !important",
                  borderRadius: "10px !important",
                },
                "& .lowSeC": { boxShadow: "none !important" },
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Home" value="1" />

                    <Tab label="Friends" value="4" />

                    <Tab label="Groups" value="5" />
                    <Tab label="Pages" value="6" />
                    <Tab label="Photos" value="7" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <AllPostContainer>
                    {AllPost.map((item) => {
                      return (
                        <Post
                          postId={item?._id}
                          title={item?.title}
                          totalcomment={item?.noComment}
                          totallike={item?.numberOfLike}
                          comments={item?.comments}
                          privacy={item?.privacy}
                          user={item?.user}
                          description={item?.description}
                          postImg={item?.file}
                        />
                      );
                    })}
                    {AllPost.length === 0 ? (
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
                    ) : (
                      <p></p>
                    )}
                  </AllPostContainer>
                </TabPanel>

                <TabPanel value="4">
                  <FriendsCardContainer>
                    <Searchbar />
                    <FriendsContainer>
                      <RequestCard myfriend={true} />
                      <RequestCard myfriend={true} />
                      <RequestCard myfriend={true} />
                      <RequestCard myfriend={true} />
                      <RequestCard myfriend={true} />
                      <RequestCard myfriend={true} />
                      <RequestCard myfriend={true} />
                      <RequestCard myfriend={true} />
                      <RequestCard myfriend={true} />
                      <RequestCard myfriend={true} />
                    </FriendsContainer>
                  </FriendsCardContainer>
                </TabPanel>
                <TabPanel value="5">
                  <FriendsCardContainer>
                    <Searchbar />
                    <FriendsContainer>
                      {groups.map((item, index) => {
                        return (
                          <GroupPageCard
                            id={item._id}
                            key={index}
                            Imgurl={item.coverImage}
                            myGroup={true}
                            creatorId={item.creator}
                            title={item?.title}
                            totalPosts={item?.posts.length}
                            totalMembers={item?.members.length}
                          />
                        );
                      })}
                      {AllPost.length === 0 ? (
                        <h1
                          style={{
                            textAlign: "center",
                            fontSize: "25px",
                            width: "100%",
                            color: "#A020F0",
                          }}
                        >
                          No Group found
                        </h1>
                      ) : (
                        <p></p>
                      )}
                    </FriendsContainer>
                  </FriendsCardContainer>
                </TabPanel>
                <TabPanel value="6">
                  <FriendsCardContainer>
                    <Searchbar />
                    <FriendsContainer></FriendsContainer>
                  </FriendsCardContainer>
                </TabPanel>
                <TabPanel value="7">
                  <FriendsCardContainer>
                    <FriendsContainer>
                      <Photo Imgurl={GroupImg2} />
                      <Photo Imgurl={GroupImg} />
                      <Photo Imgurl={GroupImg} />
                      <Photo Imgurl={GroupImg2} />
                      <Photo Imgurl={GroupImg2} />
                      <Photo Imgurl={GroupImg} />
                      <Photo Imgurl={GroupImg} />
                      <Photo Imgurl={GroupImg} />
                      <Photo Imgurl={GroupImg2} />
                    </FriendsContainer>
                  </FriendsCardContainer>
                </TabPanel>
              </TabContext>
            </Box>
          </UserTabContainer>
        </UserContainer>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

export default Userprofile;
