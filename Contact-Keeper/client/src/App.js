import "./App.css";
import { Navbar } from "./components/layout/Navbar";
import React, { Fragment } from "react";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import ContactState from './context/contact/ContactReducer';
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import AlertState from "./context/alert/AlertState";
import  Alerts  from "./components/layout/Alerts";
import Test  from "./components/layout/Test";
import setAuthToken from "./util/setAuthToken";
import { PrivateRoute } from "./components/routing/PrivateRoute";


if(localStorage.token) {
  setAuthToken(localStorage.token)
}
const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts></Alerts>
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/Register" component={Register} />
                  <Route exact path="/Login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
