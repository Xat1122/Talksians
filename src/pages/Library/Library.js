import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { DashboardContainer, DashboardContentContainer } from "../../styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import Modal from "../../components/Modal";
import { Button, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import flower from "../../assets/flower.jpg";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllCatagories,
  AddCatagoryFromCreator,
  ADD_CATAGORY_SUCCESS,
  ADD_CATAGORY_FAILED,
} from "../../redux/action/Library";
import Catagory from "./LibraryComponent/Catagory";
import { toast, ToastContainer } from "react-toastify";

const Library = (props) => {
  const {
    GetAllCatagoriesFunc,
    AddCatagoryFromCreatorFunc,
    getAllCatagoriesData,
    getAllCatagoriesLoading,
  } = props;
  const selector = JSON.parse(localStorage.getItem("User"));
  const [userdata, setuserdata] = useState(selector);
  console.log(userdata, "userdata");
  const navigate = useNavigate();
  const [img, setImage] = useState(null);
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [saveCatagoryLoading, setSaveCatagoryLoading] = useState(false);
  const [catagories, setCatagories] = useState([
    { id: "1", title: "Catagory 1" },
    { id: "2", title: "Catagory 2" },
    { id: "3", title: "Catagory 3" },
    { id: "4", title: "Catagory 4" },
    { id: "5", title: "Catagory 5" },
    { id: "6", title: "Catagory 6" },
    { id: "7", title: "Catagory 7" },
    { id: "8", title: "Catagory 8" },
    { id: "9", title: "Catagory 9" },
    { id: "10", title: "Catagory 10" },
  ]);
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
        <img
          src={file.preview}
          width="400px"
          alt="preview"
          className="object-cover rounded-md"
        />
      </div>
    );
  });
  const notify = (Message) => toast(Message);

  //toggle Modal
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  // Create Catagory
  const createCatagory = () => {
    setSaveCatagoryLoading(true);
    setTimeout(() => {
      setSaveCatagoryLoading(false);
      toggleModal();
    }, 3000);
  };
  const AddCatagory = () => {
    setSaveCatagoryLoading(true);
    if (files[0] !== null || !files[0] !== undefined) {
      const formdata = new FormData();
      formdata.append("image", files[0]);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/upload`, formdata)
        .then((r) => {
          console.log(r.data.url, "Images");
          AddCatagoryFromCreatorFunc({ title, poster: r.data.url }).then(
            (res) => {
              if (res.type === ADD_CATAGORY_FAILED) {
                setSaveCatagoryLoading(false);
                setModal(false);
                notify("Failed to add catagory");
              } else {
                setSaveCatagoryLoading(false);
                setModal(false);
                notify("Catagory Added Successfully");
                GetAllCatagoriesFunc();
              }
            }
          );
        })
        .catch((e) => {
          console.log(e);
          setSaveCatagoryLoading(false);
          notify("Error in uploading Image");
        });
    }
  };

  const requestBecomeTeacher = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/become-teacher`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((r) => {
        console.log(r.data, "become a teacher");
        notify("You request is sent to admin to become a teacher");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(getAllCatagoriesData, "getAllCatagoriesData");

  // const getGroups = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_BASE_URL}/page`, {
  //       headers: {
  //         // "content-type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("Token")}`,
  //       },
  //     })
  //     .then((r) => {
  //       console.log(r.data, "Data");
  //     });
  // };

  // getGroups();

  useEffect(() => {
    GetAllCatagoriesFunc();
  }, []);

  return (
    <DashboardContainer>
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
      <Header />
      <DashboardContentContainer>
        <div className="sidebar-container">
          <Sidebar />
        </div>
        {/* Library Mian Container */}
        <div className="border bg-white m-2 shadow-xl p-3 w-full rounded-xl">
          {/* Back Button */}
          <div
            className="bg-mainColor flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </div>

          <p className="text-2xl text-gray-600 mt-3">Library</p>
          <Button
            variant="secondary"
            onClick={() => {
              if (userdata.role === "teacher") {
                toggleModal();
              } else {
                requestBecomeTeacher();
              }
            }}
          >
            Add Catagory
          </Button>

          {/* Modal for Adding new Catagories */}
          {modal && (
            <Modal active={modal} toggleModal={toggleModal}>
              <p className="text-xl text-gray-600">Add New Catagory</p>
              <input
                placeholder="Enter Title of the Catagory"
                className="border rounded font-thin text-sm p-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div
                className="w-full flex flex-col items-center justify-center"
                {...getRootProps()}
                style={{ width: "100%" }}
              >
                <p className="mt-2">
                  Select a background image for the catagory
                </p>
                <CloudDownloadOutlinedIcon
                  style={{ width: "80px", height: "80px" }}
                />
                <input {...getInputProps()} />
                <div>{images}</div>
              </div>
              <Button
                variant="secondary"
                onClick={AddCatagory}
                className="w-full mt-3 py-2"
              >
                {saveCatagoryLoading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  "Create catagory"
                )}
              </Button>
            </Modal>
          )}

          {/* All Catagories */}
          {getAllCatagoriesLoading ? (
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
          ) : getAllCatagoriesData?.length > 0 ? (
            <div className="my-3 flex flex-wrap">
              {getAllCatagoriesData.map((cat) => {
                return (
                  <Catagory
                    key={cat._id}
                    title={cat.title}
                    poster={cat.poster}
                    id={cat._id}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-2xl text-purple-500 text-center mt-4">
              No Catagories to found
            </p>
          )}
        </div>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    getAllCatagoriesData: state.Library.getAllCatagoriesReducer.data,
    getAllCatagoriesLoading: state.Library.getAllCatagoriesReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetAllCatagoriesFunc: () => dispatch(getAllCatagories()),
    AddCatagoryFromCreatorFunc: (data) =>
      dispatch(AddCatagoryFromCreator(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);
