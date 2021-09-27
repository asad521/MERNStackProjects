import React, { useContext } from "react";
import Useritem from "./Useritem";
import Spinner from "../Layout/Spinner";
import GithubContext  from "../../context/github/githubContext";

const Users = () => {
  const githubContext = useContext(GithubContext);
  const {loading, users}=githubContext;

        if (loading){
          console.log('loading is true')
          return <Spinner/>
        } else {
          return  <div style={userStyle}>
          {
          users.map(item => (
              <Useritem users={item}></Useritem>
    
          ))}
    
      </div> 
        }  }

const userStyle= {
    display:'grid',
    gridTemplateColumns:'repeat(3 , 1fr)',
    gridGap:'1rem'
}
export default Users;
