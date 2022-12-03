import React,{useState,useEffect,useRef} from 'react'
import {PostContainer,PostHeader,PostBody,PostFooter,PostComment} from "./Post.style"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import userImg from "../../../src/assets/user.png"
import { Image } from 'react-bootstrap';
import PostImg from "../../../src/assets/post.jpg"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import {API} from "../../services/api"
import PostComent from './PostComent';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {TextFieldsContainer,InputField,InputFieldContainer} from '../../styles';
import Radio from '@mui/material/Radio';
const Post = ({getData,postId,title="",totalcomment=0,totallike=0,comments=[],privacy=true,user="633b25f48ba3dcb1e98a8700",description=" empty description",postImg=PostImg}) => {
    const[like,setLike]=useState(false)
    const[username,setusername]=useState('');
    const [profileImage,setprofileImage]=useState(userImg)
    const userPostRef=useRef(null)
    const [showSetting,setshowSetting]=useState(true)
    const [comment,setcomment]=useState("");
    const[postdata,setpostdata]=useState({
        title:title,
        description:description,
        isPublic:privacy
      })
    const ToogleComment=()=>{
        userPostRef.current.style.display=="block"?userPostRef.current.style.display="none":userPostRef.current.style.display="block"
    }
    const getUser=async()=>{
        let r=await API.get(`/user/${user}`)
        if(r){
            setusername(r.firstName+" "+r.lastName )
            setprofileImage(r.profileImage)
        }
        console.log(r)
    }
    useEffect(()=>{

        getUser();
    },[])
    const handlePostDelete=async(postId)=>{
        let r=await API.delete(`/post/${postId}`)
        console.log(r)
        getData();
    }
    const handleLike=async()=>{
        let r=await API.post(`/post/${postId}/like-unlike`)
        console.log(r)
        getData();
    }
    const handleComment=async()=>{
        let r=await API.post(`/post/${postId}/comment-react`,{comment:comment})
        console.log(r)
        getData();
    }
    const handleUpdatePost=async()=>{
        let r=await API.put(`/post/${postId}`,postdata)
        console.log(r)
        handleClose();
        setshowSetting(!showSetting);
        getData();
    }
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    <InputField   label="Title"  value={postdata.title} onChange={(e)=>setpostdata({...postdata,title:e.target.value})}/>
   
    </InputFieldContainer>
    
    <InputFieldContainer>

    <InputField  label="Description"  value={postdata.description} onChange={(e)=>setpostdata({...postdata,description:e.target.value})}/>
  
    </InputFieldContainer>
 <div style={{display:'flex',alignItems:"center",justifyContent:"center",flexDirectior:"row"}}>
 <Radio
  checked={postdata.isPublic}
    onClick={()=>setpostdata({...postdata,isPublic:!postdata.isPublic})}
  value="a"
  name="radio-buttons"
  inputProps={{ 'aria-label': 'A' }}
/><label style={{color:'#A020F0',marginBottom:"0px"}}>Public</label>
 </div>
 <div class="button-container">
                    <button className='SaveButton' onClick={handleUpdatePost}>Update</button>
                </div>

</TextFieldsContainer>
         
        </Box>
      </Modal>

      <PostContainer>
        <PostHeader>
        <div className='post-avatar'>
        <Avatar alt="Cindy Baker" src={profileImage} sx={{cursor:"pointer"}}/>
        <div className='post-header-content'>
            <p className='person'>{username} </p>
            {/* <p className='hours'>3 hours ago</p> */}
        </div>
        </div>
        <div className='animate__animated animate__zoomIn setting-data' style={showSetting==false?{display:"none"}:{display:'flex'}}>
                <p onClick={handleOpen}>Edit</p>
                <p onClick={()=>handlePostDelete(postId)}>Delete</p>
            </div>
        <div className='post-setting'>
            
            <MoreHorizIcon onClick={()=>setshowSetting(!showSetting)}/>
        </div>
        </PostHeader>
        <PostBody>
            <div className='postTitle'>{title}</div>
            <div className='post-description'>
            {description}
            </div>
            <div className='post-photo'>
            <Image src={postImg} alt="Image not found"/>
            </div>
        </PostBody>
        <PostFooter like={like}>
        <div className='Like-container'>
            <ThumbUpIcon sx={like==true?{color:'#A020F0'}:{color:'#adb5bd'}} onClick={handleLike}/>
            <p>{totallike}</p>
        </div>
        <div className='Like-container'>
            <MapsUgcIcon sx={{color:'#A020F0',cursor:"pointer"}} onClick={()=>ToogleComment()}/>
            <p>{comments.length}</p>
        </div>
       
        </PostFooter>
       
       {comments.length>0 && 
       
       <PostComment ref={userPostRef} >
       {comments.map((item,index)=>{
           return <PostComent getData={getData} commentId={item._id} postId={postId} comment={item.comment} commentBy={item.commentBy}/>
       })}
           </PostComment>
       }
         <div className='PostComment'>
            <input placeholder='Add Comment' value={comment} onChange={(e)=>setcomment(e.target.value)}/>
            <div class="button-container" style={{marginTop:"10px",marginBottom:'0px',display:'flex',justifyContent:"center"}}>
                <button className='SaveButton' onClick={handleComment} >Add</button>
                </div>
        </div>    
    </PostContainer>
    </>
    
  )
}

export default Post