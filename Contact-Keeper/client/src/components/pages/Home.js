import React, {useContext, useEffect} from "react";
import Contacts from "../contacts/Contacts";
import ContactForm  from "../contacts/ContactForm";
import { Filter } from "../contacts/Filter";
import authContext from "../../context/auth/authContext";
export const Home = () => {

  const AuthContext = useContext(authContext);

  useEffect(()=>{
    AuthContext.loadUser();
  },[])
  return (
    <div className="grid-2">
      <div> {/* *cONTACT fROM */}</div>
      <div>
        <Filter></Filter>
        <Contacts></Contacts>
        <ContactForm></ContactForm>
      </div>
    </div>
  );
};

export default Home;
