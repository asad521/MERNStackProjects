import React, { useReducer } from "react";
import alertContext from "./AlertContext";
import alertReducer from "./AlertReducer";
import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //SET_ALERT
  const setAlert = (msg, type, timeout = 1000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
  return (
    <alertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
