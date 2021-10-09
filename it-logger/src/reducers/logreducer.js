
import {GET_LOGS, SET_LOADING, LOGS_ERROR,ADD_LOGS} from '../actions/types';

const initialState = {
    logs : null,
    current :null,
    loading: false,
    error : null
}
// Get logs form server
export default (state = initialState,action) => {
    switch (action.type) {
        case ADD_LOGS:
            return {
                ...state,
                logs : [...state.logs , action.payload],
                loading:false,
            }
        case GET_LOGS:
            return {
                ...state,
                logs :action.payload,
                loading:false
            }
        case SET_LOADING:
            return {
                ...state,
                loading :true
            }
        case LOGS_ERROR:
            return {
                ...state,
                error:action.payload,
            }
        default: 
        return state;
    }
}