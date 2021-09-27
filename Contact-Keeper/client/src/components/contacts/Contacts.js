import React, {Fragment,useContext} from 'react';
import contactContext from '../../context/contact/ContactContext';
import { ContactItem } from './ContactItem';
import ContactState from '../../context/contact/ContactState';


export const Contacts = () => {
    const ContactContext = useContext(contactContext)
    const {contacts,filtered} =ContactContext;
    


    return (
        <Fragment>
         
            {filtered === null ? (contacts.map(contact => <ContactItem contact={contact}></ContactItem>)) :
             (filtered.map(contact => <ContactItem contact={contact}></ContactItem>))}   

                       
        </Fragment>
     )
}

export default Contacts;
