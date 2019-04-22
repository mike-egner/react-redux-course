import React from "react";
import { mount } from "enzyme";
import { authors, newCourse, courses } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursePage";

function render(args) {
  const defaultProps = {
    authors,
    courses,
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {} //this is where the slug comes in
  };
  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
}

it("shows error when user attempts to submit empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toEqual("Title is required.");
});
