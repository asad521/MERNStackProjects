import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import axios from 'axios';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CONTACT,
  CLEAR_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
  GET_CONTACTS,
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [],
    current : null,
    filtered  : null,
    error :null,
  };
  const [state, dispatch] = useReducer(ContactReducer,initialState)

  //Get Contacts
  const getContacts = async () => { 
    try {
      const res = await axios.get('/api/contacts' )
      dispatch ({ type: GET_CONTACTS, payload :res.data})

    } catch(err) {
      dispatch ({ 
      type: CONTACT_ERROR ,
      payload:err.response.msg})

    }
  }



  // console.log(Object.keys(state) +'STATE IN CONTACTSTSATE')
  //Add contact
  const addContact = async contact => {
    console.log('this is contact in add contact method' + contact)
    // Object.keys(contact).map(item=>console.log(contact[item]))
    // contact.id = uuid.v4();
    const  config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/contacts',contact,config )
      dispatch ({ type: ADD_CONTACT, payload :res.data})

    } catch(err) {
      dispatch ({ 
      type: CONTACT_ERROR ,
      payload:err.response.msg})

    }

    console.log(state)
  }

  //Delete Contact

  const deleteContact = async id => {
    try {
      const res = await axios.delete(`/api/contacts/${id}` )
      dispatch ({ 
        type: DELETE_CONTACT,
         payload :id})

    } catch(err) {
      dispatch ({ 
      type: CONTACT_ERROR ,
      payload:err.response.msg})

    }
  }

    //Update cONTACT

    const updateContact = async contact => {
      const  config = {
        headers: {
          'Content-Type' : 'application/json'
        }
      }
      try {
        const res = await axios.put(`/api/contacts/${contact._id}`,contact,config )
        dispatch ({ 
          type: UPDATE_CONTACT,
           payload :res.data})
  
      } catch(err) {
        dispatch ({ 
        type: CONTACT_ERROR ,
        payload:err.response.msg})
  
      }
      };
  //Set Current Contact

  const setContact = contact => {
    dispatch ({ type: SET_CONTACT, payload :contact})
  }
  //cLEAR Current Contacct
  const clearContact = contact => {
    dispatch ({ type: CLEAR_CONTACT})
  }
  //cLEAR Current Contacct
  const clearAllContacts = () => {
    dispatch ({ type: CLEAR_CONTACTS})
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
          error   : state.error,
          addContact,
          deleteContact,
          setContact,
          clearContact,
          updateContact,
          filterContacts,
          clearFilter,
          getContacts,
          clearAllContacts,
          }}>
            {props.children}
        </ContactContext.Provider>)
}; 

export default ContactState;
