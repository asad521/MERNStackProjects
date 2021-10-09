import {GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOGS} from './types';


// export const getLogs = () => {

//     return async (dispatch, getState) => {
//         setLoading();

//         const res = await fetch ('/logs');
//         const data = await res.json();

//         dispatch({
//             type: GET_LOGS,
//             payload :data
//         });
//     }


// };
// get log action
export const getLogs = () => async dispatch =>{

    try {
        setLoading();

        const res = await fetch ('/logs');
        const data = await res.json();

        dispatch({
            type: GET_LOGS,
            payload :data
        });
    }
    catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload :err.response.data
        });
    }

};

// add logs action
export const addLogs = (log) => async dispatch =>{

    try {
        setLoading();

        const res = await fetch ('/logs', {
            method: 'POST',
            body   : JSON.stringify(log),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();

        dispatch({
            type: ADD_LOGS,
            payload :data
        });
    }
    catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload :err.response.data
        });
    }

};

export const setLoading = () => {
    return {
        type :SET_LOADING
    };
}