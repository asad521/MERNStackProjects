import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
  const Useritem = ({users:{login, avatar_url, html_url, }}) => {

         return (
            
            <div className="card text-center"> 
            
            {/* double {{is inline style}} */}
        
            <img src={avatar_url}  alt="" className="round-img" 
            style={{width:'60px'}}  />
            <h3>{login}</h3>
            
            <div>
                <Link to={`/User/${login}`} className="btn btn-dark btn-sm my-1">
                More</Link></div>
            </div>

        )
    }
  


export default Useritem
