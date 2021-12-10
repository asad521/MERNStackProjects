import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({getAllProfiles,profiles,loading}) => {
    console.log("aldjf")
     useEffect(()=> {
         console.log('This is usestate for getting all profiles')
         getAllProfiles();
     },[]);
    console.log('Successfully')
    console.log(profiles +"  This is profiless")
    console.log(typeof profiles)
    return (
        <Fragment>
            {loading ? 'Spinner' : <Fragment>
            <h1 className="large text-primary">Developer</h1>
            <p>Browse and connect with developer</p>  
            <div className="profiles">
            {profiles.length > 0 ? (
                
                profiles.map(profile => (
                    <ProfileItem key={profile._id} props={profile} />
                  

                ))
            ) : 'no prfile found'}     
        </div>      
        </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {

}

const mapStateToProps = state => ({
    profiles:state.profile.allProfiles,
})

export default connect(mapStateToProps,{getAllProfiles})(Profiles)
