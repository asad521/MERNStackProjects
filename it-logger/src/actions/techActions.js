import {GET_TECHS, ADD_TECHS, DELETE_TECHS, SET_LOADING, TECH_ERRORS} from './types';



//Get techs
export const getTechs = () => async dispatch =>{
    try {
        setLoading();

        const res = await fetch ('/tech');
        const data = await res.json();

        dispatch({
            type: GET_TECHS,
            payload :data
        });
    }
    catch (err) {
        dispatch({
            type: TECH_ERRORS,
            payload :err.response.data
        });
    }

};
//delete tech
export const deleteTech = (id) => async dispatch =>{
    try {
        setLoading();

        await fetch (`/tech/${id}` , {
            method:'DELETE'
        });

        dispatch({
            type: DELETE_TECHS,
            payload :id
        });
    }
    catch (err) {
        dispatch({
            type: TECH_ERRORS,
            payload :err.response.data
        });
    }

};
//Add tech
export const addTech = (tech) => async dispatch =>{
    console.log(tech +"this is tech in techaction")
    console.log(tech.firstName +"this is tech in techaction")
    console.log(tech.lastName +"this is tech in techaction")
    try {
        setLoading();

        const res = await fetch ('/techs',{
            method: 'POST',
            body   :JSON.stringify(tech),
            headers : {
                'Content-Type' :'application/json'
            }
        });
        const data = await res.json();
        console.log(data)

        dispatch({
            type: ADD_TECHS,
            payload :tech
        });
    }
    catch (err) {
        dispatch({
            type: TECH_ERRORS,
            payload :err.response.data
        });
    }

};
//Set Loading to true

export const setLoading = () => {
    return {
        type :SET_LOADING
    };
}


