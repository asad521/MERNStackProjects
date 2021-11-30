//initial state for profile
import { GET_CURRENT_PROFILE , PROFILE_ERROR } from "../actions/types";
const initialState = {
    profile:null,
    profiles:[],
    repos:[],
    loading:true,
    error:{}
};

export default function(state= initialState,action) {
    const {type, payload} = action;
    switch(action.type) {
        case GET_CURRENT_PROFILE:
            return {
                ...state,
                profile:payload,
                loading:false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            }
        default:
            return state
    }

}