import React, { Fragment } from "react";
import Navbar from "./Component/Layout/Navbar";
import Alert from "./Component/Layout/Alert";
import Useritem from "./Component/Users/Useritem";
import About from "./Component/pages/About";
import HomeP from "./Component/pages/HomeP";
import NotFound from "./Component/pages/NotFound";
import User from "./Component/Users/User";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar></Navbar>
            <div className="container">
              <Alert />
              <Switch>
                <Route
                  exact
                  path="/"
                  component={HomeP}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route  component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
