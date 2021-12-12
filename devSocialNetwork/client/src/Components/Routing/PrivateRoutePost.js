import React,{Fragment} from 'react'
import PropTypes from 'prop-types';
import {Route,Navigate,Routes,Outlet} from 'react-router-dom';
import {connect} from 'react-redux';
import Post from '../Posts/Post';
const PrivateRoutePost = ({auth}) => {
    return  !auth.isAuthenticated && !auth.loading ?
    (<Navigate replace to='/posts'/>): (<Post/>)
  }

  PrivateRoutePost.propTypes = {
auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth : state.auth 
})

export default connect(mapStateToProps)(PrivateRoutePost)
