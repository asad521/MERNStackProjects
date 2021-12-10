import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from  'react-moment';
import {connect} from 'react-redux';
import {deleteEducation} from '../../actions/profile';


const Education = ({education,deleteEducation}) => {


    console.log(education.Object1 +" education props")
    console.log(education +" education props")
    // experience.forEach(item => {console.log(item.company)})
    const experiences=education.map(edu => (
        <td key={edu._id}> 
            <td>{edu.company}</td>
            <td className='hide-sm'>{edu.title} {edu._id}</td>
            <td>
                <Moment form='YYYY/MM/DD'>{edu.from}</Moment> - {
                    edu.to === null ? ('Now') : (<Moment form='YYYY/MM/DD'>{edu.to}</Moment>)
                }
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => {deleteEducation(edu._id)
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

export default connect(null,{deleteEducation})(Education)
