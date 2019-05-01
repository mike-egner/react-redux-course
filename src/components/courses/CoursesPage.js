import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
    sortType: 0
  };

  sortTypes = [
    {
      displayName: "Sort",
      sortOn: false,
      sortField: null,
      sortDescending: null
    },
    {
      displayName: "Title A-Z",
      sortOn: true,
      sortField: "title",
      sortDescending: true
    },
    {
      displayName: "Title Z-A",
      sortOn: true,
      sortField: "title",
      sortDescending: false
    },
    {
      displayName: "Author A-Z",
      sortOn: true,
      sortField: "authorName",
      sortDescending: true
    },
    {
      displayName: "Author Z-A",
      sortOn: true,
      sortField: "authorName",
      sortDescending: false
    },
    {
      displayName: "Category A-Z",
      sortOn: true,
      sortField: "category",
      sortDescending: true
    },
    {
      displayName: "Category Z-A",
      sortOn: true,
      sortField: "category",
      sortDescending: false
    }
  ];

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed " + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed " + error);
      });
    }
  }

  handleDeleteCourse = async course => {
    toast.success("Course deleted.");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  handleSortClick = choice => this.setState({ sortType: choice });

  render() {
    return (
      // wrapping in a JSX fragment so that there is one top-level component (required for JSX)
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course/" />}
        <h2 className="pt-2">Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <div className="row justify-content-between px-3 py-2">
              <span>
                <button
                  style={{ marginBottom: 20 }}
                  className="btn btn-primary add-course"
                  onClick={() =>
                    this.setState({ redirectToAddCoursePage: true })
                  }
                >
                  Add Course
                </button>
              </span>
              <span className="dropdown">
                <Dropdown>
                  <Dropdown.Toggle variant="info" id="dropdown-basic">
                    {this.sortTypes[this.state.sortType].displayName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {this.sortTypes.map((item, index) => {
                      return (
                        <Dropdown.Item
                          key={item.displayName}
                          href="#"
                          onClick={() => this.handleSortClick(index)}
                        >
                          {item.displayName}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            </div>
            <CourseList
              {...this.sortTypes[this.state.sortType]}
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(x => x.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
