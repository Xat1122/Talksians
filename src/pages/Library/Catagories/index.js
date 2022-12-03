import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { DashboardContainer, DashboardContentContainer } from "../../../styles";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, ToastContainer } from "react-bootstrap";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { useDropzone } from "react-dropzone";
import flower from "../../../assets/flower.jpg";
import materialImage from "../../../assets/material.png";
import Modal from "../../../components/Modal";
import {
  AddMaterialFromCreator,
  ADD_MATERIAL_FAILED,
  ADD_MATERIAL_SUCCESS,
  deleteCatagoryFromCreator,
  DELETE_CATAGORY_SUCCESS,
  getCatagoryByIDCreator,
  getMaterialFromCreater,
  GET_CATAGORY_SUCCESS,
  UpdateCatagoryFromCreator,
  UPDATE_CATAGORY_FAILED,
} from "../../../redux/action/Library";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Catagories = (props) => {
  const {
    getAllCatagoryLoading,
    getAllCatagoryData,
    GetAllCatagoryFunc,
    updateCatagoryFunc,
    deleteCatagoryFunc,
    deleteCatagoryLoading,
    updateCatagoryLoading,
    GetAllMaterialFunc,
    addMaterialFunc,
    getAllMaterialLoading,
    addMaterialLoading,
    getAllMaterialData,
  } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateTitle, setUpdateTitle] = useState("");
  const [img, setImage] = useState(null);
  const [modal, setModal] = useState(false);
  const [updateCatagory, setUpdateCatagory] = useState(false);
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [saveMaterialLoading, setSaveMaterialLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState();
  const [file,setFile]=useState(null)
  const [materials, setMaterials] = useState([
    { id: "1", title: "Material 1" },
    { id: "2", title: "Material 2" },
    { id: "3", title: "Material 3" },
    { id: "4", title: "Material 4" },
    { id: "5", title: "Material 5" },
    { id: "6", title: "Material 6" },
    { id: "7", title: "Material 7" },
    { id: "8", title: "Material 8" },
    { id: "9", title: "Material 9" },
    { id: "10", title: "Material 10" },
  ]);
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
        <img
          src={file.preview}
          width="400px"
          alt="preview"
          className="object-cover rounded-md"
        />
      </div>
    );
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
  const images2 = files2.map((file) => {
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

  //toggle Modal
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  const toggleModalUpdate = () => {
    setUpdateCatagory((prev) => !prev);
  };
  // Create Material
  const createMaterial = () => {
    setSaveMaterialLoading(true);
    setTimeout(() => {
      setSaveMaterialLoading(false);
      toggleModal();
    }, 3000);
  };

  const deleteCatagoryHandler = () => {
    deleteCatagoryFunc(id).then((res) => {
      if (res.type === DELETE_CATAGORY_SUCCESS) {
        navigate("/Library");
      }
    });
  };
  const handleFileInput = (e) => {
    // handle validations
    setFile(e.target.files[0])
}
  console.log(getAllMaterialData, "getAllMaterialData");
  const addMaterialHandler = () => {
    if (file!==null) {
      const formdata = new FormData();
      formdata.append("image", file);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/upload`, formdata)
        .then((res) => {
          const payload = {
            title: title,
            poster: res.data.url,
            file: res.data.url,
            semester: Number(semester),
          };
          addMaterialFunc(payload).then((res) => {
            if (res.type === ADD_MATERIAL_SUCCESS) {
              setModal(false);
              GetAllMaterialFunc();
            } else {
              setModal(false);
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const updateCatagoryHandler = () => {
    setUpdateLoading(true);
    if (images2.length > 0) {
      if (files2[0] !== null || !files2[0] !== undefined) {
        const formdata = new FormData();
        formdata.append("image", files2[0]);
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/user/upload`, formdata)
          .then((res) => {
            const payload = {
              title: updateTitle,
              poster: res.data.url,
              id: id,
            };
            updateCatagoryFunc(payload).then((res) => {
              if (res.type === UPDATE_CATAGORY_FAILED) {
                setUpdateCatagory(false);
                setUpdateLoading(false);
              } else {
                setUpdateCatagory(false);
                setUpdateLoading(false);
                GetAllCatagoryFunc(id).then((res) => {
                  if (res.type === GET_CATAGORY_SUCCESS) {
                    setUpdateTitle(res.data.title);
                    setImage(res.data.poster);
                  }
                });
              }
            });
            console.log("Updating");
          })
          .catch((e) => {
            console.log(e);
            setUpdateCatagory(false);
            setUpdateLoading(false);
          });
      }
    } else {
      const payload = {
        title: updateTitle,
        poster: getAllCatagoryData?.poster,
        id: id,
      };
      updateCatagoryFunc(payload).then((res) => {
        if (res.type === UPDATE_CATAGORY_FAILED) {
          setUpdateCatagory(false);
          notify("Catagory Update Failed");
        } else {
          setUpdateCatagory(false);
          GetAllCatagoryFunc(id).then((res) => {
            if (res.type === GET_CATAGORY_SUCCESS) {
              setUpdateTitle(res.data.title);
              setImage(res.data.poster);
            }
          });
        }
      });
      console.log("Updating");
    }
  };
  console.log(getAllCatagoryData, "getAllCatagoryData");
  console.log(addMaterialLoading, "addMaterialLoading");

  useEffect(() => {
    window.scrollTo(0, 0);
    GetAllCatagoryFunc(id).then((res) => {
      if (res.type === GET_CATAGORY_SUCCESS) {
        setUpdateTitle(res.data.title);
        setImage(res.data.poster);
      }
    });
    GetAllMaterialFunc();
  }, []);
  return (
    <DashboardContainer>
      <Header />
      <DashboardContentContainer>
        <div className="sidebar-container">
          <Sidebar />
        </div>
        {/* Library Mian Container */}

        {getAllCatagoryLoading ||
        deleteCatagoryLoading ||
        getAllMaterialLoading ? (
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
        ) : (
          <div className="border bg-white hover:bg-red-500 m-2 shadow-xl p-3 w-full rounded-xl">
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
            <div>
              {/* Modal for Adding new Catagories */}
              <div className="flex w-full justify-between">
                <div>
                  <p className="text-2xl text-gray-600 mt-3">
                    {getAllCatagoryData?.title}
                  </p>
                  <Button variant="secondary" onClick={toggleModalUpdate}>
                    Update Catagory
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={deleteCatagoryHandler}
                  >
                    Delete Catagory
                  </Button>
                </div>
                <div>
                  <p className="text-2xl text-gray-600 mt-3">Add Material</p>
                  <Button variant="secondary" onClick={toggleModal}>
                    Add Material
                  </Button>
                </div>
              </div>
              {updateCatagory && (
                <Modal active={updateCatagory} toggleModal={toggleModalUpdate}>
                  <p className="text-xl text-gray-600">Add New material</p>
                  <input
                    placeholder="Enter Title of the material"
                    className="border rounded font-thin text-sm p-2 w-full"
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                  />
                  <div
                    className="w-full flex flex-col items-center justify-center"
                    {...getRootProps2()}
                    style={{ width: "100%" }}
                  >
                    <p className="mt-2">
                      Select a background image for the material
                    </p>
                    <CloudDownloadOutlinedIcon
                      style={{ width: "80px", height: "80px" }}
                    />
                    <input {...getInputProps2()} />

                    {images2.length > 0 ? (
                      images2
                    ) : (
                      <div>
                        <img
                          src={img}
                          width="400px"
                          alt="preview"
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  <Button
                    variant="secondary"
                    onClick={updateCatagoryHandler}
                    className="w-full mt-3 py-2"
                  >
                    {updateLoading ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      "Update Catagory"
                    )}
                  </Button>
                </Modal>
              )}
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
                  <input type="file" onChange={handleFileInput}/>
                  {/* <div
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
                    <div>{images}</div>
                  </div> */}
                  <Button
                    variant="secondary"
                    onClick={addMaterialHandler}
                    className="w-full mt-3 py-2"
                  >
                    {addMaterialLoading ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      "Create material"
                    )}
                  </Button>
                </Modal>
              )}

              {/* All Material */}
              <div className="my-3 flex flex-wrap">
                {getAllMaterialData?.length > 0 ? (
                  getAllMaterialData?.map((mat) => {
                    return (
                      <div
                        className="bg-gray-300 w-72 h-48 rounded-lg shadow-xl overflow-hidden mr-4 mb-4 cursor-pointer"
                        onClick={() => {
                          navigate(`/Material/${mat._id}`, {
                            state: { material: mat },
                          });
                        }}
                      >
                        <div className="w-full h-full">
                          <div className="w-full h-4/6">
                            <img
                              src={materialImage}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="h-1/6 p-2 text-center flex items-center justify-center bg-mainColor text-white mb-0">
                            Material : {mat.title}
                          </p>
                          <p className="h-1/6 p-2 text-center flex items-center justify-center bg-mainColor text-white mb-0">
                            Semeter : {mat.semester}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-2xl text-purple-500 text-center mt-4">
                    No Material found
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    getAllCatagoryData: state.Library.getCatagoryFromReducer.data,
    getAllCatagoryLoading: state.Library.getCatagoryFromReducer.loading,
    deleteCatagoryLoading: state.Library.deleteCatagoryFromReducer.loading,
    updateCatagoryLoading: state.Library.updateCatagoryFromReducer.loading,
    getAllMaterialData: state.Library.getMaterialReducer.data,
    getAllMaterialLoading: state.Library.getMaterialReducer.loading,
    addMaterialLoading: state.Library.AddMaterialFromReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetAllCatagoryFunc: (id) => dispatch(getCatagoryByIDCreator(id)),
    updateCatagoryFunc: (id) => dispatch(UpdateCatagoryFromCreator(id)),
    deleteCatagoryFunc: (id) => dispatch(deleteCatagoryFromCreator(id)),
    GetAllMaterialFunc: () => dispatch(getMaterialFromCreater()),
    addMaterialFunc: (data) => dispatch(AddMaterialFromCreator(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catagories);
