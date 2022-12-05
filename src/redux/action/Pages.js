import axios from "axios";

export const GET_ALLPAGES_SUCCESS = "GET_ALLPAGES_SUCCESS";
export const GET_ALLPAGES_FAILED = "GET_ALLPAGES_FAILED";
export const GET_ALLPAGES_LOADING = "GET_ALLPAGES_LOADING";

export const CREATE_PAGE_SUCCESS = "CREATE_PAGE_SUCCESS";
export const CREATE_PAGE_FAILED = "CREATE_PAGE_FAILED";
export const CREATE_PAGE_LOADING = "CREATE_PAGE_LOADING";

export const DELETE_PAGE_SUCCESS = "DELETE_PAGE_SUCCESS";
export const DELETE_PAGE_FAILED = "DELETE_PAGE_FAILED";
export const DELETE_PAGE_LOADING = "DELETE_PAGE_LOADING";

export const GET_PAGE_BY_ID_SUCCESS = "GET_PAGE_BY_ID_SUCCESS";
export const GET_PAGE_BY_ID_FAILED = "GET_PAGE_BY_ID_FAILED";
export const GET_PAGE_BY_ID_LOADING = "GET_PAGE_BY_ID_LOADING";

export const GET_MY_ALL_POST_SUCCESS = "GET_MY_ALL_POST_SUCCESS";
export const GET_MY_ALL_POST_FAILED = "GET_MY_ALL_POST_FAILED";
export const GET_MY_ALL_POST_LOADING = "GET_MY_ALL_POST_LOADING";

export const GET_SEARCH_PAGES_SUCCESS = "GET_SEARCH_PAGES_SUCCESS";
export const GET_SEARCH_PAGES_FAILED = "GET_SEARCH_PAGES_FAILED";
export const GET_SEARCH_PAGES_LOADING = "GET_SEARCH_PAGES_LOADING";

const token=localStorage.getItem("Token")


export const getSearchPagesAction=(searchText)=>{
  return (dispatch) => {
      dispatch({ type: GET_SEARCH_PAGES_LOADING, data: true });
      return axios
        .get(`${process.env.REACT_APP_BASE_URL}/page/search?keyword=${searchText}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data, "Response data");
          dispatch({ type: GET_SEARCH_PAGES_LOADING, data: false });
          return dispatch({ type: GET_SEARCH_PAGES_SUCCESS, data: res.data });
        })
        .catch((error) => {
          console.log(error, "Error");
          dispatch({ type: GET_SEARCH_PAGES_LOADING, data: false });
          return dispatch({ type: GET_SEARCH_PAGES_FAILED, data: false });
        });
    };
}


export const getAllPages=()=>{
    return (dispatch) => {
        dispatch({ type: GET_ALLPAGES_LOADING, data: true });
        return axios
          .get(`${process.env.REACT_APP_BASE_URL}/page`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data, "Response data");
            dispatch({ type: GET_ALLPAGES_LOADING, data: false });
            return dispatch({ type: GET_ALLPAGES_SUCCESS, data: res.data });
          })
          .catch((error) => {
            console.log(error, "Error");
            dispatch({ type: GET_ALLPAGES_LOADING, data: false });
            return dispatch({ type: GET_ALLPAGES_FAILED, data: false });
          });
      };
}


export const createPageFromCreater=(payload)=>{
  const {title,description,coverImage,logo}=payload
  return (dispatch) => {
      dispatch({ type: CREATE_PAGE_LOADING, data: true });
      return axios
        .post(`${process.env.REACT_APP_BASE_URL}/page`, 
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data, "Response data");
          // dispatch({ type: CREATE_PAGE_LOADING, data: false });
          // return dispatch({ type: CREATE_PAGE_SUCCESS, data: res.data.Content });
        })
        .catch((error) => {
          console.log(error, "Error");
          // dispatch({ type: CREATE_PAGE_LOADING, data: false });
          // return dispatch({ type: CREATE_PAGE_FAILED, data: error });
        });
    };
}

export const getPageByIdFromAction=(id)=>{
  return (dispatch) => {
      dispatch({ type: GET_PAGE_BY_ID_LOADING, data: true });
      return axios
        .get(`${process.env.REACT_APP_BASE_URL}/page/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((res) => {
          console.log(res.data, "Response data");
          dispatch({ type: GET_PAGE_BY_ID_LOADING, data: false });
          return dispatch({ type: GET_PAGE_BY_ID_SUCCESS, data: res.data });
        })
        .catch((error) => {
          console.log(error, "Error");
          dispatch({ type: GET_PAGE_BY_ID_LOADING, data: false });
          return dispatch({ type: GET_PAGE_BY_ID_FAILED, data: false });
        });
    };
}

export const deletePageByIdFromAction=(id)=>{
  return (dispatch) => {
      dispatch({ type: DELETE_PAGE_LOADING, data: true });
      return axios
        .delete(`${process.env.REACT_APP_BASE_URL}/page/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((res) => {
          console.log(res.data, "Response data");
          dispatch({ type: DELETE_PAGE_LOADING, data: false });
          return dispatch({ type: DELETE_PAGE_SUCCESS, data: res.data });
        })
        .catch((error) => {
          console.log(error, "Error");
          dispatch({ type: DELETE_PAGE_LOADING, data: false });
          return dispatch({ type: DELETE_PAGE_FAILED, data: false });
        });
    };
}


export const getMyAllPostsFromAction=(id)=>{
  return (dispatch) => {
      dispatch({ type: GET_MY_ALL_POST_LOADING, data: true });
      return axios
        .get(`${process.env.REACT_APP_BASE_URL}/page/${id}/all-post`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((res) => {
          console.log(res.data, "Response data");
          dispatch({ type: GET_MY_ALL_POST_LOADING, data: false });
          return dispatch({ type: GET_MY_ALL_POST_SUCCESS, data: res.data });
        })
        .catch((error) => {
          console.log(error, "Error");
          dispatch({ type: GET_MY_ALL_POST_LOADING, data: false });
          return dispatch({ type: GET_MY_ALL_POST_FAILED, data: false });
        });
    };
}