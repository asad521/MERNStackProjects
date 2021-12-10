import React,{Fragment,useState} from 'react';
import {Link,Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addExperience} from '../../actions/profile';
import { STATES } from 'mongoose';

const AddEdu = ({addExperience}) => {

    const [formData,setFormData] = useState({
        company:'',
        title:'',
        location:'',
        to:'',
        form:'',
        current:false,
        discription:'',
    });


    const [toDateDisabled,toggleDisable] = useState(false);

    const {company,title,location,from,to,current,discription} =formData;

    const onChange = e => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    let submit=0;
    const onSubmit = e => {
      console.log("onSubmit in AddEdu ")
      e.preventDefault();
      addExperience(formData);
      console.log('return from add expereince action in AddEdu component');
      submit =true;
      
    }

    // if(submit===true){
    //   return  <Navigate replace to='/Dashboard'></Navigate>

    // }

    


    return (
        <Fragment>
            <section className="container">
      <h1 class="large text-primary">
       Add An Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={e=>onChange(e)} />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={e=>onChange(e)}/>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e=>onChange(e)}/>
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e=>onChange(e)}/>
        </div>
         <div class="form-group">
          <p><input type="checkbox" name="current" checked={current} value="" value={current} onChange={e=>{
            setFormData({...formData,current:!current});
            toggleDisable(!toDateDisabled);
        }}/>  Current Job</p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e=>onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={discription} onChange={e=>onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/Dashboard">Go Back</Link>
      </form>
    </section>
        </Fragment>
    )
}

AddEdu.propTypes = {
addExperience : PropTypes.func.isRequired,

}

export default connect(null,{addExperience})(AddEdu)
