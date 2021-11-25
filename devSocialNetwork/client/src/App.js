import React, {Fragment} from 'react';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import {BrowserRouter as Router, Route, Switch,Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Fragment>
    <Navbar></Navbar>
 
    <Routes>
   
      <Route exact path ="/" element={<Landing></Landing>}  />
      </Routes>
      <section className="container">
        <Routes>
          <Route exact path="/Register" element={<Register/>} />
          <Route exact path="/Login" element={<Login/>} />
        </Routes>
      </section>
    </Fragment>
    </Router>
  )
}

export default App;

