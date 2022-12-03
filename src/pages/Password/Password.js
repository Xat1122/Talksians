import React,{useState} from 'react'
import Header from '../../components/Header/Header'
import {DashboardContainer,DashboardContentContainer} from "../../styles"
import Sidebar from '../../components/Sidebar/Sidebar'
import {AccountInformationContainer,AccountInformationHeader,AccountInformationContent} from '../AccountInformation/AccountInformation.style'
import {Link} from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {PasswordInformationContent} from './Password.style'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {API} from "../../services/api"
const Password = () => {
  const [open, setOpen] = React.useState(false);
    const[error,seterror]=useState(false);
    const [Message,setMessage]=useState("");
    const[password,setPassword]=useState("");
    const[currentPassword,setCurrentPassword]=useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit=async(e)=>{
e.preventDefault();
let params={oldPassword:currentPassword,newPassword:password}
let r =await API.put('/user/change-password',params)
if(r.error){
  setMessage(r.error)
  seterror(true)
  handleClickOpen()
  setTimeout(()=>{
    handleClose()
  },3000)
}else{
  setMessage(r.message)
  seterror(false)
  handleClickOpen()
  setTimeout(()=>{
    handleClose()
  },3000)
}
  }
  return (
    <>
      {open && <Stack sx={{ width: '100%' }} spacing={2} >
   {error && <Alert severity="error" onClose={() => handleClose()}>{Message}</Alert>}   
     
    {error==false &&  <Alert severity="success" onClose={() => handleClose()}>{Message}</Alert>} 
    </Stack>} 
 
    <DashboardContainer>
    <Header/>
    <DashboardContentContainer>
    <div className='sidebar-container'>
      <Sidebar/>   
      </div>
      <AccountInformationContainer>
        <AccountInformationHeader>
            <Link to="/Setting"><ArrowBackRoundedIcon style={{color:'white'}}/></Link>
       <h1> Change Password</h1>
        </AccountInformationHeader>
        <PasswordInformationContent>
        <div className='InputGroup'>
                        <label>Old Password</label>
                        <input placeholder='Current Password' className='UserInputFields' value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)}/>
                    </div>
                    <div className='InputGroup'>
                        <label>New Password</label>
                        <input placeholder='New Password' className='UserInputFields' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className='InputGroup'>
                    <div class="button-container">
                    <button className='SaveButton' onClick={handleSubmit}>Save</button>
                </div>
                    </div>
            </PasswordInformationContent>
            </AccountInformationContainer>
      </DashboardContentContainer>
      </DashboardContainer>
      </>
  )
}

export default Password