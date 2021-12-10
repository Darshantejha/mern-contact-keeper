import React,{useContext} from "react";
import ContactContext from "../context/contact/contactContext";

const ContactItem = ({contact})=>{

    const{id,name,email,phonenumber,type} = contact;
    const contactContext = useContext(ContactContext);
    const {delContact,setCurrent}  = contactContext;
    const onDelete = ()=> {
        delContact(id);
    }

    return (
        <div className = "card bg-light">
            <h3 className = "text-primary text-left">
                {name}{' '}
                <span
                style = {{float: "right"}}
                className={
                    "badge " + (type==="professional"?"badge-success":"badge-primary")
                }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className = "list">
                {email&&
                <li>
                   <i className = "fas fa-envelope-open"/> {email}
                </li>
                    }
                {phonenumber&&
                <li>
                    <i className="fas fas-phone"/> {phonenumber}
                </li>}
            </ul>
            <p>
                <button className = "btn btn-dark btn-sm" onClick= {()=> setCurrent(contact) }>Edit</button>
                <button className = "btn btn-danger btn-sm" onClick = {onDelete}>Delete</button>
            </p>

        </div>
    )

}
export default ContactItem;