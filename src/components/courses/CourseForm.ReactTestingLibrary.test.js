import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

afterEach(cleanup);

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    errors: {},
    saving: false,
    onSave: () => {},
    onChange: () => {}
  };
  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("renders Add Course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

it("form button says 'Save' when not saving", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it("form button says 'Saving...' when saving", () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText("Saving...");
});
