import React, { useContext } from "react";
import alertContext from "../../context/alert/AlertContext";

export const Alerts = () => {
  const AlertContext = useContext(alertContext);

  return (
    AlertContext.alerts.length > 0 &&
    AlertContext.alerts.map((alert) => {
    
      return (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fa fa-info-circle" /> {alert.msg}
      </div>
      )
    
    })
    
    ) 
};

export default Alerts;
