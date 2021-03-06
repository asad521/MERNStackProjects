import axios from 'axios' ;
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT,
    CLEAR_PROFILE
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../util/setAuthToken';
//load User 
export const  loadUser = () =>async dispatch => {
    if(localStorage.token) {
        
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
        // dispatch(loadUser());
    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        })
    }

}

//Register User

export const register = ({name,email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name , email, password});
    
    try {
        const res = await axios.post('/api/users',body,config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data 
        });
        dispatch(setAlert('User is Registered','success'));
        dispatch(loadUser());

        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:REGISTER_FAIL
        })
    }
}

//Login User

export const login = (email, password) => async dispatch => {
    console.log('in login action')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});
    
    try {
        const res = await axios.post('/api/auth',body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data 
        });
        dispatch(setAlert('Congratulation, You are Logged-In','success'));
              
    } catch (err) {
        const errors = err.response.data;
        dispatch(setAlert('Invalid Credentials','danger'));
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }
}

 export const logout = () => dispatch => {
    console.log('logout action triggered')
    dispatch({type:LOG_OUT})
    dispatch({type:CLEAR_PROFILE})
}