//initial state for profile
import { GET_CURRENT_PROFILE ,GET_PROFILES,GET_REPOS, PROFILE_ERROR,CLEAR_PROFILE, UPDATE_PROFILE } from "../actions/types";
const initialState = {
    profile:null,
    allProfiles:[],
    repos:[],
    loading:true,
    error:{}
    
};

export default function(state= initialState,action) {
    const {type, payload} = action;
    switch(action.type) {
        case GET_CURRENT_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile:payload,
                loading:false
            }
        case GET_PROFILES:
            return {
                ...state,
                allProfiles:payload,
                loading:false,
            }
        case GET_REPOS:
            return {
                ...state,
                repos:payload,
                loading:false,
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            }
            case CLEAR_PROFILE:
                return {
                    ...state,
                    profile:null,
                    repos:null,
                    loading: false,
                }
          
        default:
            return state
    }

}