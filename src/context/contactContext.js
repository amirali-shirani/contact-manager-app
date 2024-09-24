import {createContext} from "react";

export const ContactContext = createContext({
    loading : false ,
    setLoading : () => {},
    contact :{},
    setContact : () => {},
    groups :[],
    setGroups : () => {},
    onContactChange : () => {} ,
    deleteContact : () => {} ,
    contacts: [] ,
    setContacts : () => {},
    createContactForm : () => {} ,
    contactSearch : () => {} ,
    filteredContacts :[] ,
    setFilteredContacts : () => {},
    query : {text : ""} ,
})