import React from 'react'
import AdminHeader from '../AdminHeader'
import AdminSidebar from '../AdminSidebar'
import ReportsImage from '../../assets/reports.jpg'
import { DashboardContainer, DashboardContentContainer } from '../../styles'
import SearchIcon from "@mui/icons-material/Search";
import { SearchContainer, SearchInput } from '../../components/Header/Header.style'
import { useNavigate } from 'react-router-dom'

const AdminReports = () => {
    let navigate=useNavigate()
    return (
        <DashboardContainer>
            <AdminHeader />
            <DashboardContentContainer>
                <div className="sidebar-container">
                    <AdminSidebar />
                </div>
                {/* Library Mian Container */}
                <div className="border bg-white m-2 shadow-xl p-3 w-full rounded-xl">
                    <div className='flex justify-between mb-4'>
                        <div className='bg-mainColor flex items-center justify-center w-8 h-8 rounded-full cursor-pointer' onClick={() => {
                            navigate(-1)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                            </svg>
                        </div>
                        <SearchContainer>
                            <SearchIcon sx={{ color: "#ced4da" }} />
                            <SearchInput type="text" placeholder="Search" />
                        </SearchContainer>
                    </div>
                    {/* Total Reports */}
                    <div className='flex flex-wrap'>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(r => {
                            return <div className="bg-gray-200 border-2 border-mainColor w-full rounded-lg shadow-xl overflow-hidden mb-4 p-3" onClick={() => {
                                // navigate(`/Catagory/${cat.id}`)
                              }}>
                                <p>Group, id, page reports and the data will be shown here like this is the page report</p>
                                <div className='flex justify-end'>
                                  <button className='bg-mainColor text-white rounded-md text-center m-2 py-2 px-6'>View Full Report</button>
                                </div>
                              </div>
                        })}
                    </div>

                </div>




            </DashboardContentContainer>
        </DashboardContainer>
    )
}

export default AdminReports