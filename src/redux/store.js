import {rootReducer} from "./reducer";
import {applyMiddleware, createStore} from 'redux'
import thunk from "redux-thunk";

const Store = createStore(rootReducer, applyMiddleware(thunk))


// const Store=createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default Store