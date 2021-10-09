import './App.css';
import React,{useEffect,Fragment} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Search from './components/layout/Search';
import Logs from './components/logs/Logs';
import AddBtn from './components/layout/AddBtn';
import AddLogModal from './components/logs/AddLogModal';
import EditLogModal from './components/logs/EditLogModal';
import AddTechModal from './components/techs/AddTechModal';
import TechListModal  from './components/techs/TechListModal';
import {Provider} from 'react-redux';
import store from './store';
function App() {
  useEffect(() => {
    //intialize materialize
    M.AutoInit();
  })
  return (
    <Provider store={store}>
    <Fragment >
     <Search></Search>
      <div className="container">
        <AddBtn/>
        <AddLogModal/>
        <EditLogModal/>
        <AddTechModal></AddTechModal>
        <TechListModal/>
        <Logs></Logs>
      </div>
    </Fragment>
    </Provider>
  );
}

export default App;
