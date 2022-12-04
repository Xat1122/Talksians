import React, { useEffect, useState } from "react";
import { FriendReqeustContainer } from "./Sidebar.style";

import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import UserNotifcations from "../Notification/Notifcations";
import groupPic from "../../assets/group.jpg";
import pagePic from "../../assets/page.jpg";
import { API } from "../../services/api";
const RightSidebar = () => {
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
    <>
      <FriendReqeustContainer>
        <div className="Request-header">
          <p>Friend Request</p>
          <Link to="/Request">See all</Link>
        </div>

        <div className="Avatar-container">
          {allFriendRequests.map((item, index) => {
            return (
              <UserNotifcations
                type="request"
                text={item?.name + " send you friend request"}
                borderBottom="none"
              />
            );
          })}

          <UserNotifcations
            type="request"
            text="asad send you friend request"
            borderBottom="none"
          />
          <UserNotifcations
            type="request"
            text="mateen send you friend request"
            borderBottom="none"
          />
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
    </>
  );
};

export default RightSidebar;
