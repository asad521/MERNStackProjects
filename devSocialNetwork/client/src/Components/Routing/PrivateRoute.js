import React,{Fragment} from 'react'
import PropTypes from 'prop-types';
import {Route,Navigate,Routes,Outlet} from 'react-router-dom';
import {connect} from 'react-redux';
const PrivateRoute = ({auth}) => {
    return  !auth.isAuthenticated && !auth.loading ?
    (<Navigate replace to='/login'/>): (<Outlet/>)
  }

PrivateRoute.propTypes = {
auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth : state.auth 
})

export default connect(mapStateToProps)(PrivateRoute)
