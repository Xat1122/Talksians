import { combineReducers } from 'redux';
import * as ActionTypes from '../action/Library';

const init = { loading: false, success: false, failed: false, data: null };

const getAllCatagoriesReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALL_CATAOGRIES_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.GET_ALL_CATAOGRIES_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.GET_ALL_CATAOGRIES_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};

const AddCatagoryFromReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CATAGORY_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.ADD_CATAGORY_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.ADD_CATAGORY_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};


const getCatagoryFromReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.GET_CATAGORY_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.GET_CATAGORY_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.GET_CATAGORY_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};

const updateCatagoryFromReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_CATAGORY_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.UPDATE_CATAGORY_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.UPDATE_CATAGORY_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};

const deleteCatagoryFromReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.DELETE_CATAGORY_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.DELETE_CATAGORY_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.DELETE_CATAGORY_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};


const getMaterialReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.GET_MATERIAL_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.GET_MATERIAL_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.GET_MATERIAL_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};

const AddMaterialFromReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.ADD_MATERIAL_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.ADD_MATERIAL_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.ADD_MATERIAL_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};


const getMaterialByIdFromReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.GET_MATERIAL_BY_USERID_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.GET_MATERIAL_BY_USERID_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.GET_MATERIAL_BY_USERID_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};

const updateMaterialFromReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_MATERIAL_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.UPDATE_MATERIAL_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.UPDATE_MATERIAL_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};

const deleteMaterialFromReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.DELETE_MATERIAL_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.DELETE_MATERIAL_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.DELETE_MATERIAL_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };

        default:
            return { ...state };
    }
};

export default combineReducers({
    getAllCatagoriesReducer,
    AddCatagoryFromReducer,
    getCatagoryFromReducer,
    updateCatagoryFromReducer,
    deleteCatagoryFromReducer,
    getMaterialReducer,
    AddMaterialFromReducer,
    getMaterialByIdFromReducer,
    updateMaterialFromReducer,
    deleteMaterialFromReducer
})