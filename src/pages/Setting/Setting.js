import React from 'react'
import Header from '../../components/Header/Header'
import {DashboardContainer,DashboardContentContainer} from "../../styles"
import Sidebar from '../../components/Sidebar/Sidebar'
import {SettingContainer} from './Setting.style'
import NotificationAvatar from '../../components/NotificationAvatar/NotificationAvatar'
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const Setting = () => {
  return (
    <DashboardContainer>
    <Header/>
    <DashboardContentContainer>
    <div className='sidebar-container'>
      <Sidebar/>   
      </div>
      <SettingContainer>
            <h1>Settings</h1>
            <div className='setting-content-container'>
            <div className='setting-content'>
            <p>General</p>
            <NotificationAvatar gradient="linear-gradient(135deg,#05f,#09f)!important" txt="
            Account Information" link="/AccountInformation" icon={<HomeRoundedIcon style={{ color: 'white' }} />}/>

<div className='line'></div>
<NotificationAvatar gradient="linear-gradient(to right,#ee0979,#ff6a00)!important" txt="
            Password" link="/Password" icon={<HomeRoundedIcon style={{ color: 'white' }} />}/>
<div className='line'></div>
<NotificationAvatar gradient="linear-gradient(to right,#f2994a,#f2c94c)!important" txt="
            Blocked Accounts" link="/" icon={<HomeRoundedIcon style={{ color: 'white' }} />}/>
<div className='line'></div>
<NotificationAvatar gradient="linear-gradient(135deg,#05f,#09f)!important" txt="Help" link="/" icon={<HelpOutlineIcon style={{ color: 'white' }}/>}/>
<div className='line'></div>
<NotificationAvatar gradient="linear-gradient(to right,#e44d26,#f16529)!important" txt="Logout" link="/" icon={<LockRoundedIcon style={{ color: 'white' }}/>}/>

                </div>
            </div>
        </SettingContainer>
    </DashboardContentContainer>
    </DashboardContainer>
  )
}

export default Setting