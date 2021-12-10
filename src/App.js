import React, { Fragment } from "react";
import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import AuthState from "./components/context/auth/AuthState";
import ContactState from "./components/context/contact/ContactState";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./components/context/alert/AlertState";
import Alert from "./components/alert/Alert.js";
import PrivateRoute from "./components/routing/PrivateRoute";
function App() {
  return (
    <div className="App">
      <AuthState>
        <ContactState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar/>
                <Alert/>
                <div className = "container">
                    <Switch>
                      <PrivateRoute exact path ="/" component ={Home} />
                      <Route exact path ="/about" component = {About} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" component={Login} />
                    </Switch> 
                </div>
              </Fragment>
            </Router>
            </AlertState>
        </ContactState>
      </AuthState>
    </div>
  );
}

export default App;
