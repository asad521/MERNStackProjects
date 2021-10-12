import React, { useState } from "react";
import M from "materialize-css/dist//js/materialize.min.js";
import {connect} from "react-redux";
import {addTech} from '../../actions/techActions';
import PropTypes from 'prop-types';
export const AddTechModal = ({ addTech }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  console.log(firstName)
  console.log(lastName)
  let id=44;
  const onSubmit = (e) => {
    if (firstName === "" || lastName === "") {
      M.toast({ html: "Please enter the technician first and last name" });
    } else {
      // console.log(firstname, lastname);
      addTech({
        firstName,
        lastName,
        id,
      })
      M.toast({ html: `${firstName} & ${lastName} is added at technician name.`});

      //clearing fields
      setFirstName("");
      setLastName("");
    }
  };
  return (
    <div id="add-tech-modal" className="modal">
      <div className="modal-content">
        <h4>New Technician</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="firstName" className="active">
              First Name:
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="lastName" className="active">
              Last Name:
            </label>
          </div>
        </div>
      </div>
      <div className="modal-fotter">
        <a
          href="#!"
          onClick={onSubmit}
          className="btn waves-effect blue waves-light"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  widht: "75%",
  height: "75%",
};
AddTechModal.propTypes = {
  addTech: PropTypes.func.isRequired,
}
export default connect(null, {addTech})(AddTechModal);
