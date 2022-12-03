import React from 'react'
import {FriendReqeustContainer} from './Sidebar.style'

import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import UserNotifcations from '../Notification/Notifcations';
import groupPic from "../../assets/group.jpg"
import pagePic from "../../assets/page.jpg"
const RightSidebar = () => {
  return (
    <>
    <FriendReqeustContainer>
        <div className='Request-header'>
        <p>Friend Request</p>
        <Link to="/Request">See all</Link>
        </div>
        
        <div className='Avatar-container'>
        <UserNotifcations type="request" text="shehryar send you friend request" borderBottom="none"/>
        <UserNotifcations type="request" text="asad send you friend request" borderBottom="none"/>
        <UserNotifcations type="request" text="mateen send you friend request" borderBottom="none"/>
        </div>
    </FriendReqeustContainer>
    <FriendReqeustContainer>
        <div className='Request-header'>
        <p>Suggested Groups</p>
        <Link to="/allGroups">See all</Link>
        </div>
        
        <div className='Group-pages-container'>
       <div className='img-container'>
       <Image src={groupPic}/>
       </div>
       <p>10k People are in this group</p>
        </div>
    </FriendReqeustContainer>
    <FriendReqeustContainer>
        <div className='Request-header'>
        <p>Suggested Pages</p>
        <Link to="/allPages">See all</Link>
        </div>
        
        <div className='Group-pages-container'>
        <div className='img-container'>
        <Image src={pagePic}/>
            </div>
            <p>10k People Like this page</p>
           <div className='button-container'>
           <button>Like</button>
           </div>
        </div>
    </FriendReqeustContainer>
    
    </>
  )
}

export default RightSidebar