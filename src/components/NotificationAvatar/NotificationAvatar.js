import React from 'react'
import {AvatarContainer,Avatar} from "./NotificationAvatar.style"
import { Link } from 'react-router-dom'
const NotificationAvatar = (props) => {

  return (
    <AvatarContainer>
      <Avatar gradient={props.gradient}>
       {props.icon}
         </Avatar>
      <Link to={props.link} >{props.txt}</Link>
    </AvatarContainer>
  )
}

export default NotificationAvatar