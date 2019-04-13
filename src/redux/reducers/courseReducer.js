<<<<<<< HEAD
import * as types from "../actions/actionTypes";

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE:
=======
export default function courseReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_COURSE":
>>>>>>> master
      return [...state, { ...action.course }];
    default:
      return state;
  }
}
