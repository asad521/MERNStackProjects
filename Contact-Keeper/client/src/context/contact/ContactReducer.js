import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CONTACT,
  CLEAR_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          console.log(regex +"This is regex");
          console.log(contact.name +"This is name");
          console.log(contact.name.match(regex) +"This is filtered");
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
          
        ),
        loading: false,

      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false,

      };
    case SET_CONTACT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CONTACT:
      return {
        ...state,
        current: null,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
      case CONTACT_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      case GET_CONTACTS:
        return {
          ...state,
          contacts: action.payload,
          loading: false,
        };
      case CLEAR_CONTACTS:
        return {
          ...state,
          contacts:null,
          filtered:null,
          error:null,
          current:null,
        }
    default:
      return state;
  }
};
