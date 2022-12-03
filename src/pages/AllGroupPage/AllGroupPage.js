import React,{useState,useEffect,useRef} from 'react'
import Header from '../../components/Header/Header'
import {DashboardContainer,DashboardContentContainer} from "../../styles"
import Sidebar from '../../components/Sidebar/Sidebar'
import {DashboardMidContainer} from "../UserDashboard/UserDashboard.style"
import PageHeader from "../../components/PageHeader/PageHeader"
import {GroupContainer} from "./AllGroupPage.style"
import GroupPageCard from "../../components/Card/GroupPageCard"
import GroupImg from "../../assets/page.jpg"
import {API} from "../../services/api"
const AllGroupPage = () => {
  const[search,setSearch]=useState("");
  const[searchdata,setsearchData]=useState([])
  const searchGroups=async()=>{
    let r=await API.get(`/group/search?keyword=${search}`)
    if(r){
      setsearchData(r)
      console.log(r)
    }
    
  }
  useEffect(()=>{
    searchGroups();
    console.log(search)
    
  },[search])
  return (
    <DashboardContainer>
<Header/>
<DashboardContentContainer>
<div className='sidebar-container'>
        <Sidebar/>
        </div>
        <DashboardMidContainer>
        <PageHeader title="Groups" search={search} setSearch={setSearch}/>
        <GroupContainer>
          {searchdata.length>0 && searchdata.map((item,index)=>{
            return <GroupPageCard id={item._id} key={index} Imgurl={item.coverImage} myGroup={true} creatorId={item.creator}/>
          })}



        </GroupContainer>
          </DashboardMidContainer>
</DashboardContentContainer>
      </DashboardContainer>
  )
}

export default AllGroupPage