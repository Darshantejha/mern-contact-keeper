import React,{ useContext ,Fragment, useEffect } from "react";
import {Link} from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import ContactContext from "../context/contact/contactContext";

const Navbar = ({title,icon})=>{

    const authContext = useContext(AuthContext);
    const contactContext=useContext(ContactContext);
    const {isAuthenticated,logout,user,loadUser} = authContext;
    const {clearContacts} = contactContext;
    useEffect(()=>{
        loadUser(); // as we are setting the isAuthenticated as null and loading as true so when we get "/" page initially (!isAuthenticated&&!loading) will be false we get the home page which is wrong because we havent logged in yet so whenever we hit the "/" and when the page loads loadUser() runs at starting as we are not logged in definetly it redirects to login page and afterlogging in we get home page suppose if we refresh then also no problem even though the initial values of isAuthenticated and loading are null and true as soon as the page loads loadUser() runs and as we were logged in and got the token in the localstorage user gets loaded and isAuthenticated and loading values becomes true and false and thus dolving the problem of refreshing and redirecting
        // eslint-disable-next-line
    },[])
    const onLogout = ()=>{
        logout();
        clearContacts();
    }
    const authLinks = (
        <Fragment>
            <li>Hello {user&&user.name} </li>
            <li><a href="#?" onClick={onLogout} > Logout </a></li>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>

        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
        <h1>
            <i className={icon} /> {title}
        </h1>
        <ul>
           {isAuthenticated?authLinks:guestLinks}
        </ul>
        </div>
    );

}
Navbar.defaultProps = {
    title:"Contact Keeper",
    icon:"fa-solid fa-book-user"
}
export default Navbar;