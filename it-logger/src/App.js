import './App.css';
import React,{useEffect,Fragment} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Search from './components/layout/Search';
import Logs from './components/logs/Logs';

function App() {
  useEffect(() => {
    //intialize materialize
    M.AutoInit();
  })
  return (
    <Fragment >
     <Search></Search>
      <div className="container">
        <Logs></Logs>
      </div>
    </Fragment>
  
  );
}

export default App;
