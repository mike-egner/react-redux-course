import { createStore } from "redux";
import * as courseActions from "./actions/courseActions";
import rootReducer from "./reducers/index";
import initialState from "./reducers/initialState";

it("handles course creation", () => {
  //arrange
  const store = createStore(rootReducer, initialState);
  const newCourse = { title: "A New Course" };
  const action = courseActions.createCourseSuccess(newCourse);

  //act
  store.dispatch(action);

  //assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(newCourse);
});
