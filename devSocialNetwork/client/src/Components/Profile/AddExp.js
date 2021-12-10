import React,{Fragment,useState} from 'react';
import {Link,Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';
import { STATES } from 'mongoose';

const AddExp = ({addEducation}) => {

    const [formData,setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        to:'',
        form:'',
        current:false,
        discription:'',
    });


    const [toDateDisabled,toggleDisable] = useState(false);

    const {school,degree,fieldofstudy,from,to,current,discription} =formData;

    const onChange = e => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    let submit=0;
    const onSubmit = e => {
      console.log("onSubmit in AddExp ")
      e.preventDefault();
      addEducation(formData);
      console.log('return from add education action in AddExp component');
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
        <i class="fas fa-code-branch"></i> Add any education positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <input type="text" placeholder="* Degree title " name="degree" required value={degree} onChange={e=>onChange(e)} />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* School" name="school" required value={school} onChange={e=>onChange(e)}/>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={e=>onChange(e)}/>
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

AddExp.propTypes = {
addEducation : PropTypes.func.isRequired,

}

export default connect(null,{addEducation})(AddExp)
