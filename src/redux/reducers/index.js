import { combineReducers } from "redux";
import courses from "./courseReducer";

const rootReducer = combineReducers({
  courses //object shorthand syntax
});

export default rootReducer;
