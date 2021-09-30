import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCES,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
      token: localStorage.getItem("token"),
      isAuthenticated :null,
      loading:true,
      error:null, 
      user :null,
};

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User

  //Register User

  //Login User

  //LOGOUT

  //Clear Errors

    
  return (
    <authContext.Provider
      value={{
        token : state.token,
        isAuthenticated : state.isAuthenticated,
        loading : state.loading,
        user : state.user,
        error : state.error,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;