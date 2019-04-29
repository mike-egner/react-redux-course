import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Header = ({ coursesTotal }) => {
  const activeStyle = { color: "#F15B2A" };
  debugger;
  return (
    <nav className="navbar navbar-light bg-light py-3">
      <div>
        <NavLink to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>
        {" | "}
        <NavLink to="/courses" activeStyle={activeStyle}>
          Courses
        </NavLink>
        {" | "}
        <NavLink to="/about" activeStyle={activeStyle}>
          About
        </NavLink>
      </div>
      <span>
        {coursesTotal === 0
          ? "Click Courses to Load Courses"
          : "Courses: " + coursesTotal}
      </span>
    </nav>
  );
};

Header.propTypes = {
  coursesTotal: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  const coursesTotal = state.courses.length;
  return { coursesTotal };
}

export default connect(mapStateToProps)(Header);
