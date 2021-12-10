import React,{Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';
import {connect} from 'react-redux';
import Link from 'react-router';
import { useParams } from 'react-router-dom';
const Profile = ({getProfileById,profile:{profile,loading},auth,id}) => {
    const params= useParams();
    console.log(JSON.stringify(params.id))

    useEffect(()=> {
        getProfileById(params.id);
    },[getProfileById])
    return (
        <Fragment>
            {profile == null || loading ? 'Spinner' : (<Fragment>
             <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>

            </Fragment>)}
        </Fragment>
    )
}

Profile.propTypes = {

    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth :PropTypes.object.isRequired,
  
}

const mapStateToProps = state => ({
    profile:state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getProfileById})(Profile)
