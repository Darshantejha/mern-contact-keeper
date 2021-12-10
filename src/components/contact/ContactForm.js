import React,{useContext, useState, useEffect} from "react";
import ContactContext from "../context/contact/contactContext";

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const{addContact,current,clearCurrent,updateContact} = contactContext;  
    const [contact,setContact] = useState({
        name:"",
        email:"",
        phonenumber:"",
        type: "personal" //default
    });

    const {name,email,phonenumber,type} = contact;
    useEffect(()=>{
        if(current!== null){
            setContact(current);
        }else{
            setContact(
                {
                    name:"",
                    email:"",
                    phonenumber:"",
                    type: "personal" //default
                }
            )
        }
    },[current]);
    const onChange = e => setContact({...contact,[e.target.name]:e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        if(current!==null){
            updateContact(contact);
        }else{
            addContact(contact);
        }
        // setContact({
        //     name:"",
        //     email:"",
        //     phone:"",
        //     type:"personal" //default

        // });
        clearCurrent(); // as soon as we call this func current becomes null and immediately useEffect runs as current value has changed and thus automatically setContact to empty form

    }
    return (<form onSubmit = {onSubmit}>
    <h2 className = "text-primary">{current?"Edit Contact":"Add Contact"}</h2>
    <input
        type = "text"
        placeholder = "Name"
        name = "name"
        value = {name}
        onChange = {onChange}
    />
    <input
        type = "text"
        placeholder = "Email"
        name = "email"
        value = {email}
        onChange = {onChange}
    />
    <input
        type = "text"
        placeholder = "Phone"
        name = "phonenumber"
        value = {phonenumber}
        onChange = {onChange}
    />
    <input
        type = "radio"
        name = "type"
        value = "personal"
        checked = {type ==="personal"}
        onChange = {onChange}
    /> Personal{" "}
    <input
        type = "radio"
        name = "type"
        value = "professional"
        checked ={type ==="professional"}
        onChange = {onChange}
    /> Professional{" "}
    <div>
        <input type = "submit" value = {current?"Update Contact":"Add Contact"} className = "btn btn-primary btn-block"   />
    </div>
    <div>
        {current&&<input type = "button" value = "Clear Form" className = "btn btn-light btn-block" onClick = {()=>clearCurrent()}  />}
    </div>


    </form>)
}
export default ContactForm;