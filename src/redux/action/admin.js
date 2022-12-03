import axios from "axios";

export const GET_ALL_BECOME_TEACHER_REQUESTS_SUCCESS = "GET_ALL_BECOME_TEACHER_REQUESTS_SUCCESS";
export const GET_ALL_BECOME_TEACHER_REQUESTS_FAILED = "GET_ALL_BECOME_TEACHER_REQUESTS_FAILED";
export const GET_ALL_BECOME_TEACHER_REQUESTS_LOADING = "GET_ALL_BECOME_TEACHER_REQUESTS_LOADING";

export const REJECT_REQUEST_SUCCESS = "REJECT_REQUEST_SUCCESS";
export const REJECT_REQUEST_FAILED = "REJECT_REQUEST_FAILED";
export const REJECT_REQUEST_LOADING = "REJECT_REQUEST_LOADING";

export const ACCEPT_REQUEST_SUCCESS = "ACCEPT_REQUEST_SUCCESS";
export const ACCEPT_REQUEST_FAILED = "ACCEPT_REQUEST_FAILED";
export const ACCEPT_REQUEST_LOADING = "ACCEPT_REQUEST_LOADING";

const token=localStorage.getItem("Token")

export const getAllBecomeTeacherRequestsAction = () => {
    return (dispatch) => {
      dispatch({ type: GET_ALL_BECOME_TEACHER_REQUESTS_LOADING, data: true });
      return axios
        .get(`${process.env.REACT_APP_BASE_URL}/admin/become-teacher-request`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data, "Response data");
          dispatch({ type: GET_ALL_BECOME_TEACHER_REQUESTS_LOADING, data: false });
          return dispatch({ type: GET_ALL_BECOME_TEACHER_REQUESTS_SUCCESS, data: res.data });
        })
        .catch((error) => {
          console.log(error, "Error");
          dispatch({ type: GET_ALL_BECOME_TEACHER_REQUESTS_LOADING, data: false });
          return dispatch({ type: GET_ALL_BECOME_TEACHER_REQUESTS_FAILED, data: error });
        });
    };
  };


  export const acceptRequestAction = (id) => {
    return (dispatch) => {
      dispatch({ type: ACCEPT_REQUEST_LOADING, data: true });
      return axios
        .get(`${process.env.REACT_APP_BASE_URL}/admin/teacher/${id}/approve`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data, "Response data");
          dispatch({ type: ACCEPT_REQUEST_LOADING, data: false });
          return dispatch({ type: ACCEPT_REQUEST_SUCCESS, data: res.data });
        })
        .catch((error) => {
          console.log(error, "Error");
          dispatch({ type: ACCEPT_REQUEST_LOADING, data: false });
          return dispatch({ type: ACCEPT_REQUEST_FAILED, data: error });
        });
    };
  };

  export const rejectRequestAction = (id) => {
    return (dispatch) => {
      dispatch({ type: REJECT_REQUEST_LOADING, data: true });
      return axios
        .get(`${process.env.REACT_APP_BASE_URL}/admin/teacher/${id}/reject`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data, "Response data");
          dispatch({ type: REJECT_REQUEST_LOADING, data: false });
          return dispatch({ type: REJECT_REQUEST_SUCCESS, data: res.data });
        })
        .catch((error) => {
          console.log(error, "Error");
          dispatch({ type: REJECT_REQUEST_LOADING, data: false });
          return dispatch({ type: REJECT_REQUEST_FAILED, data: error });
        });
    };
  };