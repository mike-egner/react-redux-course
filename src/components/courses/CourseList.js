import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CourseList = ({
  courses,
  onDeleteClick,
  sortField = "title",
  sortDescending = true,
  sortOn = true
}) => {
  function sortByField(data, sortField, sortDescending) {
    return data.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDescending ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDescending ? 1 : -1;
      }
      return 0;
    });
  }

  if (sortOn) courses = sortByField(courses, sortField, sortDescending);

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {courses.map(course => {
          return (
            <tr key={course.id}>
              <td>
                <a
                  className="btn btn-light"
                  href={"http://pluralsight.com/courses/" + course.slug}
                >
                  Watch
                </a>
              </td>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.authorName}</td>
              <td>{course.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(course)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  sortField: PropTypes.string,
  sortDescending: PropTypes.bool,
  sortOn: PropTypes.bool
};

export default CourseList;
