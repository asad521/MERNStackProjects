import React, { Fragment,useState } from "react";
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export const Login = ({login,isAuthenticated}) => {
  let navigate = useNavigate();

  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:'',
  });
  const {name,email,password,password2} = formData;

  const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
    console.log('login has done')
   
  }

     // Redirect if loggin in  to change UI
     if(isAuthenticated) {
      return  <Navigate replace to='/dashboard'/>
  }  
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into your account
      </p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e =>onChange(e)} required/>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6" 
            value={password} onChange={e =>onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/Register">Register</Link>
      </p>{" "}
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);
