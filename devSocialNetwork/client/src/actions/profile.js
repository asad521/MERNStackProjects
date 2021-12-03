import axios from "axios";
import { setAlert } from "./alert";
import { GET_CURRENT_PROFILE, PROFILE_ERROR } from "./types";
import { useNavigate } from 'react-router';
import setAuthToken from "../util/setAuthToken";

export const get_current_profile = () => async (dispatch) => {

    console.log('This is get current profile')

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
