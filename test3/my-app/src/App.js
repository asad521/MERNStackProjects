import logo from "./logo.svg";
import "./App.css";
import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Layout/Landing";
function App() {
  return (
    <Router>
      <Fragment>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Landing />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
