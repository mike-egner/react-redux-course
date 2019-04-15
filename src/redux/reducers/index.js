import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";

const rootReducer = combineReducers({
  courses, //object shorthand syntax
  authors
});

export default rootReducer;
