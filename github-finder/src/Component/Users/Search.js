import PropTypes from  'prop-types';
import React, {useState,useContext} from 'react'
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

 const Search= () => {
const githubContext = useContext(GithubContext);
const alertContext = useContext(AlertContext);

const [text,setText] =useState('');
   
     //without arrow function you must bind the thi skeyword
     const onChange = (e) => {
         setText(e.target.value)
     } 
    const onSubmit = (e) => {
        e.preventDefault();
        if (text === ''){
            alertContext.setAlert('Please Enter Something', 'light');
        } else {

        githubContext.searchUsers(text);//this props is going up to app
        setText('')
        }      
     }
    //   clearUsers = () => {
    //    clearUsers();
    //  }
        return (
            <div>
                <form className="form" onSubmit={onSubmit}>
                    <input type="text" name="text" placeholder="Search Users..." 
                    value={text} onChange={onChange} />
                    <input type="submit" name="Searcg" className="btn btn-dark btn-block" />
                </form>
                {/* //putting a button in the form will trigger the searuseres . */}
                {/* //below is if state in {} */}
                {githubContext.users.length > 0 &&  <button className="btn btn-light btn-inline" 
                onClick={githubContext.clearUsers}>Clear</button>
 }

            </div>
        )
   
}


export default Search
