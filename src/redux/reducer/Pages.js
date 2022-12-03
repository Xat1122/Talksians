import { combineReducers } from 'redux';
import * as ActionTypes from '../action/Pages';

const init = { loading: false, success: false, failed: false, data: null };

const getAllPages = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALLPAGES_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.GET_ALLPAGES_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.GET_ALLPAGES_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};

const getMyAllPostFromRedux = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.GET_MY_ALL_POST_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.GET_MY_ALL_POST_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.GET_MY_ALL_POST_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};


const getPageByIdFromRedux = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.GET_PAGE_BY_ID_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.GET_PAGE_BY_ID_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.GET_PAGE_BY_ID_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};


const deletePageByIdFromRedux = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.DELETE_PAGE_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.DELETE_PAGE_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.DELETE_PAGE_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};

export default combineReducers({
    getAllPages,
    getPageByIdFromRedux,
    deletePageByIdFromRedux,
    getMyAllPostFromRedux
})