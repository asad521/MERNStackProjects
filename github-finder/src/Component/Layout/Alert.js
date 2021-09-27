 import React ,{ useContext }from 'react';
 import AlertContext  from '../../context/alert/alertContext';
 
 const Alert = () => {
     const alertContextt =useContext(AlertContext)
     const {alert} =alertContextt;
     return (
    alert !== null &&  (
             <div className={`alert alert-${alert.type}`}>
                 <i className="fa fa-info-circle"></i>{alert.msg}

             </div>
         )
     )
 }
 export default Alert;