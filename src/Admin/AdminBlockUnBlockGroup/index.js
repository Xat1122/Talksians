import React, { useState } from "react";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import banner from "../../assets/banner.png";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import {
  SearchContainer,
  SearchInput,
} from "../../components/Header/Header.style";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  blockGroup,
  BLOCK_GROUP_SUCCESS,
  BLOCK_USER_SUCCESS,
  unblockGroup,
  UNBLOCK_GROUP_SUCCESS,
  UNBLOCK_USER_SUCCESS,
} from "../../redux/action/admin";
import { Button, Spinner } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
const token = localStorage.getItem("Token");

const AdminBlockUnBlockGroup = (props) => {
  const { unblockGroupFunc, blockGroupFunc, unblockLoading, blockLoading } =
    props;
  let navigate = useNavigate();
  const [searchGroup, setSearchGroup] = useState("");
  const [searchGroups, setSearchGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const notify = (Message) => toast(Message);
  const searchGroupsFunc = async () => {
    setLoading(true);
    axios(
      `${process.env.REACT_APP_BASE_URL}/group/search?keyword=${searchGroup}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        setLoading(false);
        setSearchGroups(response.data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };
  useEffect(() => {
    searchGroupsFunc();
  }, [searchGroup]);

  const blockGroupHandler = (id) => {
    console.log(id, "id");
    blockGroupFunc(id).then((res) => {
      if (res.type === BLOCK_GROUP_SUCCESS) {
        notify("Group blocked Succesfully");
        searchGroupsFunc();
      } else {
        notify("Failed to block Group");
      }
    });
  };

  const unblockGroupHandler = (id) => {
    console.log(id, "id");
    unblockGroupFunc(id).then((res) => {
      if (res.type === UNBLOCK_GROUP_SUCCESS) {
        notify("Group unblocked Succesfully");
        searchGroupsFunc();
      } else {
        notify("Failed to unblock Group");
      }
    });
  };

  return (
    <>
      <DashboardContainer>
        <AdminHeader />
        <DashboardContentContainer>
          <div className="sidebar-container">
            <AdminSidebar />
          </div>
          {/* Library Mian Container */}
          <div className="border bg-white m-2 shadow-xl p-3 w-full rounded-xl">
            <div className="flex justify-between mb-4">
              <div
                className="bg-mainColor flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                  />
                </svg>
              </div>
              <SearchContainer>
                <SearchIcon sx={{ color: "#ced4da" }} />
                <SearchInput
                  type="text"
                  placeholder="Search Group"
                  value={searchGroup}
                  onChange={(e) => setSearchGroup(e.target.value)}
                />
              </SearchContainer>
            </div>
            <p className="text-xl text-purple-500">Block or Unblock Group</p>
            {/* Search Users Will Be Shown Here */}
            {unblockLoading || unblockLoading || loading ? (
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
            ) : searchGroups.length > 0 ? (
             <div className="flex flex-wrap">
               {searchGroups.map((group) => {
                return (
                  <Group
                    group={group}
                    blockGroupHandler={blockGroupHandler}
                    unblockGroupHandler={unblockGroupHandler}
                  />
                );
              })}
             </div>
            ) : (
              <p className="text-2xl text-purple-500 text-center mt-4">
                No Groups to show please search group to block or unblock
              </p>
            )}
            {/* {requestLoading ? (
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
          ) : getAllRequests?.length > 0 ? (
            <div className="flex flex-col">
              {getAllRequests?.map((requestData) => {
                return (
                  <Request
                    acceptRequestHandler={acceptRequestHandler}
                    rejectRequestHandler={rejectRequestHandler}
                    requestData={requestData}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-2xl text-purple-500 text-center mt-4">
              No Requests to found
            </p>
          )} */}
          </div>
        </DashboardContentContainer>
      </DashboardContainer>
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
const mapStateToProps = (state) => {
  return {
    unblockLoading: state.admin.blockGroupReducer.loading,
    blockLoading: state.admin.unblockGroupReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    blockGroupFunc: (id) => dispatch(blockGroup(id)),
    unblockGroupFunc: (id) => dispatch(unblockGroup(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBlockUnBlockGroup);

const Group = ({ group, blockGroupHandler, unblockGroupHandler }) => {
  return (
    <div className="border p-4 bg-gradient-to-r from-purple-400 to-blue-300 shadow-lg w-1/4 m-1 rounded-lg">
      <div>
        <img
          src={group.coverImage ? group.coverImage : banner}
          className="w-full object-cover h-48 rounded-lg"
        />
      </div>
      <div>
        <p className="text-xl mt-3">{`${group.title}`}</p>
        <p>{`Member : ${group?.members.length}`}</p>
        <p>{`Posts : ${group?.posts.length}`}</p>
      </div>
      {/* <div className="flex items-center">
      
        <div>
         
        </div>
      </div> */}
        <Button
          variant="danger"
          className="mt-4"
          onClick={blockGroupHandler.bind(this, group?._id)}
        >
          Block
        </Button>
        <Button
          variant="primary"
          className="mt-4 ml-2"
          onClick={unblockGroupHandler.bind(this, group?._id)}
        >
          Unblock
        </Button>
    </div>
  );
};
