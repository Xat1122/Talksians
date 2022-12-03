import React from 'react'
import { Logo } from '../../styles';
import {LogoContainer} from "./Logo.style";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
const MyLogo = () => {
  return (
    <LogoContainer>
            <Logo><AutoAwesomeIcon xs={{color:`${({theme})=>theme.light}`}}/> Talksians</Logo>
            </LogoContainer>
  )
}

export default MyLogo