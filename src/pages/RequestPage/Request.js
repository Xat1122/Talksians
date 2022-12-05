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

  const acceptFriendRequest = async (id) => {
    let r = await API.get(`/user/${id}/friend-request`);

    let res = await API.put(`/user/friend-request/${r?.sender}/accept`);

    getAllFriendRequests();
  };

  const rejectFriendRequest = async (id) => {
    let r = await API.get(`/user/${id}/friend-request`);

    let res = await API.put(`/user/friend-request/${r?.sender}/reject`);

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

          {allFriendRequests.length == 0 && (
            <h6 style={{ textAlign: "center", marginTop: 50 }}>
              No Friend Requests
            </h6>
          )}

          <RequestContainer>
            {allFriendRequests.map((item, index) => {
              return (
                <RequestCard
                  acceptFriendRequest={() => acceptFriendRequest(item?.id)}
                  rejectFriendRequest={() => rejectFriendRequest(item?.id)}
                  myfriend={item?.isMyFriend}
                  name={item?.name}
                />
              );
            })}
          </RequestContainer>
        </DashboardMidContainer>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

export default Request;
