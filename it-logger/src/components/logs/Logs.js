import React, { useState ,useEffect } from 'react';
import Logitem from './Logitem';

import Preloader from '../layout/Preloader';
export const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [loading,setLoading] =useState(false);

    useEffect(() => {
        getLogs();
    },[]);

    const getLogs = async () => {
        setLoading(true);
        const res = await fetch('/logs');
        const data = await res.json();
        // console.log(data +"this is returned data");
        setLogs(data);
        setLoading(false);
    }
    if(loading) {
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

export default Logs;
