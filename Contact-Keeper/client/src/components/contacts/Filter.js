import React ,{useContext , useRef , useEffect}from 'react'
import contactContext from '../../context/contact/ContactContext'

export const Filter = () => {
    const ContactContext = useContext(contactContext);
    const text = useRef('');
    const {filtered, filterContacts, clearFilter} =ContactContext;
    console.log(filtered)
    
    useEffect(() => {
        if (filtered === null){
            text.current.value = '';
        }
    });

    const onChange = (e) => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
        }else {
            clearFilter();
        }

    }
    return (
        <form>
            <input type="text" ref= {text} placeholder="Filter Contacts..." onChange={onChange}></input>
        </form>
    )
}
