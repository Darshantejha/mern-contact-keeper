import { REMOVE_ALERT, SET_ALERT } from "../types";

const reducerFunc = (state,action)=>{
    switch(action.type){
        case SET_ALERT:
            return(
                [...state,action.payload]
            );
        case REMOVE_ALERT:
            return(
                state.filter(alert=>action.payload!==alert.id)
            );
        default:
            return state;
    }
}
export default reducerFunc;
