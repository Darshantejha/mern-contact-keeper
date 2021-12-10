import React,{useContext, useEffect, useState} from "react";
import AlertContext from "../context/alert/alertContext"; 
import AuthContext from "../context/auth/authContext";

const Login = props =>{

    const [user,setUser] = useState({
        email:"",
        password:""
    });
    const {email,password} = user;
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const {setAlert} = alertContext;
    const {login,error,isAuthenticated,clearError} = authContext;
    useEffect(()=>{
        if(isAuthenticated===true){
            props.history.push("/");
        }
        if(error==="Invalid Credentials"){
            setAlert(error,"danger");
            clearError();
        }
        // eslint-disable-next-line
    },[error,props.history,isAuthenticated]);
    const onChange = e =>{setUser({...user,[e.target.name]:e.target.value})};
    const onSubmit = e =>{
        e.preventDefault();
        if(email===""||password===""){
            setAlert("Please enter all the fields","danger");
        }
        else{
            login(user);
        }
    }


    return (
        <div className = "form-container">
        <h1>
            Account <span className = "text-primary" >Login</span>
        </h1>
        <form onSubmit={onSubmit}>
            <div className = "form-group">
                <label htmlFor="email">Name</label>
                <input type="email" name = "email" value={email} placeholder="Email" onChange={onChange} />
            </div>
            <div className = "form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name = "password" value={password} placeholder="Password" onChange={onChange} />
            </div>
            <input
                type="submit"
                value="Login"
                className="btn btn-primary btn-block"
            />
        </form>

        </div>
    )

}
export default Login;