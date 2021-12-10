import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from  'react-moment';
import {connect} from 'react-redux';
import {deleteExperience} from '../../actions/profile';


const Education = ({experience,deleteExperience}) => {


    console.log(experience.Object1 +" experince props")
    console.log(experience +" experince props")
    // experience.forEach(item => {console.log(item.company)})
    const experiences=experience.map(exp => (
        <td key={exp._id}> 
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title} {exp._id}</td>
            <td>
                <Moment form='YYYY/MM/DD'>{exp.from}</Moment> - {
                    exp.to === null ? ('Now') : (<Moment form='YYYY/MM/DD'>{exp.to}</Moment>)
                }
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => {deleteExperience(exp._id)
                console.log('clicked')}}>Delete</button>
            </td>
        </td>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Year</th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>

            </table>
        </Fragment>
    )
}

Education.propTypes = {

}

export default connect(null,{deleteExperience})(Education)
