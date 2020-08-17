import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DataManager from "./page/DataManager";
import ModelManager from "./page/ModelManager";
import Analysis from "./page/Analysis";
import ProfileManager from "./page/ProfileManager";
import Home from "./page/Home";
import App from "./App";

export default class BasicRouter extends React.Component{
  
 render() {
   return (
     <Router>
       <Route path='/' component={App} />
       <Route path='/home' component={Home} />
       <Route exact path="/DataManager" component={DataManager}/>
       <Route exact path="/ModelManager" component={ModelManager}/>
       <Route path="/Analysis" component={Analysis}/>
       <Route path="/ProfileManager" component={ProfileManager}/>
     </Router>
   );
 }
}
