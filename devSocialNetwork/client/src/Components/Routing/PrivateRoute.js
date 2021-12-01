import React,{Fragment} from 'react'
import PropTypes from 'prop-types';
import {Route,Navigate,Routes,Outlet} from 'react-router-dom';
import {connect} from 'react-redux';
import Dashboard from '../Dashboard/Dashboard';
const PrivateRoute = ({auth}) => {
    return  !auth.isAuthenticated && !auth.loading ?
    (<Navigate replace to='/login'/>): (<Dashboard/>)
  }

PrivateRoute.propTypes = {
auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth : state.auth 
})

export default connect(mapStateToProps)(PrivateRoute)
