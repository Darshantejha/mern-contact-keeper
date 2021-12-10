import React,{useContext, useState,useEffect} from "react";
import AlertContext from "../context/alert/alertContext";
import AuthContext from "../context/auth/authContext";

const Register = props =>{

    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        password2:""
    });
    const {name,email,password,password2} = user;
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;
    const authContext = useContext(AuthContext);
    const {register,error,clearError,isAuthenticated} = authContext;
    useEffect(()=>{
        if(isAuthenticated===true){
            props.history.push("/");
        }
        if(error==="User already exists"){
            setAlert(error,"danger");
            clearError();
        }

    },[error,props.history,isAuthenticated,setAlert,clearError])

    const onChange = e =>{setUser({...user,[e.target.name]:e.target.value})};
    const onSubmit = e =>{
        e.preventDefault();
        if(name===""||email===""||password===""){
            setAlert("Please enter all the fields","danger");
        }
        else if(password!==password2){
            setAlert("Passwords are not matched","danger");
        }
        else{
            register(user);
        }
    }


    return (
        <div className = "form-container">
        <h1>
            Account <span className = "text-primary" >Register</span>
        </h1>
        <form onSubmit={onSubmit}>
            <div className = "form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name = "name" value={name} placeholder="Name" onChange={onChange} autoComplete="off" />
            </div>
            <div className = "form-group">
                <label htmlFor="email">Name</label>
                <input type="email" name = "email" value={email} placeholder="Email" onChange={onChange} autoComplete="off" />
            </div>
            <div className = "form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name = "password" value={password} placeholder="Password" onChange={onChange} />
            </div>
            <div className = "form-group">
                <label htmlFor="password2">Password</label>
                <input type="password" name = "password2" value={password2} placeholder="Confirm Password" onChange={onChange} />
            </div>
            <input
                type="submit"
                value="Register"
                className="btn btn-primary btn-block"
            />
        </form>

        </div>
    )

}
export default Register;