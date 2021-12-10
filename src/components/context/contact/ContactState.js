import React,{useReducer} from "react";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import ContactReducer from "./contactReducer";
import ContactContext from "./contactContext";
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from "../types";
import { PromiseProvider } from "mongoose";

const ContactState = (props) => {
    const initialState = {
        contacts:[],
        current:null,
        filtered:null,
        error:null
    }

    const [state,dispatch] = useReducer(ContactReducer,initialState);

    // Add Contact
    const addContact = async (contact) =>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        try {
            const res = await axios.post("/api/contacts",contact,config);
            dispatch({ type:ADD_CONTACT, payload:res.data });
        } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.data.msg});
        }
        
        

    }
    // Get Contact
    const getContacts = async ()=>{
        try {
            const res = await axios.get("/api/contacts");
            dispatch({type:GET_CONTACTS,payload:res.data});
        } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.data.msg});
        }
    }
     // Update Contact
     const updateContact = async contact =>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`,contact,config);
            dispatch({type:UPDATE_CONTACT,payload:res.data});
        } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.data.msg});
        }
        
    }

    // Clear Contacts
    const clearContacts = () => {
        dispatch({type:CLEAR_CONTACTS});
    }





    // Delete Contact
    const delContact = id =>{
        dispatch({type:DELETE_CONTACT,payload:id});
    }
    // Set Currrent
    const setCurrent = contact=>{
        dispatch({type:SET_CURRENT,payload:contact});
    }
    // Clear Current
    const clearCurrent = () => {
        dispatch({type:CLEAR_CURRENT});
    }
   
    // Filter Contacts
    const filterContacts = text =>{
        dispatch({type:FILTER_CONTACTS,payload:text});
    }
    // Clear Filter
    const clearFilter = ()=> {
        dispatch({type:CLEAR_FILTER});
    }

    return (
        <ContactContext.Provider
        value={{
            contacts : state.contacts,
            current:state.current,
            filtered:state.filtered,
            addContact,
            delContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )


}

export default ContactState;