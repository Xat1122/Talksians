import React from 'react'
import { DashboardContainer, DashboardContentContainer } from '../styles'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import RqImage from '../assets/reports.jpg'
import RpImage from '../assets/requests.jpg'
import { useNavigate } from 'react-router-dom'
import { SearchContainer, SearchInput } from '../components/Header/Header.style'
import SearchIcon from "@mui/icons-material/Search";


const Admin = () => {
  let navigate = useNavigate()
  return (
    <DashboardContainer>
      <AdminHeader />
      <DashboardContentContainer>
        <div className="sidebar-container">
          <AdminSidebar />
        </div>
        {/* Library Mian Container */}
        <div className="border bg-white m-2 shadow-xl p-3 w-full rounded-xl">
          <div className='flex justify-end mb-4'>
            <SearchContainer>
              <SearchIcon sx={{ color: "#ced4da" }} />
              <SearchInput type="text" placeholder="Search" />
            </SearchContainer>
          </div>


          {/* Total Reports */}
          <div className='flex'>
            <div className="bg-gray-100 w-96 h-72 rounded-lg shadow-xl overflow-hidden mr-4 mb-4 cursor-pointer" onClick={() => {
              navigate(`/admin-reports`)
            }}>
              <div className="w-full h-full">
                <p className="h-1/6 p-2 flex items-center text-white bg-gradient-to-r from-mainColor to-purple-400 mb-0 text-xl">{'Total Reports'}</p>
                <div className="w-full h-5/6">
                  <img src={RpImage} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/*Total Verifications */}

            <div className="bg-gray-100 w-96 h-72 rounded-lg shadow-xl overflow-hidden mr-4 mb-4 cursor-pointer" onClick={() => {
              navigate(`/admin-verifications`)
            }}>
              <div className="w-full h-full">
                <p className="h-1/6 p-2 flex items-center text-white bg-gradient-to-r from-mainColor to-purple-400 mb-0 text-xl">{'Total Verification Requests'}</p>
                <div className="w-full h-5/6">
                  <img src={RqImage} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </DashboardContentContainer>
    </DashboardContainer>
  )
}

export default Admin