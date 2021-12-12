import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
const ProfileExperience = ({experience:{company,title,location,to,from,discription,current}}) => {
    return (
        <div>
            <h3 className='text-dark'>{company+'  '} 
            <Moment format='YYYY/MM/DD'>{from}</Moment>
            -{to ? (<Moment format='YYYY/MM/DD'>{to}</Moment>):'Present'}
            </h3>
            <p>
                <strong>Position:</strong>{title}
            </p>
            <p>
                <strong>Discription:</strong>{discription}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {

}

export default ProfileExperience
