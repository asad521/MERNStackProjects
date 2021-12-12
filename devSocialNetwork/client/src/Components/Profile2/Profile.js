import React,{Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import About from './About';
import ProfileEducation from './ProfileEducation';
import ProfileExperience
 from './ProfileExperience';
 import ProfileGithub from './ProfileGithub';
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
            {auth.isAuthenticated  && auth.loading === false && auth.user._id === params.id
            && (<Link to='/profiles/edit-profile' className='btn btn-light'>Edit Profile</Link>
            )}
            <div  class="profile-grid my-1">
                <ProfileTop profile={profile}/>
                <About profile={profile}/>
                <div className='profile-exp bg-white p-2'>
                    <h2 className='text-primary'>Experience</h2>
                    {profile.experience.length > 0 ? (<Fragment>
                        {profile.experience.map(experience=>(
                            <ProfileExperience key={experience._id} experience={experience}></ProfileExperience>
                        ))}
                    </Fragment>):(<h2>No Expereince</h2>)}

                    <div className='profile-exp bg-white p-2'>
                    <h2 className='text-primary'>Education</h2>
                    {profile.education.length > 0 ? (<Fragment>
                        {profile.education.map(education=>(
                            <ProfileEducation key={education._id} education={education}></ProfileEducation>
                        ))}
                    </Fragment>):(<h2>No Education</h2>)}
                </div>
                </div>

              {profile.githubusername && (<Fragment>
                  <ProfileGithub username={profile.githubusername}></ProfileGithub>
              </Fragment>)}
            </div>
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
