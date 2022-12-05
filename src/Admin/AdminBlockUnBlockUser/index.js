import React, { useState } from "react";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import RequestsImage from "../../assets/requests.jpg";
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
  acceptRequestAction,
  ACCEPT_REQUEST_SUCCESS,
  blockUser,
  BLOCK_USER_SUCCESS,
  getAllBecomeTeacherRequestsAction,
  rejectRequestAction,
  REJECT_REQUEST_SUCCESS,
  unblockUser,
  UNBLOCK_USER_SUCCESS,
} from "../../redux/action/admin";
import { Button, Spinner } from "react-bootstrap";
import Request from "../AdminComponents/Request";
import { Api } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
const token = localStorage.getItem("Token");

const AdminblockUnblockUser = (props) => {
  const { unblockUserFunc, blockUserFunc, unblockLoading, blockLoading } =
    props;
  let navigate = useNavigate();
  const [searchUser, setSearchUser] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const notify = (Message) => toast(Message);
  const searchUsersFunc = async () => {
    setLoading(true);
    axios(
      `${process.env.REACT_APP_BASE_URL}/user/search-user?name=${searchUser}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        setLoading(false);
        setSearchUsers(response.data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };
  useEffect(() => {
    searchUsersFunc();
  }, [searchUser]);

  const blockUserHandler = (id) => {
    console.log(id, "id");
    blockUserFunc(id).then((res) => {
      if (res.type === BLOCK_USER_SUCCESS) {
        notify("User blocked Succesfully");
        searchUsersFunc();
      } else {
        notify("Failed to block User");
      }
    });
  };

  const unblockUserHandler = (id) => {
    console.log(id, "id");
    unblockUserFunc(id).then((res) => {
      if (res.type === UNBLOCK_USER_SUCCESS) {
        notify("User unblocked Succesfully");
        searchUsersFunc();
      } else {
        notify("Failed to unblock User");
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
                  placeholder="Search User"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />
              </SearchContainer>
            </div>
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
            ) : searchUsers.length > 0 ? (
              searchUsers.map((user) => {
                return (
                  <User
                    user={user}
                    blockUserHandler={blockUserHandler}
                    unblockUserHandler={unblockUserHandler}
                  />
                );
              })
            ) : (
              <p className="text-2xl text-purple-500 text-center mt-4">
                No Users to show please search user to block or unblock
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
    unblockLoading: state.admin.blockUserReducer.loading,
    blockLoading: state.admin.unblockUserReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    blockUserFunc: (id) => dispatch(blockUser(id)),
    unblockUserFunc: (id) => dispatch(unblockUser(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminblockUnblockUser);

const User = ({ user, blockUserHandler, unblockUserHandler }) => {
  return (
    <div className="border p-4 bg-gradient-to-r from-purple-400 to-blue-300 shadow-lg w-1/2 rounded-lg">
      <div className="flex items-center">
        <Avatar
          alt="user"
          src={user?.profileImage}
          className="object-cover"
          sx={{ cursor: "pointer", width: "70px", height: "70px" }}
        />
        <div>
          <p className="ml-3 text-xl mt-3">{`${user.firstName} ${user.lastName}`}</p>
          <p className="ml-3 -mt-3">{`${user.email}`}</p>
        </div>
      </div>
      {!user?.block ? (
        <Button
          variant="danger"
          className="mt-4 w-1/4"
          onClick={blockUserHandler.bind(this, user?._id)}
        >
          Block
        </Button>
      ) : (
        <Button
          variant="primary"
          className="mt-4 w-1/4"
          onClick={unblockUserHandler.bind(this, user?._id)}
        >
          Unblock
        </Button>
      )}
    </div>
  );
};
