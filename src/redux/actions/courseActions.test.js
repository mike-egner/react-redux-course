import * as types from "./actionTypes";
import * as courseActions from "./courseActions";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("courseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    //arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course
    };

    //act
    const action = courseActions.createCourseSuccess(course);

    //assert
    expect(action).toEqual(expectedAction);
  });
});

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  describe("Load Courses thunk", () => {
    it("creates BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
      //arrange
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" }
      });
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];
      const store = mockStore({ courses: [] });

      //act and assert
      store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
