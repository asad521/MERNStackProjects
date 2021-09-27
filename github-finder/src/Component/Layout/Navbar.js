import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Navbar = ({icon,title}) => {


        return (
            <nav className="navbar bg-primary">
                <h1>
                    <i className={icon}/> {title}
                </h1>
                <ul>
                    <li>
                        {/* we can use a.Link is helpful.because here we 
                        are switching pages on client side.Link help to 
                        preserve the states of different pages. */}
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                </ul>
            </nav>
        )
    
}

Navbar.defaultProps = {
    title:'Github Finder',
    icon: 'fa fa-github'
}

Navbar.propTypes = {
    title :PropTypes.string.isRequired,
    icon:PropTypes.string.isRequired
}

export default Navbar
