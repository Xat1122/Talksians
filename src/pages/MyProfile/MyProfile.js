import React, { useState, useEffect, useRef } from 'react'
import Header from '../../components/Header/Header'
import { DashboardContainer, DashboardContentContainer } from "../../styles"
import Sidebar from '../../components/Sidebar/Sidebar'
import { DashboardMidContainer } from "../UserDashboard/UserDashboard.style"
import PageHeader from "../../components/PageHeader/PageHeader"
import { GroupContainer } from "../AllGroupPage/AllGroupPage.style"
import GroupPageCard from "../../components/Card/GroupPageCard"
import GroupImg from "../../assets/flower.jpg"
import GroupImg2 from "../../assets/group.jpg"
import { UserProfileContainer, UserTabContainer, UserContainer, FriendsContainer, FriendsCardContainer } from "../UserProfile/Userprofile.style"
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
import { AllPostContainer } from "../UserDashboard/UserDashboard.style"
import Photo from '../../components/Photo/Photo'
import { CreatePostContainer } from '../UserDashboard/UserDashboard.style'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Image } from 'react-bootstrap'
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { API } from "../../services/api"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { useDropzone } from 'react-dropzone'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
const MyProfile = () => {
  const selector = JSON.parse(localStorage.getItem("User"))
  const [mydata, setmydata] = useState(selector);
  const [postdata, setpostdata] = useState({
    title: "",
    description: "",
    file: "",
    isPublic: true
  })
  const navigate = useNavigate();
  const [files, setFiles] = useState([])
  const [value, setValue] = React.useState('1');
  const [mygroups, setmygroups] = useState([])
  const [myimages, setmyimages] = useState(mydata.images)
  const [AllPost, setAllPost] = useState([]);
  const [img, setImg] = useState('')
  const [postType, setpostType] = useState("Public")
  const postRef = useRef(null)
  const notify = (Message) => toast(Message);
  const AddPost = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", postdata.file)
    let { data, status } = await axios.post('http://13.37.110.92:8000/api/v1/user/upload', formdata)
    if (status == 200) {
      let newdata = {
        title: postdata.title,
        description: postdata.description,
        file: data.url,
        isPublic: postdata.isPublic
      }
      setpostdata({
        title: "",
        description: "",
        file: "",
        isPublic: true
      })
      let r = await API.post('/post/', newdata)
      console.log(r)
      setImg('');
      getAllPost();
    }

  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {

          return (Object.assign(file, {
            preview: URL.createObjectURL(file)
          }))
        })
      )
    }
  })
  const handleDropDown = (value) => {
    if (value == "click") {
      postRef.current.style.display == "block" ? postRef.current.style.display = "none" : postRef.current.style.display = "block"
    } else {
      postRef.current.style.display = "none"
    }
  }
  const handleClickOutside = (event) => {
    if (postRef.current && !postRef.current.contains(event.target)) {
      console.log("outside click");
      handleDropDown("notclick")
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {

      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [postRef])
  const getAllPost = async () => {
    let r = await API.get('/post/')

    if (r.error) {
      setAllPost([])
    } else {
      setAllPost(r.post);
    }
    console.log(r)
  }
  const getMyGroup = async () => {
    let r = await API.get('/group/')
    setmygroups(r);
    console.log(r)
  }
  useEffect(() => {


    getMyGroup();
    getAllPost();
    getMyProfile();
  }, [])
  const images = files.map((file) => {


    return (
      <div>
        <img src={file.preview} width="200px" alt='preview' />
      </div>
    )
  })
  const Upload = async (e) => {
    e.preventDefault();

    if (files[0] !== null || !files[0] !== undefined) {
      const formdata = new FormData();
      formdata.append("image", files[0])

      let { data, status } = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/upload`, formdata)

      if (status == 200) {
        let newdata = {
          images: mydata.images

        }
        newdata.images.push(data.url)

        let r = await API.put('/user/update', newdata)
        if (r.error) {

          notify(r.error);
        } else {
          setmydata({ ...mydata, images: newdata.images })
          localStorage.setItem("User", JSON.stringify(mydata))
          notify("Image Uploaded Successfully");
          setFiles([])
        }
      }
    }
    getMyProfile();
  }
  const getMyProfile = async () => {
    let r = await API.get('/user/profile')
    console.log(r)
    if (r) {
      setmydata(r)
      setmyimages(r.images)
    }
  }
  return (
    <>
      <DashboardContainer>
        <Header />
        <DashboardContentContainer>
          <div className='sidebar-container'>
            <Sidebar />
          </div>
          <UserContainer>
            <UserProfileContainer>
              <div className='background-img' style={{ background: `url(${GroupImg})` }}></div>
              <div className='card-body'>
                <div className='avatar-container'>
                  <Avatar alt="Cindy Baker" src={mydata.profileImage} sx={{ cursor: "pointer", width: "100px", height: "100px" }} />
                </div>
                <div className='group-content'>
                  <h1>{mydata.firstName} {mydata.lastName}</h1>
                  <p>{mydata.email}</p>
                </div>

              </div>
            </UserProfileContainer>

            <UserTabContainer>
              <Box sx={{ width: '100%', typography: 'body1', '& .Mui-selected': { color: '#A020F0 !important' }, '& .MuiTab-textColorPrimary': { fontSize: '12px !important', fontFamily: 'Montserrat !important', fontWeight: 'bold !important' }, '& .css-1aquho2-MuiTabs-indicator': { backgroundColor: '#A020F0 !important' }, '& .css-jpln7h-MuiTabs-scroller': { backgroundColor: 'white !important', borderRadius: '10px !important', overflow: 'hidden !important' }, '& .lowSeC': { boxShadow: 'none !important' }, '& .css-13xfq8m-MuiTabPanel-root': { marginTop: '20px !important', borderRadius: '10px !important' }, '& .lowSeC': { boxShadow: "none !important" } }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Home" value="1" />


                      <Tab label="Friends" value="4" />

                      <Tab label="MyGroups" value="5" />
                      <Tab label="Pages" value="6" />
                      <Tab label="Photos" value="7" />
                      <Tab label="Followed Groups" value="8" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <CreatePostContainer style={{ width: '100%', }}>
                      <div className='create' style={{ cursor: 'pointer' }} onClick={AddPost}>
                        <BorderColorOutlinedIcon style={{ color: '#A020F0' }} />
                        <p>Create Post</p>
                      </div>
                      <div className="postcontainer">
                        <div className='post-header'>
                          <h5>Title</h5>
                          <input placeholder='Enter Post Title' value={postdata.title} onChange={(e) => setpostdata({ ...postdata, title: e.target.value })} />
                        </div>
                        <div className='post-content'>
                          <Avatar alt="Cindy Baker" src={mydata.profileImage} sx={{ cursor: "pointer" }} />
                          <textarea name="desc" rows="4" cols="70" placeholder='Whats on your mind?' value={postdata.description} onChange={(e) => setpostdata({ ...postdata, description: e.target.value })}>

                          </textarea>
                          {img.length > 0 && <Image src={img} alt="" width="200px" height="200px" />}
                        </div>
                        <div className="post-footer">
                          <div>
                            <WallpaperIcon sx={{ color: "#10d876" }} />
                            <input type="file" onChange={(e) => { setImg(URL.createObjectURL(e.target.files[0])); setpostdata({ ...postdata, file: e.target.files[0] }) }} />
                            <p>Photo/Video</p>
                          </div>

                          <div >
                            <MiscellaneousServicesIcon sx={{ color: "#fe9431" }} onClick={handleDropDown} />
                            <p onClick={() => handleDropDown("click")}>{postType}</p>
                            <div className='dropDownbox animate__animated animate__zoomIn' ref={postRef}>
                              <p className={postType == "Public" ? 'active' : ''} onClick={() => setpostType("Public")}><PublicIcon />  Public</p>
                              <p className={postType == "Private" ? 'active' : ''} onClick={() => setpostType("Private")}><SecurityIcon /> Private</p>
                              <p className={postType == "only_me" ? 'active' : ''} onClick={() => setpostType("only_me")}><EnhancedEncryptionIcon /> only_me</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CreatePostContainer>
                    <AllPostContainer >
                      {AllPost.map((item) => {
                        return <Post getData={() => getAllPost()} postId={item._id} title={item.title} totalcomment={item.noComment} totallike={item.numberOfLike} comments={item.comments} privacy={item.privacy} user={item.user} description={item.description} postImg={item.file} />
                      })}
                      {AllPost.length === 0 ? <h1 style={{ textAlign: 'center', fontSize: "25px", width: "100%", color: '#A020F0' }}>No Post found</h1> : <p></p>}

                    </AllPostContainer></TabPanel>


                  <TabPanel value="4" >
                    <FriendsCardContainer>
                      <Searchbar />
                      <FriendsContainer>

                        <RequestCard myfriend={true} />
                        <RequestCard myfriend={true} />
                        <RequestCard myfriend={true} />
                        <RequestCard myfriend={true} />
                        <RequestCard myfriend={true} />
                        <RequestCard myfriend={true} />
                        <RequestCard myfriend={true} />
                        <RequestCard myfriend={true} />
                        <RequestCard myfriend={true} />
                        <RequestCard myfriend={true} />
                      </FriendsContainer>
                    </FriendsCardContainer>


                  </TabPanel>
                  <TabPanel value="5">
                    <FriendsCardContainer>
                      <Searchbar />
                      <FriendsContainer>
                        {mygroups.map((item, index) => {
                          console.log(item)
                          return <GroupPageCard id={item._id} key={index} Imgurl={item.coverImage} myGroup={true} creatorId={item.creator} />
                        })}


                      </FriendsContainer>
                    </FriendsCardContainer>
                  </TabPanel>
                  <TabPanel value="6">
                    <FriendsCardContainer>
                      <Searchbar />
                      <FriendsContainer>

                        <GroupPageCard Imgurl={GroupImg2} unfollow={true} />
                        <GroupPageCard Imgurl={GroupImg} unfollow={true} />
                        <GroupPageCard Imgurl={GroupImg} unfollow={true} />
                        <GroupPageCard Imgurl={GroupImg2} unfollow={true} />
                        <GroupPageCard Imgurl={GroupImg2} unfollow={true} />
                        <GroupPageCard Imgurl={GroupImg} unfollow={true} />
                        <GroupPageCard Imgurl={GroupImg} unfollow={true} />
                        <GroupPageCard Imgurl={GroupImg} unfollow={true} />
                        <GroupPageCard Imgurl={GroupImg2} unfollow={true} />
                      </FriendsContainer>
                    </FriendsCardContainer>
                  </TabPanel>
                  <TabPanel value="7">
                    <FriendsCardContainer>

                      <FriendsContainer>
                        {myimages.map((item, index) => {
                          return <Photo Imgurl={item} />
                        })}
                        {myimages.length === 0 && <h1 style={{ textAlign: 'center', fontSize: "25px", width: "100%", color: '#A020F0' }}>Donot have any images</h1>}
                        <div className='InputGroup' style={{ width: "100%" }}>
                          <div className="InputGroupContainer" style={{ marginTop: '-60px', display: "flex", flexDirection: 'column' }}>

                            <div className='InputDropContainer' {...getRootProps()} style={{ width: '100%' }}>
                              <p >Drop Image Here</p>
                              <CloudDownloadOutlinedIcon style={{ width: '50px', height: "50px" }} />
                              <input {...getInputProps()} />
                              <div>{images}</div>

                            </div>
                            <div class="button-container" style={{ marginTop: "-50px", display: 'flex', justifyContent: "center" }}>
                              {files.length === 0 ? <button disabled style={{ backgroundColor: '#A9A9A9' }} className='SaveButton' >Upload</button> : <button className='SaveButton' onClick={Upload} >Upload</button>}
                            </div>

                          </div>
                        </div>
                      </FriendsContainer>
                    </FriendsCardContainer>
                  </TabPanel>
                  <TabPanel value="8">
                    <FriendsCardContainer>

                      <FriendsContainer>

                        <Photo Imgurl={GroupImg2} />
                        <Photo Imgurl={GroupImg} />
                        <Photo Imgurl={GroupImg} />
                        <Photo Imgurl={GroupImg2} />
                        <Photo Imgurl={GroupImg2} />
                        <Photo Imgurl={GroupImg} />
                        <Photo Imgurl={GroupImg} />
                        <Photo Imgurl={GroupImg} />
                        <Photo Imgurl={GroupImg2} />
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

export default MyProfile