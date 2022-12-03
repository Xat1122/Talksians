import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  AccountInformationContainer,
  AccountInformationHeader,
  AccountInformationContent,
} from "../AccountInformation/AccountInformation.style";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { PasswordInformationContent } from "../Password/Password.style";
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import axios from "axios";
import { API } from "../../services/api";
const CreatePage = () => {
  const location=useLocation()
  console.log(location,"location")
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [pageData, setPageData] = useState({
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

  const CreatePage = async (e) => {
    e.preventDefault();
    if (
      files[0] !== null ||
      !files[0] !== undefined ||
      files2[0] !== null ||
      !files2[0] !== undefined
    ) {
      console.log(files[0],files2[0],"files[0],files2[0]")
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

      if (status == 200 && status2 == 200) {
        let newdata = {
          title: pageData.title,
          description: pageData.description,
          coverImage: data.url,
          logo: data2.url,
        };
        setPageData(newdata);
        let r = await API.post("/page/", newdata);
        if (r.error) {
          notify(r.error);
        } else {
          notify("Page Created Successfully");
          setFiles([]);
          setFiles2([]);
          navigate("/allPages");
        }
      }
    } else {
      let r = await API.post("/page/", pageData);
      if (r.error) {
        notify(r.error);
      } else {
        notify("Page Created Successfully");
      }
    }
  };
  useEffect(() => {
    const getMyPage = async () => {
      let r = await API.get("/page/");
      console.log(r);
    };
    getMyPage();
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
              <h1> Create Page</h1>
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
                    <div>{images}</div>
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
                    <div>{images2}</div>
                  </div>
                </div>
              </div>

              <div className="InputGroup">
                <div class="button-container">
                  <button className="SaveButton" onClick={CreatePage}>
                    Create Page
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

export default CreatePage;
