import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {deleteTech} from '../../actions/techActions';
import M from "materialize-css/dist//js/materialize.min.js";

const TechItem = ({tech , deleteTech}) => {

 const onDelete = (id) => {
    deleteTech(id);
        M.toast({
            html:`${tech.firstName} ${tech.lastName} is deleted.`
        })
    }
    return (
        <li className="collection-item">
        <div>
            {tech.firstName}{tech.lastName}
            {/* {console.log(tech.firstName)} */}
            <a href="#!" className="secondary-content" onClick={() => onDelete(tech.id)}>
                <i className="material-icons red-text">delete</i>
            </a>
        </div>
        </li>
    )
}

TechItem.propTypes = {
tech:PropTypes.object.isRequired,
deleteTech: PropTypes.func.isRequired,
}

export default connect(null, {deleteTech})(TechItem)
