import React from 'react'
import { SidebarNews, SidebarSetting } from './Sidebar.style'
import NotificationAvatar from '../NotificationAvatar/NotificationAvatar'
import TvIcon from '@mui/icons-material/Tv';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useDispatch } from 'react-redux';
import { DeleteUser } from "../../redux/action/index"
import { useNavigate } from 'react-router-dom';
import PagesIcon from '@mui/icons-material/Pages';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const HandleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("Token")
        dispatch(DeleteUser());
        navigate('/')
    }
    return (
        <>
            <SidebarNews>
                <p>New Feeds</p>
                <div className='Avatar-container'>
                    <NotificationAvatar gradient="linear-gradient(to right,#0575e6,#021b79)!important" txt="Timeline" link="/Home" icon={<TvIcon style={{ color: 'white' }} />} />
                    <NotificationAvatar gradient="linear-gradient(to right,#e44d26,#f16529)!important" txt="Pages" link="/allPages" icon={<TokenOutlinedIcon style={{ color: 'white' }} />} />
                    <NotificationAvatar gradient="linear-gradient(to right,#ee0979,#ff6a00)!important" txt=" Groups" link="/Home" icon={<BoltOutlinedIcon style={{ color: 'white' }} />} />
                    <NotificationAvatar gradient="linear-gradient(135deg,#05f,#09f)!important" txt="Profile" link="/MyProfile" icon={<PersonOutlinedIcon style={{ color: 'white' }} />} />
                    <NotificationAvatar gradient="linear-gradient(135deg,#A020F0,#6C0BA9)!important" txt="Notifications" link="/Home" icon={<NotificationsNoneOutlinedIcon style={{ color: 'white' }} />} />
                    <NotificationAvatar gradient="linear-gradient(to right,#ee0979,#ff6a00)!important" txt="Messages" link="/Chat" icon={<ChatBubbleOutlineOutlinedIcon style={{ color: 'white' }} />} />
                    <NotificationAvatar gradient="linear-gradient(to right,#e44d26,#f16529)!important" txt="Find Users" link="/friends" icon={<PeopleAltIcon style={{ color: 'white' }} />} />

                    <NotificationAvatar gradient="linear-gradient(135deg,#05f,#09f)!important" txt="Help" link="/Home" icon={<HelpOutlineIcon style={{ color: 'white' }} />} />
                    <NotificationAvatar gradient="linear-gradient(to right,#0575e6,#021b79)!important" txt="Library" link="/Library" icon={<LocalLibraryIcon style={{ color: 'white' }} />} />
                    <NotificationAvatar gradient="linear-gradient(135deg,#A020F0,#6C0BA9)!important" txt="Create Page" link="/CreatePage" icon={<PagesIcon style={{ color: 'white' }} />} />
                    <NotificationAvatar gradient="linear-gradient(to right,#ee0979,#ff6a00)!important" txt="Create Group" link="/CreateGroup" icon={<GroupAddIcon style={{ color: 'white' }} />} />
                </div>
            </SidebarNews>
            <SidebarSetting>
                <p>Account</p>
                <div className='Setting-container'>
                    <div>
                        <SettingsIcon style={{ color: '#808191' }} />
                        <Link to="/Setting">Setting</Link>
                    </div>
                    <div>
                        <LogoutIcon style={{ color: '#808191' }} />
                        <a onClick={HandleLogout} style={{ cursor: "pointer" }}>Logout</a>
                    </div>
                </div>
            </SidebarSetting>

        </>
    )
}

export default Sidebar