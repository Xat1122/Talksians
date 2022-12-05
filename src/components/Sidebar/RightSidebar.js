import React, { useEffect, useState } from "react";
import { FriendReqeustContainer } from "./Sidebar.style";

import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import UserNotifcations from "../Notification/Notifcations";
import groupPic from "../../assets/group.jpg";
import pagePic from "../../assets/page.jpg";
import { API } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";

const RightSidebar = () => {
  const [allFriendRequests, setAllFriendRequest] = useState([]);
  const notify = (Message) => toast(Message);

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
    console.log("acceptFriendRequest");

    let r = await API.get(`/user/${id}/friend-request`);

    let res = await API.put(`/user/friend-request/${r?.sender}/accept`);

    notify(res?.message);

    getAllFriendRequests();
  };

  const rejectFriendRequest = async (id) => {
    let r = await API.get(`/user/${id}/friend-request`);

    let res = await API.put(`/user/friend-request/${r?.sender}/reject`);

    notify(res?.message);

    getAllFriendRequests();
  };

  return (
    <>
      <FriendReqeustContainer>
        <div className="Request-header">
          <p>Friend Request</p>
          <Link to="/Request">See all</Link>
        </div>

        <div className="Avatar-container">
          {allFriendRequests.length == 0 ? (
            <h6 style={{ textAlign: "center" }}>No Friend Requests</h6>
          ) : (
            allFriendRequests.map((item, index) => {
              return (
                <UserNotifcations
                  type="request"
                  text={item?.name + " send you friend request"}
                  borderBottom="none"
                  acceptFriendRequest={() => acceptFriendRequest(item?.id)}
                  rejectFriendRequest={() => rejectFriendRequest(item?.id)}
                />
              );
            })
          )}
        </div>
      </FriendReqeustContainer>
      <FriendReqeustContainer>
        <div className="Request-header">
          <p>Suggested Groups</p>
          <Link to="/allGroups">See all</Link>
        </div>

        <div className="Group-pages-container">
          <div className="img-container">
            <Image src={groupPic} />
          </div>
          <p>10k People are in this group</p>
        </div>
      </FriendReqeustContainer>
      <FriendReqeustContainer>
        <div className="Request-header">
          <p>Suggested Pages</p>
          <Link to="/allPages">See all</Link>
        </div>

        <div className="Group-pages-container">
          <div className="img-container">
            <Image src={pagePic} />
          </div>
          <p>10k People Like this page</p>
          <div className="button-container">
            <button>Like</button>
          </div>
        </div>
      </FriendReqeustContainer>

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

export default RightSidebar;
