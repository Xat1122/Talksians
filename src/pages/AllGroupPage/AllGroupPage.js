import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DashboardMidContainer } from "../UserDashboard/UserDashboard.style";
import PageHeader from "../../components/PageHeader/PageHeader";
import { GroupContainer } from "./AllGroupPage.style";
import GroupPageCard from "../../components/Card/GroupPageCard";
import GroupImg from "../../assets/page.jpg";
import { API } from "../../services/api";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { UserTabContainer } from "../UserProfile/Userprofile.style";
const AllGroupPage = () => {
  const [search, setSearch] = useState("");
  const [searchdata, setsearchData] = useState([]);
  const user = JSON.parse(localStorage.getItem("User"));
  const [value, setValue] = React.useState("1");
  const searchGroups = async () => {
    let r = await API.get(`/group/search?keyword=${search}`);
    if (r) {
      setsearchData(r);
      console.log(r);
    }
  };
  useEffect(() => {
    searchGroups();
    console.log(search);
  }, [search]);

  useEffect(() => {
    getAllGroups();
  }, []);
  console.log(searchdata, "searchdata");
 

  const getAllGroups = async () => {
    let r = await API.get(`/group`);
    if (r) {
      setsearchData(r);
    }
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
        <DashboardMidContainer>
          <PageHeader title="Groups" search={search} setSearch={setSearch} />

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
                    <Tab label="All Groups" value="1" />
                    <Tab label="My Groups" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <GroupContainer>
                    {searchdata.length > 0 &&
                      searchdata.map((item, index) => {
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
                            totalMembersl={item?.members}
                            isMyGroup={user?._id == item?.creator}
                            type={"group"}
                          />
                        );
                      })}
                  </GroupContainer>
                </TabPanel>
                <TabPanel value="2"></TabPanel>
              </TabContext>
            </Box>
          </UserTabContainer>
        </DashboardMidContainer>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

export default AllGroupPage;
