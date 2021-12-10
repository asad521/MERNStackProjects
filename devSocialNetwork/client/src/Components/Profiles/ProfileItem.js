import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({props}
  // profile: {
  //   status,
  //   company,
  //   location,
  //   user,
  //   skills,
  //   _id,
    
  // },
  
) => {
  console.log("in item of profile");
//  console.log(Object.keys(props))
 console.log(props.user._id)//this is user id not profile id
  return (  
    <div>
      <div className="profile bg-light">
        <img src={props.user.avatar} className="round-img"></img>
        <h2>{props.user.name}</h2>
        <p>
          {props.status} {props.company && <span> at {props.company}</span>}</p>
        <p className="my-1">{props.location && <span>Location:{props.location}</span>}</p>
        <Link to={`/profile/${props.user._id}`} className="btn btn-primary">
          View Profile
        </Link>
        <ul>
         {props.skills.slice(0, 4).map((skill, index) => (
           <span key={index} className="text-primary">
              {skill},</span>
         ))}
       </ul>
      </div>
      
     
      </div>
  )
}


export default ProfileItem;
