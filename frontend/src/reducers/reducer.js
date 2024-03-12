import {combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import reducersignup from "./reducersignup";

const rootReducer = combineReducers({
    form: formReducer,
    signup: reducersignup
    
})

export default rootReducer

