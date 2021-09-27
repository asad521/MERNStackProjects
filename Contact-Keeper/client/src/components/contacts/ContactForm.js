import React, { useState, useContext, useEffect } from "react";
import { SET_CONTACT } from "../../context/types";
import ContactContext from "../../context/contact/ContactContext";

export const ContactForm = () => {
  const contactContext  = useContext(ContactContext)


  const {addContact , clearContact,current,updateContact} = contactContext;

  useEffect(() => {
    if(current !== null) {
      setContact(current);
        } else {
          setContact({
            name: "",
            email: "",
            phone: "",
            type: "personal",
          })
        }
  },[contactContext, current])
  // console.log(current)

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  const clearAll = () => {
    clearContact();
  }
  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({...contact, [e.target.name] :e.target.value });
      // console.log('onchange')
      // console.log(contact)

  }
  const onSubmit = (e) =>{
      e.preventDefault();
      if(current === null) {
        addContact(contact);
      } else {
        updateContact(contact);
      }
 
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      })
  };


  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input
        type="text"
        placeholder="Enter your Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Enter your Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Enter your Mobile #]"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input type="radio"  name="type" value="personal" checked={type==='personal'} onChange={onChange}
        /> Personal {' '}
      <input type="radio"  name="type" value="Professional" checked={type==='personal'} 
        onChange={onChange}/> Professional {' '}
    <div>
        <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block"/>
      {current && <div className='btn btn-dark btn-block' onClick={clearAll}>Clear</div>}
    </div>
    </form>
  );
};


export default ContactForm;