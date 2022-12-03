import React,{useState,useRef,useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Logo,LeftContainer,RightContainer,Heading1,TextFieldsContainer,InputField,MyButton,PageLink,InputFieldContainer} from '../../styles';
import {LogoContainer} from "../Login/Login.styles";
import loginbg from "../../../src/assets/signup-bg.jpg";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {API} from "../../../src/services/api"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Signup = () => {
  const [open, setOpen] = React.useState(false);
  const[error,seterror]=useState(false);
  const [Message,setMessage]=useState("");
  const selector=useSelector((state)=>state.UserReducer)
  const[user,setuser]=useState({
    firstName:"",
    lastName:"",
    email:"",
    registerationNo:"",
    password:""

  })
  const navigate=useNavigate();
  const[otp,setOtp]=useState("")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Register=async()=>{
    const params=user
    let r =await API.post('/user/signup',params)
    console.log(r)
    if(r.user){
      setMessage(r.message)
      seterror(false)
      handleClickOpen()
      setTimeout(()=>{
        handleClose()
      },3000)
    }else{
      setMessage(r.error)
      seterror(true)
      handleClickOpen()
    }
  }
  const Verify=async()=>{
    let o=parseInt(otp)
    const params={email:user.email,otp:o}
    let r =await API.post('/user/verify',params)
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
      navigate("/")
    }
  }

  useEffect(()=>{

   setTimeout(()=>{
    if(open==true){
      handleClose();
    }
   
   },3000) 
  })
 
  return (
    <>
 {open && <Stack sx={{ width: '100%' }} spacing={2} >
   {error && <Alert severity="error" onClose={() => handleClose()}>{Message}</Alert>}   
     
    {error==false &&  <Alert severity="success" onClose={() => handleClose()}>{Message}</Alert>} 
    </Stack>} 

    
    <Container fluid>
       
    <Row >
       <Col style={{paddingLeft:"0px",paddingRight:"0px"}}  md={6}>
       <LeftContainer bgImg={loginbg} height>
           <LogoContainer>
           <Logo><AutoAwesomeIcon xs={{color:`${({theme})=>theme.light}`}}/> Talksians</Logo>
           </LogoContainer>
           
       </LeftContainer>
       </Col>
       <Col>
       <RightContainer sm={12} md={6} paddingTop>
       
<Heading1>Register Your Account </Heading1>
<TextFieldsContainer>
   
<InputField id="outlined-basic" label="Firstname" variant="outlined" onChange={(e)=>setuser({...user,firstName:e.target.value})} />
<InputField id="outlined-basic" label="Lastname" variant="outlined" onChange={(e)=>setuser({...user,lastName:e.target.value})}/>
<InputField id="outlined-basic" label="Registeration no" variant="outlined" onChange={(e)=>setuser({...user,registerationNo:e.target.value})}/>
<InputField id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>setuser({...user,email:e.target.value})}/>
<InputField id="outlined-basic" label="password" variant="outlined" type="password" onChange={(e)=>setuser({...user,password:e.target.value})}/>
<MyButton variant="contained" onClick={Register}>Register</MyButton>
<InputField id="outlined-basic" label="Otp code" variant="outlined" onChange={(e)=>setOtp(e.target.value)} />
<MyButton variant="contained" onClick={Verify}>Verify</MyButton>
<PageLink to="/" paddingBottom>Do you have an account ? Login</PageLink>
</TextFieldsContainer>
       </RightContainer>
       </Col>
     </Row>
    
 </Container>
 </>
  )
}

export default Signup