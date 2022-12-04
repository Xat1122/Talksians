import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DashboardMidContainer } from "../UserDashboard/UserDashboard.style";
import PageHeader from "../../components/PageHeader/PageHeader";
import { GroupContainer } from "../AllGroupPage/AllGroupPage.style";
import PageCard from "../../components/PageCard/PageCard";
import GroupImg from "../../assets/group2.jpg";
import {
  createPageFromCreater,
  getAllPages,
  getMyAllPostsFromAction,
} from "../../redux/action/Pages";
import { connect } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
const AllPages = (props) => {
  const { getAllPagesFromActions, pagesdataFromRedux, pagesLoading,getMyAllPosts } = props;
  const [page, setPage] = useState(0);
  const selector = JSON.parse(localStorage.getItem("User"));
  const [userdata, setuserdata] = useState(selector);
  useEffect(() => {
    getAllPagesFromActions().then((res) => {
      console.log(res.data, "data");
    });
    getMyAllPosts(userdata._id).then((res)=>{
      console.log(res.data,"res.data")
    })
  }, []);

  console.log(pagesdataFromRedux, "pagesdataFromRedux");
  return (
    <DashboardContainer>
      <Header />
      <DashboardContentContainer>
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <DashboardMidContainer>
          <PageHeader title="Pages" />
          <div className="flex my-2 bg-white p-1 rounded-lg">
            <button className={`m-2 ${page===0?'bg-purple-500':'bg-gray-500'} px-4 py-2 rounded-lg text-white`} onClick={()=>setPage(0)}>
              Pages
            </button>
            <button className={`m-2 ${page===1?'bg-purple-500':'bg-gray-500'} px-4 py-2 rounded-lg text-white`} onClick={()=>setPage(1)}>
              My All Posts in Pages
            </button>
            <button className={`m-2 ${page===2?'bg-purple-500':'bg-gray-500'} px-4 py-2 rounded-lg text-white`} onClick={()=>setPage(2)}>
              All Pages Posts
            </button>
          </div>
          {page === 0 && (
            <GroupContainer>
              {pagesLoading ? (
                <div className="w-full flex justify-center items-center">
                  <Spinner
                    animation="grow"
                    style={{
                      width: "200px",
                      height: "200px",
                      backgroundColor: "#A020F0",
                    }}
                  />
                </div>
              ) : pagesdataFromRedux?.length > 0 ? (
                pagesdataFromRedux?.map((page) => {
                  return (
                    <PageCard
                      page={page}
                      getAllPagesFromActions={getAllPagesFromActions}
                    />
                  );
                })
              ) : (
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "25px",
                    width: "100%",
                    color: "#A020F0",
                  }}
                >
                  No Pages to show
                </h1>
              )}
            </GroupContainer>
          )}

          {page === 1 && <GroupContainer>1</GroupContainer>}
          {page === 2 && <GroupContainer>2</GroupContainer>}
        </DashboardMidContainer>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
const mapStateToProps = (state) => {
  return {
    pagesdataFromRedux: state.pages.getAllPages.data,
    pagesLoading: state.pages.getAllPages.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPagesFromActions: () => dispatch(getAllPages()),
    getMyAllPosts: (id) => dispatch(getMyAllPostsFromAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPages);
