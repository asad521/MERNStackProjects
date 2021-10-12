import {GET_LOGS,SEARCH_LOGS,ADD_TECHS, SET_LOADING, LOGS_ERROR, ADD_LOGS,DELETE_LOGS, CLEAR_CURRENT, SETT_CURRENT,UPDATE_LOGS} from './types';


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

//search logs
export const searchLogs = (text) => async dispatch =>{
    console.log("Action triggers")
    try {
        setLoading();
        const res = await fetch (`/logs?q=${text}`);
        const data = await res.json();

        dispatch({
            type: SEARCH_LOGS,
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

// delete logs action
export const deleteLogs = (id) => async dispatch =>{

    try {
        setLoading();

        await fetch (`/logs/${id}`,{
            method:'DELETE'
        });
        dispatch({
            type: DELETE_LOGS,
            payload :id
        });
    }
    catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload :err.response.data
        });
    }

};

// UPDAT logs action
export const updateLogs = (log) => async dispatch =>{
    try {
        setLoading();

        const res= await fetch (`/logs/${log.id}`,{
            method:'PUT',
            body:JSON.stringify(log),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        dispatch({
            type: UPDATE_LOGS,
            payload :data
        }); 
    }
    catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload :err.response.data,
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

// set current log

export const setCurrent = (log) => {
    console.log('on clicked of set current activated in logAction')
    return {
        type :SETT_CURRENT,
        payload:log,
    }

}
//clear current log
export const clearCurrent = () => {
    return {
        type :CLEAR_CURRENT
     
    }
}