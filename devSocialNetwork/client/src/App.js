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
import PrivateRoutePost from './Components/Routing/PrivateRoutePost';
import CreateProfile from './Components/Profile/CreateProfile';
import EditProfile from './Components/Profile/EditProfile';
import AddExp from './Components/Profile/AddExp';
import AddEdu from './Components/Profile/AddEdu';
import Profiles from './Components/Profiles/Profiles';
import Profile from './Components/Profile2/Profile';
import Post from './Components/Posts/Post';
import PostDiscussion from './Components/PostDiscussion/PostDiscussion';
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
  useEffect(() => {
    store.dispatch(loadUser());
  },  []);
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
          <Route exact path="/profiles" element={<Profiles/>} />
          <Route exact path="/profile/:id"  element={<Profile/>} />
          
          <Route exact path="/Dashboard" element={<PrivateRoute/>} />
          <Route exact path="/posts" element={<PrivateRoutePost/>} />
          <Route exact path="/createProfile" element={<CreateProfile/>} />
          <Route exact path="/edit-profile" element={<EditProfile/>} />
          <Route exact path="/add-education" element={<AddEdu/>} />
          <Route exact path="/add-experience" element={<AddExp/>} />
          <Route exact path="/posts/:id"  element={<PostDiscussion/>} />

        </Routes>
      </section>
    </Fragment>
    </Router>
    </Provider>
  )
}

export default App;

