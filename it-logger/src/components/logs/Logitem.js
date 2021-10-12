import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import {connect} from "react-redux";
import { deleteLogs , setCurrent } from "../../actions/logActions";
import M from 'materialize-css/dist/js/materialize.min.js';

const Logitem = ({ log , deleteLogs, setCurrent}) => {

  const onDelete = () => {
    deleteLogs(log.id)
    M.toast({html:'Log Delete'})
  }
  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-log-modal"
          className={`modal-trigger
                ${log.attention ? "red-text" : "blue-text"}`}
        onClick={() =>{setCurrent(log)
        console.log('on clicked of')} }
        >
          {log.message}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text"> ID# {log.id} </span>
          Last Updated By:
          <span className="black-text"> {log.tech}</span> on{" "}
          <Moment formate="MMMM Do YYYY, h:mm:ss a">{log.date}</Moment>
        </span>
        <a href="#!" onClick={onDelete} className="secondary-content">
                <i className="material-icons grey-text">delete</i>
            </a>
      </div>
    </li>
  );
};

Logitem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLogs:PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, {deleteLogs, setCurrent})(Logitem);
