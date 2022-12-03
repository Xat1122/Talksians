import React,{useState,useEffect,useRef} from 'react'
import Header from '../../components/Header/Header'
import {DashboardContainer,DashboardContentContainer} from "../../styles"
import Sidebar from '../../components/Sidebar/Sidebar'
import {DashboardMidContainer} from "../UserDashboard/UserDashboard.style"
import PageHeader from "../../components/PageHeader/PageHeader"
import {GroupContainer} from "../AllGroupPage/AllGroupPage.style"
import GroupPageCard from "../../components/Card/GroupPageCard"
import GroupImg from "../../assets/flower.jpg"
import GroupImg2 from "../../assets/group.jpg"
import {UserProfileContainer,UserTabContainer,UserContainer,FriendsContainer,FriendsCardContainer} from "../UserProfile/Userprofile.style"
import userImg from "../../assets/user.png"
import Avatar from '@mui/material/Avatar';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Post from "../../components/Post/Post"
import Searchbar from "../../components/Searchbar/Searchbar"
import RequestCard from "../../components/RequestCard/RequestCard"
import {AllPostContainer} from "../UserDashboard/UserDashboard.style"
import Photo from '../../components/Photo/Photo'
import { CreatePostContainer } from '../UserDashboard/UserDashboard.style'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Image } from 'react-bootstrap'
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import {API} from "../../services/api"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import {useDropzone} from 'react-dropzone'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router';
import {TextFieldsContainer,InputField,InputFieldContainer} from '../../styles';
import Modal from '@mui/material/Modal';
import axios from 'axios'

const MyGroupPage = () => {
    const { id } = useParams();
    const[groupdata,setgroupdata]=useState({
      coverImage:"",
      creator:"",
      description:"",
      members:[],
      posts:[],
      title:"",
      _id:""
    })
    const selector=JSON.parse(localStorage.getItem("User"))
    const [mydata,setmydata]=useState(selector);
    const[postdata,setpostdata]=useState({
      title:"",
      description:"",
      isPublic:true
    })
    const [Groupinfo,setGroupinfo]=useState({
      title:groupdata.title,
      description:groupdata.description,
    })
    const [showSetting,setshowSetting]=useState(false)
    const navigate=useNavigate();
    const[files,setFiles]=useState([])
      const [value, setValue] = React.useState('1');
     
     
      const[img,setImg]=useState('')
    const[postType,setpostType]=useState("Public")
    const postRef=useRef(null)
    const[AllPost,setAllPost]=useState([]);
    const notify = (Message) => toast(Message);

   
    const AddPost=async(e)=>{
    //  e.preventDefault();
    //   let r=await API.post('/post/',postdata)
    //   console.log(r)

    }
    const getAllPost=async()=>{
      let r=await API.get(`/${groupdata._id}/all-post`)
      
      if(r.error){
        setAllPost([])
      }else{
        setAllPost(r.post);
      }
      console.log(r)
    }
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      const {getRootProps, getInputProps} = useDropzone({
        accept:'image/*',
        onDrop:(acceptedFiles)=>{
            setFiles(
                acceptedFiles.map((file)=>
                {
                   
                  return(  Object.assign(file,{
                    preview:URL.createObjectURL(file)
                }))})
            )
        }
    })
      const handleDropDown=(value)=>{
        if(value=="click"){
          postRef.current.style.display=="block"?postRef.current.style.display="none":postRef.current.style.display="block"
        }else{
          postRef.current.style.display="none"
        }
         }
      const handleClickOutside = (event) => {
        if (postRef.current && !postRef.current.contains(event.target)) {
          console.log("outside click");
          handleDropDown("notclick")
            }
    };
    useEffect(()=>{
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        
        document.removeEventListener('click', handleClickOutside, true);
    };
    },[postRef])
   
    
  
   
    const images=files.map((file)=>{
          
        
      return(
          <div>
              <img src={file.preview} width="200px" alt='preview'/>
          </div>
      )
  })
  const Upload=async(e)=>{
    e.preventDefault();
   
    if(files[0]!==null || !files[0]!==undefined){
        const formdata=new FormData();
        formdata.append("image",files[0])
  
        let {data,status}=await axios.post(`${process.env.REACT_APP_BASE_URL}/user/upload`,formdata)
        
        if(status==200){
            let newdata={
               images:mydata.images
                
            }
            newdata.images.push(data.url)
            
            let r=await API.put('/user/update',newdata)
            if(r.error){
      
        notify(r.error);
      }else{
       setmydata({...mydata,images:newdata.images})
       localStorage.setItem("User",JSON.stringify(mydata))
        notify("Image Uploaded Successfully");
        setFiles([])
      }
    }
  }
  }
  const getGroupData=async()=>{
    let r=await API.get(`/group/${id}`)
    let info={
      title:r.title,
      description:r.description
    }
    setgroupdata(r)
    setGroupinfo(info)
}  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius:"5px",
  p: 4,
};
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const handleGroupDelete=async()=>{
let r=await API.delete(`/group/${groupdata._id}`)
if(r){
  navigate('/Home')
}

}
const handleUpdateGroup=async()=>{
let r=await API.put(`/group/${groupdata._id}`,Groupinfo)
console.log(r);
handleClose();
getGroupData();
setshowSetting(false)
}
  useEffect(()=>{
    getGroupData();
    getAllPost();
    console.log(groupdata)
  },[id])
    return (
      <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <TextFieldsContainer style={{width:"100%"}}>

    <InputFieldContainer>
    <InputField   label="Title"  value={Groupinfo.title} onChange={(e)=>setGroupinfo({...Groupinfo,title:e.target.value})}/>
   
    </InputFieldContainer>
    
    <InputFieldContainer>

    <InputField  label="Description"  value={Groupinfo.description} onChange={(e)=>setGroupinfo({...Groupinfo,description:e.target.value})}/>
  
    </InputFieldContainer>

 <div class="button-container">
                    <button className='SaveButton' onClick={handleUpdateGroup}>Update</button>
                </div>

</TextFieldsContainer>
         
        </Box>
      </Modal>
       <DashboardContainer>
      <Header/>
      <DashboardContentContainer>
      <div className='sidebar-container'>
              <Sidebar/>
              </div>
              <UserContainer>
              <UserProfileContainer>
              <div className='background-img' style={{background:`url(${groupdata.coverImage})`}}></div>
              <div className='card-body'>
         <div className='avatar-container'>
         <Avatar alt="Cindy Baker" src={groupdata.coverImage} sx={{cursor:"pointer",width:"100px",height:"100px"}}/>
         </div>
         <div className='group-content'>
          <h1>{groupdata.title}</h1>
         <p style={{width:"55vw",}}>{groupdata.description}</p>
         </div>
         <div style={{marginTop:"5px",marginLeft:"50px",display:"flex",justifyContent:"center",alignItems:"center",background:'lightGray',borderRadius:"50px",width:"50px",height:"50px"}}>
          <MoreHorizIcon style={{color:'black',fontSize:"40px",cursor:"pointer"}} onClick={()=>setshowSetting(!showSetting)}/></div>
          <div className='post-setting' style={{position:'relative'}}>
            <div className='animate__animated animate__zoomIn setting-data' style={showSetting==false?{display:"none"}:{display:'flex',left:'-65px'}}>
                <p onClick={handleOpen}>Edit</p>
                <p onClick={handleGroupDelete}>Delete</p>
            </div>
            
        </div>
         </div>
              </UserProfileContainer>
             
              <UserTabContainer>
              <Box sx={{ width: '100%', typography: 'body1', '& .Mui-selected':{color:'#A020F0 !important'} ,'& .MuiTab-textColorPrimary':{fontSize:'12px !important',fontFamily:'Montserrat !important',fontWeight:'bold !important'},'& .css-1aquho2-MuiTabs-indicator':{backgroundColor:'#A020F0 !important'},'& .css-jpln7h-MuiTabs-scroller':{backgroundColor:'white !important',borderRadius:'10px !important',overflow:'hidden !important'},'& .lowSeC':{boxShadow:'none !important'},'& .css-13xfq8m-MuiTabPanel-root':{marginTop:'20px !important',borderRadius:'10px !important'},'& .lowSeC':{boxShadow:"none !important"}}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Home" value="1"  />
              <Tab label="Group Members" value="2" />
              <Tab label="Request" value="3" />
             
             
            
            </TabList>
          </Box>
          <TabPanel value="1">
          <CreatePostContainer style={{width:'100%',}}>
              <div className='create' style={{cursor:'pointer'}} onClick={AddPost}>
                <BorderColorOutlinedIcon style={{color:'#A020F0'}}/>
                <p>Create Post</p>
              </div>
              <div className="postcontainer">
                <div className='post-header'>
                  <h5>Title</h5>
                  <input placeholder='Enter Post Title' value={postdata.title} onChange={(e)=>setpostdata({...postdata,title:e.target.value})}/>
                </div>
                <div className='post-content'>
                <Avatar alt="Cindy Baker" src={groupdata.coverImage} sx={{cursor:"pointer"}}/>
                <textarea name="desc" rows="4" cols="70" placeholder='Whats on your mind?' value={postdata.description} onChange={(e)=>setpostdata({...postdata,description:e.target.value})}>
                
                </textarea>
              {img.length>0 &&<Image src={img} alt="" width="200px" height="200px"/>}  
                </div>
                <div className="post-footer">
                  <div>
                  <WallpaperIcon sx={{color:"#10d876"}}/>
                <input type="file" onChange={(e)=>setImg(URL.createObjectURL(e.target.files[0]))}/>
                  <p>Photo/Video</p>
                  </div>
               
               <div >
               <MiscellaneousServicesIcon sx={{color:"#fe9431"}} onClick={handleDropDown}/>
               <p onClick={()=>handleDropDown("click")}>{postType}</p>
               <div className='dropDownbox animate__animated animate__zoomIn' ref={postRef}>
                <p className={postType=="Public"?'active':''} onClick={()=>setpostType("Public")}><PublicIcon />  Public</p>
                <p className={postType=="Private"?'active':''} onClick={()=>setpostType("Private")}><SecurityIcon/> Private</p>
                <p className={postType=="only_me"?'active':''}onClick={()=>setpostType("only_me")}><EnhancedEncryptionIcon/> only_me</p>
               </div>
               </div>
                </div>
              </div>
            </CreatePostContainer>
            <AllPostContainer >
              {groupdata.posts.map((item)=>{
                return <Post  postId={item._id} title={item.title} totalcomment={item.noComment} totallike={item.numberOfLike} comments={item.comments} privacy={item.privacy} user={item.user} description={item.description} postImg={item.file}/>
              })}
              {groupdata.posts.length===0?<h1 style={{textAlign:'center',fontSize:"25px",width:"100%",color:'#A020F0'}}>No Post found</h1>:<p></p>}
      
      </AllPostContainer>
      </TabPanel>
        
         
         
          <TabPanel value="2">
          <FriendsCardContainer>
            <Searchbar/>
            <FriendsContainer>
             {groupdata.members.map((item,index)=>{
              return <GroupPageCard Imgurl={GroupImg2} unfollow={true}/>
             })}
         
         
             </FriendsContainer>
            </FriendsCardContainer>
          </TabPanel>
          <TabPanel value="3">
          <FriendsCardContainer>
            <Searchbar/>
            <FriendsContainer>
             
         <GroupPageCard Imgurl={GroupImg2} unfollow={true}/>
         
             </FriendsContainer>
            </FriendsCardContainer>
          </TabPanel>
          
        </TabContext>
      </Box>
              </UserTabContainer>
              </UserContainer>
            
              </DashboardContentContainer>
              
              </DashboardContainer>
      <ToastContainer position="top-right"
  autoClose={3000}
  hideProgressBar={true}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover />
      </>
     
    )
  }
export default MyGroupPage