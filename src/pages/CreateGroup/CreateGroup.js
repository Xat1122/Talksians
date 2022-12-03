import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  AccountInformationContainer,
  AccountInformationHeader,
  AccountInformationContent,
} from "../AccountInformation/AccountInformation.style";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { PasswordInformationContent } from "../Password/Password.style";
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import axios from "axios";
import { API } from "../../services/api";
const CreateGroup = () => {
  const [files, setFiles] = useState([]);
  const [groupData, setGroupData] = useState({
    title: "",
    description: "",
    coverImage: "",
  });
  const images = files.map((file) => {
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
  const CreateGroup = async (e) => {
    e.preventDefault();
    if (files[0] !== null || !files[0] !== undefined) {
      const formdata = new FormData();
      formdata.append("image", files[0]);
      let { data, status } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/upload`,
        formdata
      );
      if (status == 200) {
        let newdata = {
          title: groupData.title,
          description: groupData.description,
          coverImage: data.url,
        };
        setGroupData(newdata);
        let r = await API.post("/group/", newdata);
        if (r.error) {
          notify(r.error);
        } else {
          notify("Group Created Successfully");
          setFiles([]);
        }
      }
    } else {
      let r = await API.post("/group/", groupData);
      if (r.error) {
        notify(r.error);
      } else {
        notify("Group Created Successfully");
      }
    }
  };
  useEffect(() => {
    const getMyGroup = async () => {
      let r = await API.get("/group/");
      console.log(r);
    };
    getMyGroup();
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
              <h1> Create Group</h1>
            </AccountInformationHeader>
            <PasswordInformationContent>
              <div className="InputGroup">
                <label>Title</label>
                <input
                  placeholder="Title"
                  className="UserInputFields"
                  value={groupData.title}
                  onChange={(e) =>
                    setGroupData({ ...groupData, title: e.target.value })
                  }
                />
              </div>
              <div className="InputGroup">
                <label>Description</label>
                <textarea
                  placeholder="Description"
                  className="UserInputFields"
                  value={groupData.description}
                  onChange={(e) =>
                    setGroupData({ ...groupData, description: e.target.value })
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
                    <div>{images}</div>
                  </div>
                </div>
              </div>
              <div className="InputGroup">
                <div class="button-container">
                  <button className="SaveButton" onClick={CreateGroup}>
                    Create Group
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

export default CreateGroup;
