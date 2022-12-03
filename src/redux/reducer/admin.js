import { combineReducers } from 'redux';
import * as ActionTypes from '../action/admin';

const init = { loading: false, success: false, failed: false, data: null };

const getAllBecomeTeacherRequestsReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALL_BECOME_TEACHER_REQUESTS_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.GET_ALL_BECOME_TEACHER_REQUESTS_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.GET_ALL_BECOME_TEACHER_REQUESTS_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};


const rejectRequestReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.REJECT_REQUEST_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.REJECT_REQUEST_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.REJECT_REQUEST_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};


const acceptRequestReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.ACCEPT_REQUEST_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.ACCEPT_REQUEST_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.ACCEPT_REQUEST_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};

export default combineReducers({
    getAllBecomeTeacherRequestsReducer,
    acceptRequestReducer,
    rejectRequestReducer
})