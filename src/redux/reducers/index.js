import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  authors, //object shorthand syntax
  courses,
  apiCallsInProgress
});

export default rootReducer;
