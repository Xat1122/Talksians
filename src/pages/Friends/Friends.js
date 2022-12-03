import React,{useState,useEffect,useRef} from 'react'
import Header from '../../components/Header/Header'
import {DashboardContainer,DashboardContentContainer} from "../../styles"
import Sidebar from '../../components/Sidebar/Sidebar'
import {DashboardMidContainer} from "../UserDashboard/UserDashboard.style"
import PageHeader from "../../components/PageHeader/PageHeader"
import {RequestContainer} from "../RequestPage/Request.style"
import RequestCard from "../../components/RequestCard/RequestCard"
import {API} from "../../services/api"
const Friends = () => {
  const[search,setSearch]=useState("");
  const[searchdata,setsearchData]=useState([])
  const searchUser=async()=>{
    console.log(search)
    let r=await API.get(`/user/search-user?name=${search}`)
    if(r){
      setsearchData(r)
      console.log(r)
    }
    
  }
  useEffect(()=>{
    searchUser();
  },[search])
  return (
    <DashboardContainer>
<Header/>
<DashboardContentContainer>
<div className='sidebar-container'>
        <Sidebar/>
        </div>
        <DashboardMidContainer>
        <PageHeader title="Friends" search={search} setSearch={setSearch}/>
        <RequestContainer>
          {searchdata.length>0 && searchdata.map((item,index)=>{
            return <RequestCard key={index} type="search"/>
          })}


        </RequestContainer>
          </DashboardMidContainer>
</DashboardContentContainer>
      </DashboardContainer>
  )
}

export default Friends