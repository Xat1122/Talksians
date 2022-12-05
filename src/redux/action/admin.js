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

export const BLOCK_USER_SUCCESS = "BLOCK_USER_SUCCESS";
export const BLOCK_USER_FAILED = "BLOCK_USER_FAILED";
export const BLOCK_USER_LOADING = "BLOCK_USER_LOADING";

export const UNBLOCK_USER_SUCCESS = "UNBLOCK_USER_SUCCESS";
export const UNBLOCK_USER_FAILED = "UNBLOCK_USER_FAILED";
export const UNBLOCK_USER_LOADING = "UNBLOCK_USER_LOADING";

export const BLOCK_GROUP_SUCCESS = "BLOCK_GROUP_SUCCESS";
export const BLOCK_GROUP_FAILED = "BLOCK_GROUP_FAILED";
export const BLOCK_GROUP_LOADING = "BLOCK_GROUP_LOADING";

export const UNBLOCK_GROUP_SUCCESS = "UNBLOCK_GROUP_SUCCESS";
export const UNBLOCK_GROUP_FAILED = "UNBLOCK_GROUP_FAILED";
export const UNBLOCK_GROUP_LOADING = "UNBLOCK_GROUP_LOADING";

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

  export const blockUser = (id) => {
    return (dispatch) => {
      dispatch({ type: BLOCK_USER_LOADING, data: true });
      return axios
        .get(`${process.env.REACT_APP_BASE_URL}/admin/user/${id}/block`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data, "Response data");
          dispatch({ type: BLOCK_USER_LOADING, data: false });
          return dispatch({ type: BLOCK_USER_SUCCESS, data: res.data });
        })
        .catch((error) => {
          console.log(error, "Error");
          dispatch({ type: BLOCK_USER_LOADING, data: false });
          return dispatch({ type: BLOCK_USER_FAILED, data: error });
        });
    };
  };

  export const unblockUser = (id) => {
    return (dispatch) => {
      dispatch({ type: UNBLOCK_USER_LOADING, data: true });
      return axios
        .get(`${process.env.REACT_APP_BASE_URL}/admin/user/${id}/unblock`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data, "Response data");
          dispatch({ type: UNBLOCK_USER_LOADING, data: false });
          return dispatch({ type: UNBLOCK_USER_SUCCESS, data: res.data });
        })
        .catch((error) => {
          console.log(error, "Error");
          dispatch({ type: UNBLOCK_USER_LOADING, data: false });
          return dispatch({ type: UNBLOCK_USER_FAILED, data: error });
        });
    };
  };


  export const blockGroup = (id) => {
    return (dispatch) => {
      dispatch({ type: BLOCK_GROUP_LOADING, data: true });
      return axios
        .get(`${process.env.REACT_APP_BASE_URL}/admin/group/${id}/block`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data, "Response data");
          dispatch({ type: BLOCK_GROUP_LOADING, data: false });
          return dispatch({ type: BLOCK_GROUP_SUCCESS, data: res.data });
        })
        .catch((error) => {
          console.log(error, "Error");
          dispatch({ type: BLOCK_GROUP_LOADING, data: false });
          return dispatch({ type: BLOCK_GROUP_FAILED, data: error });
        });
    };
  };

  export const unblockGroup = (id) => {
    return (dispatch) => {
      dispatch({ type: UNBLOCK_GROUP_LOADING, data: true });
      return axios
        .get(`${process.env.REACT_APP_BASE_URL}/admin/group/${id}/unblock`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data, "Response data");
          dispatch({ type: UNBLOCK_GROUP_LOADING, data: false });
          return dispatch({ type: UNBLOCK_GROUP_SUCCESS, data: res.data });
        })
        .catch((error) => {
          console.log(error, "Error");
          dispatch({ type: UNBLOCK_GROUP_LOADING, data: false });
          return dispatch({ type: UNBLOCK_GROUP_FAILED, data: error });
        });
    };
  };