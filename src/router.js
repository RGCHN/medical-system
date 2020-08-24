import React from 'react';
// eslint-disable-next-line
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import DataManager from "./page/DataManager";
import PatientDetail from "./page/DataManager/components/PatientDetail";
import ModelManager from "./page/ModelManager";
import Analysis from "./page/Analysis";
import ProfileManager from "./page/ProfileManager";
import UserEdit from "./page/ProfileManager/components/userEdit";
import Home from "./page/Home";
import Login from "./page/Login";
import App from "./App";

export default class BasicRouter extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
 
 render() {
   return (
     <Router>
       <Route path='/' component={App} />
       <Route path='/home' component={Home} />
       <Route exact path="/dataManager" component={DataManager}/>
       <Route path="/patientEdit/:id" component={PatientDetail}/>
       <Route path="/modelManager" component={ModelManager}/>
       <Route path="/analysis" component={Analysis}/>
       <Route path="/profile" component={ProfileManager}/>
       <Route path='/userEdit/:id' component={UserEdit} />
       <Route exact path='/login' component={Login} />
       
      {/* <Redirect to='/home'/>*/}
     </Router>
   );
 }
}
