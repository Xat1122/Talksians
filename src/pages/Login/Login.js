import React,{useState,useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Logo,LeftContainer,RightContainer,Heading1,TextFieldsContainer,InputField,MyButton,PageLink,InputFieldContainer} from '../../styles';
import {LogoContainer} from "./Login.styles";
import loginbg from "../../../src/assets/login-bg.jpg";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {useNavigate} from 'react-router-dom';
import {API} from "../../../src/services/api"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useDispatch,useSelector } from 'react-redux';
import{SaveUser} from "../../redux/action/index"
const Login = () => {
    const[Email,setEmail]=useState("");
    const[Password,setPassword]=useState("");
    const [open, setOpen] = React.useState(false);
    const[error,seterror]=useState(false);
    const [Message,setMessage]=useState("");
    const selector=useSelector((state)=>state.UserReducer)
    const dispatch=useDispatch();
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const navigate=useNavigate();
    const handleLogin=async(e)=>{
      e.preventDefault();
      let params={email:Email,password:Password}
      let r= await API.post('/user/login',params)
      console.log(r.token);
      if(r.error){
        setMessage(r.error)
        seterror(true)
        handleClickOpen()
        setTimeout(()=>{
          handleClose()
        },3000)
      }else{
        dispatch(SaveUser(r.User))
       localStorage.setItem("User",JSON.stringify(r.User))
        localStorage.setItem("Token",r.token)
        navigate("/Home");
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
        
<Heading1>Login Into Your Account </Heading1>

<TextFieldsContainer>

    <InputFieldContainer>
    <InputField  id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
   
    </InputFieldContainer>
    
    <InputFieldContainer>

    <InputField id="outlined-basic" label="password" variant="outlined" type="password" onChange={(e)=>setPassword(e.target.value)}/>
  
    </InputFieldContainer>

<MyButton variant="contained"  type="submit" onClick={handleLogin}>Login</MyButton>
<PageLink to="/signup">Dont have account ? Register</PageLink>
<PageLink to="/AccountRecovery" style={{marginTop:'-15px',fontSize:'12px'}}>Forgot Password ?</PageLink>

</TextFieldsContainer>

        </RightContainer>
        </Col>
      </Row>
     
  </Container>
  </>
  )
}

export default Login