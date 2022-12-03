import React,{useState,useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Logo,LeftContainer,RightContainer,Heading1,TextFieldsContainer,InputField,MyButton,InputFieldContainer} from '../../styles';
import {LogoContainer} from "../Login/Login.styles";
import loginbg from "../../../src/assets/login-bg.jpg";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {useNavigate} from 'react-router-dom';
import {API} from "../../../src/services/api"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';

const AccountRecovery = () => {
    const[Email,setEmail]=useState("");
  
    const [open, setOpen] = React.useState(false);
    const[error,seterror]=useState(false);
    const [Message,setMessage]=useState("");
    const selector=useSelector((state)=>state.UserReducer)
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };
      const navigate=useNavigate();
      const handleLogin=async(e)=>{
        e.preventDefault();
        
       
        let params1={email:Email}
        let r1=await API.post('/user/recover-account',params1)
        console.log(r1);
    
        if(r1.error){
          setMessage(r1.error)
          seterror(true)
          handleClickOpen()
          setTimeout(()=>{
            handleClose()
          },3000)
        }else{
            setMessage("Password send to your email")
            seterror(false)
          handleClickOpen()
          setTimeout(()=>{
            navigate("/");
          },3000)
        }
  
  // navigate("/Home");
      }
    
  return (
    <>
    {open && <Stack sx={{ width: '100%' }} spacing={2} >
  {error && <Alert severity="error" onClose={() => handleClose()}>{Message}</Alert>}   
    
   {error==false &&  <Alert severity="success" onClose={() => handleClose()}>{Message}</Alert>} 
   </Stack>} 
  
   <Container fluid>
    <Row >
       <Col style={{paddingLeft:"0px",paddingRight:"0px"}}  md={6}>
       <LeftContainer bgImg={loginbg}>
           <LogoContainer>
           <Logo><AutoAwesomeIcon xs={{color:`${({theme})=>theme.light}`}}/> Talksians</Logo>
           </LogoContainer>
           
       </LeftContainer>
       </Col>
       <Col>
       <RightContainer sm={12} md={6}>
       
<Heading1>Account Recovery </Heading1>

<TextFieldsContainer>

   <InputFieldContainer>
   <InputField  id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
  
   </InputFieldContainer>
   
   

<MyButton variant="contained"  type="submit" onClick={handleLogin}>Verify</MyButton>


</TextFieldsContainer>

       </RightContainer>
       </Col>
     </Row>
    
 </Container>
 </>
  )
}

export default AccountRecovery