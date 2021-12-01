import axios from "axios";
import { setAlert } from "./alert";
import { GET_CURRENT_PROFILE, PROFILE_ERROR } from "./types";
import { useNavigate } from 'react-router';
import setAuthToken from "../util/setAuthToken";

export const get_current_profile = () => async (dispatch) => {


  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create or update profile

export const createProfileAction =  (formData,edit = false) =>  async (dispatch) => {
  console.log("in create profile action")

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
