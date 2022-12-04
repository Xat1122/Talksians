import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DashboardMidContainer } from "../UserDashboard/UserDashboard.style";
import PageHeader from "../../components/PageHeader/PageHeader";
import { RequestContainer } from "./Request.style";
import RequestCard from "../../components/RequestCard/RequestCard";
import { API } from "../../services/api";
const Request = () => {
  const [allFriendRequests, setAllFriendRequest] = useState([]);

  useEffect(() => {
    getAllFriendRequests();
  }, []);

  const getAllFriendRequests = async () => {
    let res = await API.get(`/user/all-friend-requests`);

    if (res.error) {
      setAllFriendRequest([]);
    } else {
      setAllFriendRequest(res);
    }
  };

  const acceptFriendRequest = async (senderId) => {
    let res = await API.get(`user/friend-request/${senderId}/accept`);

    getAllFriendRequests();
  };

  const rejectFriendRequest = async (senderId) => {
    let res = await API.get(`user/friend-request/${senderId}/reject`);

    getAllFriendRequests();
  };

  return (
    <DashboardContainer>
      <Header />
      <DashboardContentContainer>
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <DashboardMidContainer>
          <PageHeader title="Friend Request" />
          <RequestContainer>
            {allFriendRequests.map((item, index) => {
              return (
                <RequestCard
                  acceptFriendRequest={acceptFriendRequest}
                  rejectFriendRequest={rejectFriendRequest}
                  myfriend={item?.isMyFriend}
                  name={item?.name}
                />
              );
            })}

            <RequestCard myfriend={true} name={"Victor "} />
            <RequestCard name={"Victor "} />
            <RequestCard name={"Victor Exrixon"} />
            <RequestCard name={"Victor Exrixon"} />
          </RequestContainer>
        </DashboardMidContainer>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

export default Request;
