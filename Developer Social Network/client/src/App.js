import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import React, {Fragment} from 'react';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);
function App() {
  return (
    <BrowserRouter>
    <Fragment>
      <Navbar></Navbar>
      <Landing></Landing>
    </Fragment>
    </BrowserRouter>  
  )
}

export default App;
