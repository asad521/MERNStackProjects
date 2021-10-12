import React, { useState ,useEffect } from 'react';
import Logitem from './Logitem';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getLogs} from '../../actions/logActions';

import Preloader from '../layout/Preloader';
export const Logs = ({log : {logs , loading}, getLogs}) => {
    // const [logs, setLogs] = useState([]);
    // const [loading,setLoading] =useState(false);

    useEffect(() => {
        getLogs();
    },[]);

    // const getLogs = async () => {
    //     setLoading(true);
    //     const res = await fetch('/logs');
    //     const data = await res.json();
    //     // console.log(data +"this is returned data");
    //     setLogs(data);
    //     setLoading(false);
    // }
    if(loading || logs === null) {
        return  <Preloader></Preloader>
    } else {
        return (
            <ul className="collection width-header">
                <li className="collection-header">
                    <h4 className="center">System Logs</h4>
                </li>
                {!loading && logs.length === 0  ? (<p className="center">No logs to show</p>):
                (logs.map(log => {
                   return <Logitem log={log} key={log.id}></Logitem>
                    
                    
                }))}
                
            </ul>
        )
    }
    
}
Logs.propTypes = {
    log : PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    //bring whole state and destruction at top
    log :state.log
    // or can bring specific value like below
    // log :state.log.logs,
    // loading:state.log.loading
})

export default connect(mapStateToProps, {getLogs})(Logs);
