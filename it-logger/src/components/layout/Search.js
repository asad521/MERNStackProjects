import React, { useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchLogs } from "../../actions/logActions";

export const Search = ({ searchLogs }) => {
  const text = useRef();
  const onChange = (e) => {
    console.log("On change trigger");
    console.log(text.current.value);
    searchLogs(text.current.value);
  };
  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div class="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Please Enter to Search Logs"
              ref={text}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};
Search.propTypes = { SearchLogs: PropTypes.func.isRequired };
export default connect(null, { searchLogs })(Search);
