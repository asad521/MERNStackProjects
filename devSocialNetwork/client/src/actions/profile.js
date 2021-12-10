import axios from "axios";
import { setAlert } from "./alert";
import { CLEAR_PROFILE, GET_CURRENT_PROFILE,GET_PROFILES,GET_REPOS, PROFILE_ERROR,UPDATE_PROFILE,DELETE_ACCOUNT } from "./types";
import { useNavigate } from 'react-router';
import setAuthToken from "../util/setAuthToken";

export const get_current_profile = () => async (dispatch) => {

    console.log('This is get current allprofile action')

  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data,
    });
    console.log(res.data +'This is res.data of GetCurrent Profile');
    console.log('This is try block of getCurrentProfile after success')
  } catch (err) {
    console.log('This is error block of getCurretProfile');
    
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    console.log(err.response.status)
    console.log(err.response.statusText)
    console.log(err)
    console.log(err.response)
    dispatch(setAlert(err.response.statusText +' '+err.response.status,'danger'));

  }
};
// get all profiles
export const getAllProfiles = () => async (dispatch) => {
  console.log('This is get all profile action')

  // dispatch({type:CLEAR_PROFILE})
try {
  console.log("TRY OF get all profile action");

  const res = await axios.get("/api/profile");
  console.log("This is res"+res);
  dispatch({
    type: GET_PROFILES,
    payload: res.data,
  });

} catch (err) {
  console.log('get profiles error')
  dispatch({
    type: PROFILE_ERROR,
    payload: { msg: err.response.statusText, status: err.response.status },
  });
  console.log(err.response.status)
  console.log(err.response.statusText)
  console.log(err)
  console.log(err.response)
  dispatch(setAlert(err.response.statusText +' '+err.response.status,'danger'));

}
};

//get profile by id
export const getProfileById = (userId) => async (dispatch) => {

try {
  const res = await axios.get(`/api/profile/user/${userId}`);

  dispatch({
    type: GET_CURRENT_PROFILE,
    payload: res.data,
  });

} catch (err) {
  
  dispatch({
    type: PROFILE_ERROR,
    payload: { msg: err.response.statusText, status: err.response.status },
  });
  console.log(err.response.status)
  console.log(err.response.statusText)
  console.log(err)
  console.log(err.response)
  dispatch(setAlert(err.response.statusText +' '+err.response.status,'danger'));

}
};

//get github repos
export const getGithubRepos = (username) => async (dispatch) => {

  try {
    const res = await axios.get(`/api/profile/github/${username}`);
  
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  
  } catch (err) {
    
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    console.log(err.response.status)
    console.log(err.response.statusText)
    console.log(err)
    console.log(err.response)
    dispatch(setAlert(err.response.statusText +' '+err.response.status,'danger'));
  
  }
  };

//create or update profile
export const createProfileAction =  (formData,edit) =>  async (dispatch) => {
  console.log("in create profile action and edit is=>"+edit )

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data,
      });
      
    } catch (err) {
      console.log("error in cath")
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// add expereince 
export const addExperience=(formData) => async (dispatch) => {
console.log('This is addexperince action')
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);
    console.log('In addExpereince action. This is line after axios requiret');
    console.log('return from axios request is' + res);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    
  } catch (err) {
    console.log("error in catch  of add expereince action profile ")
    console.log(err)
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }

}

// Add Education 
export const addEducation =(formData) => async (dispatch) => {

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    
  } catch (err) {
    console.log("error in cath of add education")
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }

}

//Delete Experience
export  const deleteExperience = (id) => async (dispatch) => {
  console.log('This is delete expereince action');
  try {
    
    const res = await axios.delete(`/api/profile/experience/${id}`);
    
    dispatch({
      type:UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Expereince Removed','danger'))
  } catch (err) {
    console.log("error in cath of add education")
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }

};

//Delete Education
export const deleteEducation = id => async (dispatch) => {

  try {
    console.log(id +"This is id")
    const res = await axios.delete(`/api/profile/education/${id}`);
    
    dispatch({
      type:UPDATE_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    console.log("error in cath of add education")
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }

}

//Delete Account & Profile

export const deleteAccount = id => async (dispatch) => {

    if (window.confirm('Are you sure ? This can not be Undone')) {
      try {
    
        const res = await axios.delete('/api/profile/');
        
        dispatch({type:CLEAR_PROFILE});
        dispatch({type:DELETE_ACCOUNT});
        dispatch(setAlert('Your Account has been deleted'));
      } catch (err) {
        console.log("error in cath of add education")
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
      }
    }
 

}