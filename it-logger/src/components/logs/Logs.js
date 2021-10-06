import React, { useState ,useEffect } from 'react'

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
        return  <h4>Loading......</h4>
    } else {
        return (
            <ul className="collection-width-header">
                <li className="collection-header">
                    <h4 className="center">System Logs</h4>
                </li>
                {!loading && logs.length === 0  ? (<p className="center">No logs to show</p>):
                (logs.map(log => {
                    {console.log(log.message)}
                   return <p>{log.message}</p>
                    
                    
                }))}
                
            </ul>
        )
    }
    
}

export default Logs;
