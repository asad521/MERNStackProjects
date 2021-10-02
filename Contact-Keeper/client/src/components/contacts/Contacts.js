import React, {Fragment,useContext, useEffect} from 'react';
import contactContext from '../../context/contact/ContactContext';
import { ContactItem } from './ContactItem';
import ContactState from '../../context/contact/ContactState';


export const Contacts = () => {
    const ContactContext = useContext(contactContext)
    const {contacts, filtered, getContacts, loading} =ContactContext;
    
    useEffect(() => {
        getContacts();
    },[])


    return (
        <Fragment>
         
            {filtered === null ? (contacts.map(contact => <ContactItem  key={contact._id} contact={contact}></ContactItem>)) :
             (filtered.map(contact => <ContactItem key={contact._id}  contact={contact}></ContactItem>))}   

                       
        </Fragment>
     )
}

export default Contacts;
