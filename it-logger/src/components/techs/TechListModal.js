import React, { useState ,useEffect } from 'react';
// import Logitem from './Logitem';
import TechItem from './TechItem';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {getTechs} from '../../actions/techActions';
export const TechListModal = ({ getTechs ,tech:{ techs,loading }}) => {
    // const [techs, setTechs] = useState([]);
    // const [loading,setLoading] =useState(false);
    useEffect(() => {
        getTechs();
    },[]);
    // console.log(techs)

    // const getTechs = async () => {
    //     setLoading(true);
    //     const res = await fetch('/tech');
    //     const data = await res.json();
    //     console.log(data +"this is returned data");
    //     setTechs(data);
    //     setLoading(false);
    // } 
        return (
        <div id="tech-list-modal" className="modal">
            <div className="modal-content">
                <h4>Technician List</h4>
                <ul className="collection">
                    {!loading && techs !== null  && techs.map(tech => 
                        <TechItem tech={tech} key={tech.id}></TechItem>
                    )}
                </ul>
            </div>
        </div>    
        )
            
        
    }
    
const mapStateToProps = state =>(
    {tech : state.tech}

)
TechListModal.propTypes= {
    getTechs:PropTypes.func.isRequired,
    techs:PropTypes.object.isRequired,
}
export default connect(mapStateToProps,{getTechs})(TechListModal);
