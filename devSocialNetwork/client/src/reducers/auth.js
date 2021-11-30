import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOG_OUT,
    CLEAR_PROFILE
} from '../actions/types';

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user   : null
}

export default function(state=initialState, action) {

    const { type, payload } = action;
    
    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user :payload
            }
            
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
              localStorage.setItem('token', payload.token);
              return {
                  ...state,
                  ...payload,
                  isAuthenticated: true,
                  loading: false,
              }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOG_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                isAuthenticated:null,
                loading:false,
                
                
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