import UserReducer from "./UserReducer";
import { combineReducers } from "redux";
import Library from '../reducer/Library'
import pages from '../reducer/Pages'
import admin from "../reducer/admin";

export const rootReducer = combineReducers({
    UserReducer,
    Library,
    pages,
    admin
});
