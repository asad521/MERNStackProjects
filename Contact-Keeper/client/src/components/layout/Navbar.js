import React from 'react';
import PropTypes from  'prop-types';
import {Link} from 'react-router-dom';
export const Navbar = ({title, icon}) => {
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}></i>{title}
            </h1>
            <ul>
                <li>
                    <Link to = '/'>Home</Link>
                </li>
                <li>
                    <Link to = '/about'>About</Link>
                </li>
                <li>
                    <Link to = '/Register'>Register</Link>
                </li>
                <li>
                    <Link to = '/Login'>Login</Link>
                </li>
            </ul>
        </div>
    )
}

//Proptypes
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon :PropTypes.string,
}

//Defaults Props

Navbar.defaultProps ={
    title : "Contact Keeper Application",
    icon : "fa fa-id-card-alt"
}