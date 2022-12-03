import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { DashboardContainer, DashboardContentContainer } from "../../../styles";
import { useNavigate } from "react-router-dom";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { connect } from "react-redux";
import {
  deleteMaterialFromCreator,
  DELETE_MATERIAL_SUCCESS,
  getMaterialByUserIdFromCreator,
  UpdateMaterialFromCreator,
  UPDATE_MATERIAL_SUCCESS,
} from "../../../redux/action/Library";
import { Button, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Modal from "../../../components/Modal/index";
import { saveAs } from "file-saver";
import { Document, Page, pdfjs } from "react-pdf";

const Material = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    deleteMaterialByIdFunc,
    updateMaterialByIdFunc,
    updateMaterialDataLoading,
  } = props;
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const onDocumentLoadSuccess=({ numPages })=> {
    setNumPages(numPages);
  }
  console.log(location.state?.material, "location.state.material");
  //toggle Modal
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
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
  const deleteMaterialHandler = () => {
    deleteMaterialByIdFunc(id).then((res) => {
      if (res.type === DELETE_MATERIAL_SUCCESS) {
        navigate("/Library");
      }
    });
  };
  const updateMaterialHandler = () => {
    if (images.length > 0) {
      if (files[0] !== null || !files[0] !== undefined) {
        const formdata = new FormData();
        formdata.append("image", files[0]);
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/user/upload`, formdata)
          .then((res) => {
            const payload = {
              title: title,
              poster: res.data.url,
              file: res.data.url,
              semester: Number(semester),
              id: location.state?.material._id,
            };
            updateMaterialByIdFunc(payload).then((res) => {
              if (res.type === UPDATE_MATERIAL_SUCCESS) {
                setModal(false);
                navigate("/Library");
              } else {
                setModal(false);
              }
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      const payload = {
        title: title,
        poster: location.state?.material.file,
        file: location.state?.material.file,
        semester: Number(semester),
        id: location.state?.material._id,
      };
      updateMaterialByIdFunc(payload).then((res) => {
        if (res.type === UPDATE_MATERIAL_SUCCESS) {
          setModal(false);
          navigate("/Library");
        } else {
          setModal(false);
        }
      });
    }
  };
  const downloadImage = () => {
    console.log(
      location.state?.material.file,
      "(location.state?.material.file"
    );
    let url = location.state?.material.file;
    saveAs(url, "Image"); // Put your image url here.
  };
  useEffect(() => {
    setTitle(location.state?.material.title);
    setSemester(location.state?.material.semester);
  }, []);
  console.log(modal, "modal");
  return (
    <DashboardContainer>
      <Header />
      <DashboardContentContainer>
        <div className="sidebar-container">
          <Sidebar />
        </div>
        {/* Library Mian Container */}
        <div className="border bg-white hover:bg-red-500 m-2 shadow-xl p-3 w-full rounded-xl">
          {modal && (
            <Modal active={modal} toggleModal={toggleModal}>
              <p className="text-xl text-gray-600">Add New material</p>
              <input
                placeholder="Enter Title of the material"
                className="border rounded font-thin text-sm p-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                placeholder="Enter Semester"
                className="border rounded font-thin text-sm p-2 w-full my-2"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
              <div
                className="w-full flex flex-col items-center justify-center"
                {...getRootProps()}
                style={{ width: "100%" }}
              >
                <p className="mt-2">
                  Select a background image for the material
                </p>
                <CloudDownloadOutlinedIcon
                  style={{ width: "80px", height: "80px" }}
                />
                <input {...getInputProps()} />
                {images.length > 0 ? (
                  <div>{images}</div>
                ) : (
                  <div>
                    <img
                      src={location.state?.material.file}
                      width="400px"
                      alt="preview"
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <Button
                variant="secondary"
                onClick={updateMaterialHandler}
                className="w-full mt-3 py-2"
              >
                {updateMaterialDataLoading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  "Update material"
                )}
              </Button>
            </Modal>
          )}
          <div
            className="bg-gray-200 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </div>
          <div>
            <p className="text-2xl text-purple-500 text-center mt-4">
              Material : {location.state?.material.title}
            </p>
            <p className="text-2xl text-purple-500 text-center mt-4">
              Material : {location.state?.material.semester}
            </p>
            <Button variant="secondary" onClick={toggleModal}>
              Update Material
            </Button>
            <Button
              variant="danger"
              className="ml-2"
              onClick={deleteMaterialHandler}
            >
              Delete Material
            </Button>
          </div>
          <a href={location.state?.material.file}>pdf</a>
          <button
            onClick={() => {
              saveAs(location.state?.material.file, "myfile.pdf");
            }}
          >
            download
          </button>
            
          {/* <div>
            <div>
              <img
                src={location.state?.material.file}
                className="rounded-lg mt-4"
              />
            </div>
          </div> */}
        </div>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    updateMaterialDataLoading: state.Library.updateMaterialFromReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMaterialByIdFunc: (id) => dispatch(deleteMaterialFromCreator(id)),
    updateMaterialByIdFunc: (data) => dispatch(UpdateMaterialFromCreator(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Material);
