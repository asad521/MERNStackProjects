import React,{useEffect,Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { get_current_profile } from '../../actions/profile';
import Spinner from '../Layout/Spinner';
import CreateProfile from '../Profile/CreateProfile';
import DashboardActions from './DashboardActions';
const Dashboard = ({get_current_profile,auth:{user},profile:{profile,loading}}) => {
    console.log('This is Dashboard Component.There is Useeffect after this')
    useEffect(() => {get_current_profile();},[]);

    return (
       loading && profile === null ? 'loading....':<Fragment>
        <h1 className="large text-primary">DashBoard</h1>
        <p className="lead"></p>
        <i className="fas fa-user">Welcome {user && user.name}</i>
        {/* //if there is a profile */}
        {profile !== null ? (<Fragment>has <DashboardActions/></Fragment>) :
        (<Fragment>You have not created a profile .Please Create a Profile:
            <Link to='/createProfile' className='btn btn-primary my-1'>Create Profile</Link>
        </Fragment>)}
       </Fragment>
    )
}

Dashboard.propTypes ={
    get_current_profile:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth : state.auth,
    profile: state.profile
})

export default connect(mapStateToProps,{get_current_profile})(Dashboard);
