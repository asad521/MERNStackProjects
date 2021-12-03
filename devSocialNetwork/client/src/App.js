import React, {Fragment, useEffect} from 'react';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Alert from './Components/Layout/Alert';
import {loadUser} from './actions/auth';
import {Dashboard} from './Components/Dashboard/Dashboard';
import PrivateRoute from './Components/Routing/PrivateRoute';
import CreateProfile from './Components/Profile/CreateProfile';
import EditProfile from './Components/Profile/EditProfile';
import {BrowserRouter as Router, Route, Switch,Routes} from 'react-router-dom';
//Redux
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './util/setAuthToken';
//when open app,check is there any token in ls
  if(localStorage.token) {
      
      setAuthToken(localStorage.token);
  }
function App() {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // },  []);
  return (
    <Provider store={store}>
    <Router>
    <Fragment>
    <Navbar></Navbar>
 
    <Routes>
   
      <Route exact path ="/" element={<Landing></Landing>}  />
      </Routes>
      <section className="container">
        <Alert/>
        <Routes>
          <Route exact path="/Register" element={<Register/>} />
          <Route exact path="/Login" element={<Login/>} />
          <Route exact path="/Dashboard" element={<PrivateRoute/>} />
          <Route exact path="/createProfile" element={<CreateProfile/>} />
          <Route exact path="/edit-profile" element={<EditProfile/>} />
        </Routes>
      </section>
    </Fragment>
    </Router>
    </Provider>
  )
}

export default App;

