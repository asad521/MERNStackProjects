import React, { Fragment, useContext } from "react";
import authContext from "../../context/auth/authContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export const Navbar = ({ title, icon }) => {
  const AuthContext = useContext(authContext);

  const { isAuthenticated, logoutUser, user } = AuthContext;

  const onClick =() =>{
      console.log('in logout')
    logoutUser();
  }
  const authlinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href="#!" onClick={onClick} style={style}>
          <i className="fa fa-sign-out-alt"></i>
          <span className="hide-out">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>

      <li>
        <Link to="/Register">Register</Link>
      </li>
      <li>
        <Link to="/Login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}></i>
        {title}
      </h1>
      <ul>
          {isAuthenticated ? authlinks:guestLinks}
      </ul>
    </div>
  );
};
const style ={
    'backgroundColor':'red'
}
//Proptypes
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

//Defaults Props

Navbar.defaultProps = {
  title: "Contact Keeper Application",
  icon: "fa fa-id-card-alt",
};
