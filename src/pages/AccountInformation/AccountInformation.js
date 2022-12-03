import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  AccountInformationContainer,
  AccountInformationHeader,
  AccountInformationContent,
} from "./AccountInformation.style";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link } from "react-router-dom";
import UserImg from "../../../src/assets/user.png";
import { useDropzone } from "react-dropzone";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { API } from "../../../src/services/api";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
var FormData = require("form-data");
const AccountInformation = () => {
  const [showImg, setShowImg] = useState(UserImg);
  const [files, setFiles] = useState([]);

  const [userdata, setuserdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    registerationNo: "",
    profileImage: "",
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
  const images = files.map((file) => {
    return (
      <div>
        <img src={file.preview} width="200px" alt="preview" />
      </div>
    );
  });
  const HandleUpdate = async (e) => {
    e.preventDefault();
    console.log(files[0]);
    if (files[0] !== null || !files[0] !== undefined) {
      const formdata = new FormData();
      console.log(files[0]);

      formdata.append("image", files[0]);

      let { data, status } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/upload`,
        formdata
      );

      if (status == 200) {
        let newdata = {
          firstName: userdata.firstName,
          lastName: userdata.lastName,
          email: userdata.email,
          registerationNo: userdata.registerationNo,
          profileImage: data.url,
        };
        console.log(newdata);
        setuserdata(newdata);
        let r = await API.put("/user/update", newdata);
        if (r.error) {
          notify(r.error);
        } else {
          notify("Contact Updated Successfully");
          setFiles([]);
        }
      }
    } else {
      let r = await API.put("/user/update", userdata);
      if (r.error) {
        notify(r.error);
      } else {
        notify("Contact Updated Successfully");
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      let r = await API.get("/user/profile");
      if (r) {
        let newdata = {
          firstName: r.firstName,
          lastName: r.lastName,
          email: r.email,
          registerationNo: r.registerationNo,
          profileImage: r.profileImage ? r.profileImage : "",
        };

        setuserdata(newdata);
      }
      console.log(r);
    };
    getUser();
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
              <Link to="/Setting">
                <ArrowBackRoundedIcon style={{ color: "white" }} />
              </Link>
              <h1> Account Information</h1>
            </AccountInformationHeader>
            <AccountInformationContent>
              <div className="UserImg">
                <img alt="image not found" src={userdata.profileImage} />
              </div>
              <h1 className="Username">
                {userdata.firstName} {userdata.lastName}
              </h1>
              <div className="InputContainer">
                <div className="InputGroupContainer">
                  <div className="InputGroup">
                    <label>First Name</label>
                    <input
                      placeholder="Firstname"
                      className="UserInputFields"
                      value={userdata.firstName}
                      onChange={(e) =>
                        setuserdata({ ...userdata, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="InputGroup">
                    <label>Last Name</label>
                    <input
                      placeholder="Lastname"
                      className="UserInputFields"
                      value={userdata.lastName}
                      onChange={(e) =>
                        setuserdata({ ...userdata, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="InputGroupContainer">
                  <div className="InputGroup">
                    <label>Email</label>
                    <input
                      placeholder="Email"
                      className="UserInputFields"
                      value={userdata.email}
                      onChange={(e) =>
                        setuserdata({ ...userdata, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="InputGroup">
                    <label>Registeration No</label>
                    <input
                      placeholder="Registeration No"
                      className="UserInputFields"
                      value={userdata.registerationNo}
                      onChange={(e) =>
                        setuserdata({
                          ...userdata,
                          registerationNo: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="InputGroupContainer">
                  <div className="InputDropContainer" {...getRootProps()}>
                    <p>Drop Image Here</p>
                    <CloudDownloadOutlinedIcon
                      style={{ width: "50px", height: "50px" }}
                    />
                    <input {...getInputProps()} />
                    <div>{images}</div>
                  </div>
                </div>
                <div class="button-container">
                  <button className="SaveButton" onClick={HandleUpdate}>
                    Save
                  </button>
                </div>
              </div>
            </AccountInformationContent>
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

export default AccountInformation;
