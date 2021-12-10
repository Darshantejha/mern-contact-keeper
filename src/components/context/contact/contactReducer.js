import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from "../types";
const reducerfunc =  (state,action)=>{
    switch(action.type){
        case ADD_CONTACT:
            return{
                ...state,
                contacts:[...state.contacts,action.payload]
            };
        case GET_CONTACTS:
            return{
                ...state,
                contacts:action.payload
            }
        case DELETE_CONTACT:
            return{
                ...state,
                contacts:state.contacts.filter(contact=> contact.id!==action.payload)
            };
        case SET_CURRENT:
            return{
                ...state,
                current:action.payload
            };
        case CLEAR_CURRENT:
            return{
                ...state,
                current:null
            };
        case CLEAR_CONTACTS:
            return{
                ...state,
                contacts:[]
                };
        case UPDATE_CONTACT:
            return{
                ...state,
                contacts: state.contacts.map(contact=>{
                    return contact._id!==action.payload._id?contact:action.payload})
            };
        case FILTER_CONTACTS:
            return{
                ...state,
                filtered: state.contacts.filter(contact=>{
                    const regex = new RegExp(`${action.payload}`,"gi"); // gi => global case insensitive 
                    return contact.name.match(regex)||contact.email.match(regex);
                }) 
            };
        case CLEAR_FILTER:
            return{
                ...state,
                filtered: null
            }
        case CONTACT_ERROR:
            return{
                ...state,
                error:action.payload
            }
        default:
            return state ;
        
    }
    
}

export default reducerfunc;