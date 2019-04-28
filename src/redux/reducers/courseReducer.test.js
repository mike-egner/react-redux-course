import courseReducer from "./courseReducer";
import * as courseActions from "../actions/courseActions";

it("adds course when passed CREATE_COURSE_SUCCESS", () => {
  //arrange
  const initialState = [{ title: "A" }, { title: "B" }];
  const newCourse = { title: "C" };
  const action = courseActions.createCourseSuccess(newCourse);

  //act
  const newState = courseReducer(initialState, action);

  //assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

it("updates course when passed UPDATE_COURSE_SUCCESS", () => {
  //arrange
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ];
  const updatedCourse = { id: 2, title: "X" };
  const action = courseActions.updateCourseSuccess(updatedCourse);

  //act
  const newState = courseReducer(initialState, action);

  //assert
  expect(newState.length).toEqual(3);
  expect(newState.find(x => x.id === 1).title).toEqual("A");
  expect(newState.find(x => x.id === 2).title).toEqual("X");
  expect(newState.find(x => x.id === 3).title).toEqual("C");
});
