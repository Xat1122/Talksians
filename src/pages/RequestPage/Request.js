import React,{useState,useEffect,useRef} from 'react'
import Header from '../../components/Header/Header'
import {DashboardContainer,DashboardContentContainer} from "../../styles"
import Sidebar from '../../components/Sidebar/Sidebar'
import {DashboardMidContainer} from "../UserDashboard/UserDashboard.style"
import PageHeader from "../../components/PageHeader/PageHeader"
import {RequestContainer} from "./Request.style"
import RequestCard from "../../components/RequestCard/RequestCard"
import {API} from "../../services/api"
const Request = () => {
  const [request,setRequest]=useState([])
  useEffect(()=>{
    const getAllRequest=async()=>{
      let r=await API.get('/user/all-friend-requests')
      console.log(r)
    }
    getAllRequest();
  },[])
  return (
    <DashboardContainer>
<Header/>
<DashboardContentContainer>
<div className='sidebar-container'>
        <Sidebar/>
        </div>
        <DashboardMidContainer>
        <PageHeader title="Friend Request"/>
        <RequestContainer>
<RequestCard/>
<RequestCard/>
<RequestCard/>
<RequestCard/>
<RequestCard/>
<RequestCard/>
<RequestCard/>
<RequestCard/>
        </RequestContainer>
          </DashboardMidContainer>
</DashboardContentContainer>
      </DashboardContainer>
  )
}

export default Request