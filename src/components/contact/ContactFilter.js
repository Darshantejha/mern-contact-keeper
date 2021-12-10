import React , {useContext,useState,useEffect} from "react";
import ContactContext from "../context/contact/contactContext";

const ContactFilter = ()=> {
    const [state,setState] = useState("");
    const contactContext = useContext(ContactContext);
    const {filterContacts,clearFilter} = contactContext;
    useEffect(()=>{
        if(state===""){
            clearFilter();
        }
        else{
            filterContacts(state);
        }
        // eslint-disable-next-line
    },[state]);


    const onChange =  e => {
        setState(e.target.value);
    };

    return (
        <form>
            <input name = "searchContact" style={{width:"100%",padding:"5px"}} placeholder = "Search" value = {state} onChange = {onChange}/>
        </form>
    )
}
export default ContactFilter;