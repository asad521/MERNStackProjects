import axios from "axios";
import { setAlert } from "./alert";
import { GET_CURRENT_PROFILE, PROFILE_ERROR } from "./types";

export const get_current_profile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type:GET_CURRENT_PROFILE,
            payload:res.data
        });

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        });
    }
    

};

