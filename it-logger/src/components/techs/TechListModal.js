import React, { useState ,useEffect } from 'react';
// import Logitem from './Logitem';
import TechItem from './TechItem';

export const TechListModal = () => {
    const [techs, setTechs] = useState([]);
    const [loading,setLoading] =useState(false);

    useEffect(() => {
        getTechs();
    },[]);

    const getTechs = async () => {
        setLoading(true);
        const res = await fetch('/tech');
        const data = await res.json();
        console.log(data +"this is returned data");
        setTechs(data);
        setLoading(false);
    } 
        return (
        <div id="tech-list-modal" className="modal">
            <div className="modal-content">
                <h4>Technician List</h4>
                <ul className="collection">
                    {!loading && techs.map(tech => 
                        <TechItem tech={tech} key={tech.id}></TechItem>
                    )}
                </ul>
            </div>
        </div>    
        )
            
        
    }
    
export default TechListModal;
