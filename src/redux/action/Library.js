import axios from "axios";

export const GET_ALL_CATAOGRIES_SUCCESS = "GET_ALL_CATAOGRIES_SUCCESS";
export const GET_ALL_CATAOGRIES_FAILED = "GET_ALL_CATAOGRIES_FAILED";
export const GET_ALL_CATAOGRIES_LOADING = "GET_ALL_CATAOGRIES_LOADING";

export const ADD_CATAGORY_SUCCESS = "ADD_CATAGORY_SUCCESS";
export const ADD_CATAGORY_FAILED = "ADD_CATAGORY_FAILED";
export const ADD_CATAGORY_LOADING = "ADD_CATAGORY_LOADING";

export const GET_CATAGORY_SUCCESS = "GET_CATAGORY_SUCCESS";
export const GET_CATAGORY_FAILED = "GET_CATAGORY_FAILED";
export const GET_CATAGORY_LOADING = "GET_CATAGORY_LOADING";

export const UPDATE_CATAGORY_SUCCESS = "UPDATE_CATAGORY_SUCCESS";
export const UPDATE_CATAGORY_FAILED = "UPDATE_CATAGORY_FAILED";
export const UPDATE_CATAGORY_LOADING = "UPDATE_CATAGORY_LOADING";

export const DELETE_CATAGORY_SUCCESS = "DELETE_CATAGORY_SUCCESS";
export const DELETE_CATAGORY_FAILED = "DELETE_CATAGORY_FAILED";
export const DELETE_CATAGORY_LOADING = "DELETE_CATAGORY_LOADING";

export const ADD_MATERIAL_SUCCESS = "ADD_MATERIAL_SUCCESS";
export const ADD_MATERIAL_FAILED = "ADD_MATERIAL_FAILED";
export const ADD_MATERIAL_LOADING = "ADD_MATERIAL_LOADING";

export const GET_MATERIAL_SUCCESS = "GET_MATERIAL_SUCCESS";
export const GET_MATERIAL_FAILED = "GET_MATERIAL_FAILED";
export const GET_MATERIAL_LOADING = "GET_MATERIAL_LOADING";

export const GET_MATERIAL_BY_USERID_SUCCESS = "GET_MATERIAL_BY_USERID_SUCCESS";
export const GET_MATERIAL_BY_USERID_FAILED = "GET_MATERIAL_BY_USERID_FAILED";
export const GET_MATERIAL_BY_USERID_LOADING = "GET_MATERIAL_BY_USERID_LOADING";

export const UPDATE_MATERIAL_SUCCESS = "UPDATE_MATERIAL_SUCCESS";
export const UPDATE_MATERIAL_FAILED = "UPDATE_MATERIAL_FAILED";
export const UPDATE_MATERIAL_LOADING = "UPDATE_MATERIAL_LOADING";

export const DELETE_MATERIAL_SUCCESS = "DELETE_MATERIAL_SUCCESS";
export const DELETE_MATERIAL_FAILED = "DELETE_MATERIAL_FAILED";
export const DELETE_MATERIAL_LOADING = "DELETE_MATERIAL_LOADING";

const token = localStorage.getItem("Token");
// const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI4NWIyMWJiMzQ0ZTEwNmI1ZjJhMWUiLCJmaXJzdE5hbWUiOiJoYW1tYXMiLCJsYXN0TmFtZSI6Imtlcm1hbmkiLCJlbWFpbCI6ImhhbW1hczU3NkBnbWFpbC5jb20iLCJyZWdpc3RlcmF0aW9uTm8iOiJhc2RhczEyMzEiLCJyb2xlIjoidGVhY2hlciIsInZlcmlmeSI6dHJ1ZSwiaW1hZ2VzIjpbXSwiX192IjowLCJpYXQiOjE2NjM1ODkzNDB9.iEajrtqQzPkonYS1NTz-W7Rx7m82tIqwUkXT6WylmcU'

export const getAllCatagories = () => {
  return (dispatch) => {
    dispatch({ type: GET_ALL_CATAOGRIES_LOADING, data: true });
    return axios
      .get(`${process.env.REACT_APP_BASE_URL}/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, "Response data");
        dispatch({ type: GET_ALL_CATAOGRIES_LOADING, data: true });
        return dispatch({ type: GET_ALL_CATAOGRIES_SUCCESS, data: res.data });
      })
      .catch((error) => {
        console.log(error, "Error");
        dispatch({ type: GET_ALL_CATAOGRIES_LOADING, data: true });
        return dispatch({ type: GET_ALL_CATAOGRIES_FAILED, data: error });
      });
  };
};

export const AddCatagoryFromCreator = (payload) => {
  const { title, poster } = payload;
  const data = {
    title: title,
    poster: poster,
  };
  return (dispatch) => {
    dispatch({ type: ADD_CATAGORY_LOADING, data: true });
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/category`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: ADD_CATAGORY_LOADING, data: true });
        return dispatch({ type: ADD_CATAGORY_SUCCESS, data: res.data.Content });
      })
      .catch((error) => {
        dispatch({ type: ADD_CATAGORY_LOADING, data: true });
        return dispatch({ type: ADD_CATAGORY_FAILED, data: error });
      });
  };
};

export const getCatagoryByIDCreator = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_CATAGORY_LOADING, data: true });
    return axios
      .get(`${process.env.REACT_APP_BASE_URL}/category/category-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, "Response data");
        dispatch({ type: GET_CATAGORY_LOADING, data: true });
        return dispatch({ type: GET_CATAGORY_SUCCESS, data: res.data });
      })
      .catch((error) => {
        console.log(error, "Error");
        dispatch({ type: GET_CATAGORY_LOADING, data: true });
        return dispatch({ type: GET_CATAGORY_FAILED, data: error });
      });
  };
};

export const UpdateCatagoryFromCreator = (payload) => {
  const { title, poster, id } = payload;
  const data = {
    title: title,
    poster: poster,
  };
  return (dispatch) => {
    dispatch({ type: UPDATE_CATAGORY_LOADING, data: true });
    return axios
      .put(`${process.env.REACT_APP_BASE_URL}/category/${id}/category`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, "Response data");
        dispatch({ type: UPDATE_CATAGORY_LOADING, data: true });
        return dispatch({ type: UPDATE_CATAGORY_SUCCESS, data: res.data });
      })
      .catch((error) => {
        console.log(error, "Error");
        dispatch({ type: UPDATE_CATAGORY_LOADING, data: true });
        return dispatch({ type: UPDATE_CATAGORY_FAILED, data: error });
      });
  };
};

export const deleteCatagoryFromCreator = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_CATAGORY_LOADING, data: true });
    return axios
      .delete(`${process.env.REACT_APP_BASE_URL}/category/${id}/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, "Response data");
        dispatch({ type: DELETE_CATAGORY_LOADING, data: true });
        return dispatch({ type: DELETE_CATAGORY_SUCCESS, data: res.data });
      })
      .catch((error) => {
        console.log(error, "Error");
        dispatch({ type: DELETE_CATAGORY_LOADING, data: true });
        return dispatch({ type: DELETE_CATAGORY_FAILED, data: error });
      });
  };
};

export const AddMaterialFromCreator = (payload) => {
  // const { title, poster,file, semester } = payload;
  return (dispatch) => {
    dispatch({ type: ADD_MATERIAL_LOADING, data: true });
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/material`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, "Response data");
        dispatch({ type: ADD_MATERIAL_LOADING, data: true });
        return dispatch({ type: ADD_MATERIAL_SUCCESS, data: res.data });
      })
      .catch((error) => {
        console.log(error, "Error");
        dispatch({ type: ADD_MATERIAL_LOADING, data: true });
        return dispatch({ type: ADD_MATERIAL_FAILED, data: error });
      });
  };
};

export const getMaterialFromCreater = () => {
  return (dispatch) => {
    dispatch({ type: GET_MATERIAL_LOADING, data: true });
    return axios
      .get(`${process.env.REACT_APP_BASE_URL}/material`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, "Response data");
        dispatch({ type: GET_MATERIAL_LOADING, data: true });
        return dispatch({ type: GET_MATERIAL_SUCCESS, data: res.data });
      })
      .catch((error) => {
        console.log(error, "Error");
        dispatch({ type: GET_MATERIAL_LOADING, data: true });
        return dispatch({ type: GET_MATERIAL_FAILED, data: error });
      });
  };
};

export const getMaterialByUserIdFromCreator = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_MATERIAL_BY_USERID_LOADING, data: true });
    return axios
      .delete(`${process.env.REACT_APP_BASE_URL}/material/by-user-id`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, "Response data");
        // dispatch({ type: GET_MATERIAL_BY_USERID_LOADING, data: true });
        // return dispatch({ type: GET_MATERIAL_BY_USERID_SUCCESS, data: res.data.Content });
      })
      .catch((error) => {
        console.log(error, "Error");
        // dispatch({ type: GET_MATERIAL_BY_USERID_LOADING, data: true });
        // return dispatch({ type: GET_MATERIAL_BY_USERID_FAILED, data: error });
      });
  };
};

export const UpdateMaterialFromCreator = (payload) => {
  const { title, poster, id, file, semester } = payload;
  const data = {
    title,
    poster,
    file,
    semester,
  };
  return (dispatch) => {
    dispatch({ type: UPDATE_MATERIAL_LOADING, data: true });
    return axios
      .put(`${process.env.REACT_APP_BASE_URL}/material/${id}/material`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, "Response data");
        dispatch({ type: UPDATE_MATERIAL_LOADING, data: true });
        return dispatch({ type: UPDATE_MATERIAL_SUCCESS, data: res.data });
      })
      .catch((error) => {
        console.log(error, "Error");
        dispatch({ type: UPDATE_MATERIAL_LOADING, data: true });
        return dispatch({ type: UPDATE_MATERIAL_FAILED, data: error });
      });
  };
};

export const deleteMaterialFromCreator = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_MATERIAL_LOADING, data: true });
    return axios
      .delete(`${process.env.REACT_APP_BASE_URL}/material/${id}/material`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, "Response data");
        dispatch({ type: DELETE_MATERIAL_LOADING, data: true });
        return dispatch({ type: DELETE_MATERIAL_SUCCESS, data: res.data });
      })
      .catch((error) => {
        console.log(error, "Error");
        dispatch({ type: DELETE_MATERIAL_LOADING, data: true });
        return dispatch({ type: DELETE_MATERIAL_FAILED, data: error });
      });
  };
};
