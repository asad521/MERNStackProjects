import axios from 'axios';

const setAuthToken = token => {
    console.log("This is util fine .This is for setting global header with every axios request")
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token ;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;