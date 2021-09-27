import React from "react";
import Contacts from "../contacts/Contacts";
import ContactForm  from "../contacts/ContactForm";
import { Filter } from "../contacts/Filter";
export const Home = () => {
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
