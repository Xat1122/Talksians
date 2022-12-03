import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  AccountInformationContainer,
  AccountInformationHeader,
  AccountInformationContent,
} from "../AccountInformation/AccountInformation.style";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { PasswordInformationContent } from "../Password/Password.style";
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import axios from "axios";
import { API } from "../../services/api";
import { getPageByIdFromAction } from "../../redux/action/Pages";
import { connect } from "react-redux";
const UpdatePage = (props) => {
  const { getPageById, getPageData, getPageDataLoading } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [pageData, setPageData] = useState({
    title: getPageData ? getPageData.title : "",
    description: getPageData ? getPageData.description : "",
  });
  const images = files.map((file) => {
    return (
      <div>
        <img src={file.preview} width="200px" alt="preview" />
      </div>
    );
  });

  const images2 = files2.map((file) => {
    return (
      <div>
        <img src={file.preview} width="200px" alt="preview" />
      </div>
    );
  });

  const notify = (Message) => toast(Message);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
  });

  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } =
    useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        setFiles2(
          acceptedFiles.map((file) => {
            return Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
          })
        );
      },
    });

  const updatePage = async (e) => {
    e.preventDefault();
    if (files.length > 0 && files2.length === 0) {
      const formdata = new FormData();
      formdata.append("image", files[0]);
      let { data, status } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/upload`,
        formdata
      );
      let newdata = {
        title: pageData.title,
        description: pageData.description,
        coverImage: files.length > 0 ? data.url : getPageById?.coverImage,
        logo: getPageById?.logo,
      };
      setPageData(newdata);
      let r = await API.put(`/page/${id}`, newdata);
      if (r.error) {
        notify(r.error);
      } else {
        notify("Page Updated Successfully");
        setFiles([]);
        setFiles2([]);
        navigate("/allPages");
      }
    }
    if (files2.length > 0 && files.length === 0) {
      const formdata2 = new FormData();
      formdata2.append("image", files2[0]);
      let { data: data2, status: status2 } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/upload`,
        formdata2
      );

      let newdata = {
        title: pageData.title,
        description: pageData.description,
        coverImage: getPageById?.coverImage,
        logo: files2.length > 0 ? data2.url : getPageById?.logo,
      };
      setPageData(newdata);
      let r = await API.put(`/page/${id}`, newdata);
      if (r.error) {
        notify(r.error);
      } else {
        notify("Page Updated Successfully");
        setFiles([]);
        setFiles2([]);
        navigate("/allPages");
      }
    }
    if (files.length > 0 && files2.length > 0) {
      const formdata = new FormData();
      formdata.append("image", files[0]);
      let { data, status } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/upload`,
        formdata
      );

      const formdata2 = new FormData();
      formdata2.append("image", files2[0]);
      let { data: data2, status: status2 } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/upload`,
        formdata2
      );
      let newdata = {
        title: pageData.title,
        description: pageData.description,
        coverImage: files.length > 0 ? data.url : getPageById?.coverImage,
        logo: files2.length > 0 ? data2.url : getPageById?.logo,
      };
      setPageData(newdata);
      let r = await API.put(`/page/${id}`, newdata);
      if (r.error) {
        notify(r.error);
      } else {
        notify("Page Updated Successfully");
        setFiles([]);
        setFiles2([]);
        navigate("/allPages");
      }
    }

    if (files.length ===0 && files2.length ===0) {
      let newdata = {
        title: pageData.title,
        description: pageData.description,
        coverImage: getPageById?.coverImage,
        logo: getPageById?.logo,
      };
      setPageData(newdata);
      let r = await API.put(`/page/${id}`, newdata);
      if (r.error) {
        notify(r.error);
      } else {
        notify("Page Updated Successfully");
        setFiles([]);
        setFiles2([]);
        navigate("/allPages");
      }
    }
    // const formdata = new FormData();
    // formdata.append("image", files[0]);
    // let { data, status } = await axios.post(
    //   `${process.env.REACT_APP_BASE_URL}/user/upload`,
    //   formdata
    // );
  };
  useEffect(() => {
    getPageById(id).then((res) => {
      console.log(res.data, "res.data");
    });
  }, []);
  return (
    <>
      <DashboardContainer>
        <Header />
        <DashboardContentContainer>
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <AccountInformationContainer>
            <AccountInformationHeader>
              <Link to="/Home">
                <ArrowBackRoundedIcon style={{ color: "white" }} />
              </Link>
              <h1> Update Page</h1>
            </AccountInformationHeader>
            <PasswordInformationContent>
              <div className="InputGroup">
                <label>Title</label>
                <input
                  placeholder="Title"
                  className="UserInputFields"
                  value={pageData.title}
                  onChange={(e) =>
                    setPageData({ ...pageData, title: e.target.value })
                  }
                />
              </div>
              <div className="InputGroup">
                <label>Description</label>
                <textarea
                  placeholder="Description"
                  className="UserInputFields"
                  value={pageData.description}
                  onChange={(e) =>
                    setPageData({ ...pageData, description: e.target.value })
                  }
                />
              </div>
              <div className="InputGroup">
                <div
                  className="InputGroupContainer"
                  style={{ marginTop: "-60px" }}
                >
                  <div
                    className="InputDropContainer"
                    {...getRootProps()}
                    style={{ width: "100%" }}
                  >
                    <p>Drop Image Here</p>
                    <CloudDownloadOutlinedIcon
                      style={{ width: "50px", height: "50px" }}
                    />
                    <input {...getInputProps()} />
                    {files.length > 0 ? (
                      <div>{images}</div>
                    ) : (
                      <div>
                        <img
                          src={getPageData?.coverImage}
                          width="200px"
                          alt="preview"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="InputGroup">
                <div
                  className="InputGroupContainer"
                  style={{ marginTop: "-60px" }}
                >
                  <div
                    className="InputDropContainer"
                    {...getRootProps2()}
                    style={{ width: "100%" }}
                  >
                    <p>Drop Image Here For Page Icon</p>
                    <CloudDownloadOutlinedIcon
                      style={{ width: "50px", height: "50px" }}
                    />
                    <input {...getInputProps2()} />
                    {files2.length > 0 ? (
                      <div>{images2}</div>
                    ) : (
                      <div>
                        <img
                          src={getPageData?.logo}
                          width="200px"
                          alt="preview"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="InputGroup">
                <div class="button-container">
                  <button className="SaveButton" onClick={updatePage}>
                    Update Page
                  </button>
                </div>
              </div>
            </PasswordInformationContent>
          </AccountInformationContainer>
        </DashboardContentContainer>
      </DashboardContainer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    getPageData: state.pages.getPageByIdFromRedux.data,
    getPageDataLoading: state.pages.getPageByIdFromRedux.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPageById: (id) => dispatch(getPageByIdFromAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePage);
