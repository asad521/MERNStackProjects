import React ,{useContext} from 'react';
import contactContext from '../../context/contact/ContactContext';

export const ContactItem = ({ contact }) => {
    const ContactContext = useContext(contactContext)
     const {deleteContact, setContact, clearContact} = ContactContext;

     const onDelete = () => {
          console.log(contact.id +"id is")
        deleteContact(contact._id);
        clearContact();
     }


    console.log(contact + "contact object in contact item")
    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {contact.name}{' '}<span style={{float:'right'}}
                className={'badge'+(contact.type=='professional' ?
                '-success' : '-primary')}> {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}</span>
            </h3>
            <ul className="list"> 
                {contact.email && <li>
                    <i className='fa fa-envelope-open'></i> {contact.email} </li>}
                {contact.phone && <li>
                    <i className='fa fa-phone'></i> {contact.phone} </li>}
            </ul>
            <p className='btn btn-dark btn-sm' onClick={() =>setContact(contact)}>Edit</p>
            <p className='btn btn-danger btn-sm' onClick={onDelete}>Delete</p>
        </div>
    )
}

export default ContactItem;
