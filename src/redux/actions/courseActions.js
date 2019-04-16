import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course }; //object shorthand syntax used
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course }; //object shorthand syntax used
}

export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses }; //object shorthand syntax
}

export function loadCourses() {
  return function(dispatch) {
    //Redux will pass dispatch in here
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch) {
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}
