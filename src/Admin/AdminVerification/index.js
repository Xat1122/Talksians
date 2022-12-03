import React from "react";
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
  getAllBecomeTeacherRequestsAction,
  rejectRequestAction,
  REJECT_REQUEST_SUCCESS,
} from "../../redux/action/admin";
import { Spinner } from "react-bootstrap";
import Request from "../AdminComponents/Request";
const token = localStorage.getItem("Token");

const AdminVerification = (props) => {
  const {
    getAllRequests,
    getAllRequestsFunc,
    requestLoading,
    acceptRequestFunc,
    rejectRequestFunc,
  } = props;
  let navigate = useNavigate();
  const rejectRequestHandler = (id) => {
    console.log(id, "id");
    rejectRequestFunc(id).then((res) => {
      if (res.type === REJECT_REQUEST_SUCCESS) {
        getAllRequestsFunc();
      }
    });
  };

  const acceptRequestHandler = (id) => {
    console.log(id, "id");
    acceptRequestFunc(id).then((res) => {
      if (res.type === ACCEPT_REQUEST_SUCCESS) {
        getAllRequestsFunc();
      }
    });
  };

  useEffect(() => {
    getAllRequestsFunc();
  }, []);
  console.log(getAllRequests, "getAllRequests");
  return (
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
              <SearchInput type="text" placeholder="Search" />
            </SearchContainer>
          </div>
          {/* Total Reports */}
          {requestLoading ? (
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
          )}
        </div>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
const mapStateToProps = (state) => {
  return {
    getAllRequests: state.admin.getAllBecomeTeacherRequestsReducer.data,
    requestLoading: state.admin.getAllBecomeTeacherRequestsReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRequestsFunc: () => dispatch(getAllBecomeTeacherRequestsAction()),
    rejectRequestFunc: (id) => dispatch(rejectRequestAction(id)),
    acceptRequestFunc: (id) => dispatch(acceptRequestAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminVerification);
