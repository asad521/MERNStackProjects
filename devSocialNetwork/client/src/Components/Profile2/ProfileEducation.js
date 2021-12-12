import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
const ProfileEducation = ({education:{school,degree,fieldofstudy,to,from,discription,current}}) => {
    return (
        <div>
            <h3 className='text-dark'>{school+'  '} 
            <Moment format='YYYY/MM/DD'>{from}</Moment>
            -{to ? (<Moment format='YYYY/MM/DD'>{to}</Moment>):'Present'}
            </h3>
            <p>
                <strong>Degree:</strong>{degree}
            </p>
            <p>
                <strong>Field of Study:</strong>{fieldofstudy}
            </p>
            <p>
                <strong>Discription:</strong>{discription}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {

}

export default ProfileEducation
