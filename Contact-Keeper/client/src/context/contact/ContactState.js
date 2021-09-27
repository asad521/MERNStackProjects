import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CONTACT,
  CLEAR_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Asad",
        email: "asad@yahoo.com",
        phone: "0315314086",
        type: "personal",
      },
      {
        id: 2,
        name: "ali",
        email: "ali@yahoo.com",
        phone: "0345314086",
        type: "professional",
      },
      {
        id: 3,
        name: "khan",
        email: "khan@yahoo.com",
        phone: "0305314086",
        type: "relative",
      },
      {
        id: 4,
        name: "jiya",
        email: "jiya@yahoo.com",
        phone: "03915314086",
        type: "professional",
      },

    ],
    current : null,
    filtered  : null,
  };

  const [state, dispatch] = useReducer(ContactReducer,initialState)
  // console.log(Object.keys(state) +'STATE IN CONTACTSTSATE')
  //Add contact
  const addContact = contact => {
    console.log('this is contact in add contact method' + contact)
    Object.keys(contact).map(item=>console.log(contact[item]))
    contact.id = uuid.v4();
    dispatch ({ type: ADD_CONTACT, payload :contact})
    console.log(state)
  }

  //Delete Contact

  const deleteContact = id => {
    dispatch ({ type: DELETE_CONTACT, payload :id})
  }
  //Set Current Contact

  const setContact = contact => {
    dispatch ({ type: SET_CONTACT, payload :contact})
  }
  //cLEAR Current Contacct
  const clearContact = contact => {
    dispatch ({ type: CLEAR_CONTACT})
  }
  //Update cONTACT

  const updateContact = contact => {
    dispatch ({ type: UPDATE_CONTACT, payload :contact})
  }
  //fILTER CONTACT
  const filterContacts = text => {
    dispatch ({ type: FILTER_CONTACTS, payload :text})
    console.log(text +"This is filtered")
  }

  //cLEAR FILTER
  const clearFilter = () => {
    dispatch ({ type: CLEAR_FILTER})
  }
  return (
        <ContactContext.Provider
        value={{
          contacts: state.contacts,
          current :state.current,
          filtered: state.filtered,
          addContact,
          deleteContact,
          setContact,
          clearContact,
          updateContact,
          filterContacts,
          clearFilter,
          }}>
            {props.children}
        </ContactContext.Provider>)
}; 

export default ContactState;
