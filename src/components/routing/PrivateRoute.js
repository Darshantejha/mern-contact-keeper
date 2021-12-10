import React ,{ useContext } from "react";
import AuthContext from "../context/auth/authContext";
import {Route,Redirect} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;
    console.log(!null&&true);
    return (
      <Route
        {...rest}
        render={props =>
          !isAuthenticated ? (
            <Redirect to='/login' />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  };
  
  export default PrivateRoute;

// try to understand the destructuring carefully in the props and also in the Route 

// const PrivateRoute = ({component:Component,...rest})=>{
//     // const object = {name:"darshan",place:"hyd",country:"India"};
//     // const {name,...rest} = object;
//     // console.log(rest); we get {place:"hyd",country:"India"} 
//     // so similarly all the extra attributes like path , exact etc will be stored in the form of JS object by the name of rest  
//     // as component={Component} which is component={Component:Component} is the attribute so while destructuring we are writing {component:Component,...rest}
//     //  therefore by clear observation and analysis Component get assigned to Component (Home/About etc etc) 
//     const authContext = useContext(AuthContext);
//     const {isAuthenticated,loading} = authContext;
//     return (
//         <Route {...rest} render = {props=>{
//             (!isAuthenticated&&!loading)?(<Redirect to="/login"/>):(<Component {...props} />)  
//         }} />      
//     );
// }
// export default PrivateRoute;