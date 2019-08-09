import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import SearchDirectory from './Component/SearchDirectory';
import Employee from './Component/Employee';

function App() {
  return (
      <Router basename={"/MyReactApp"}>
      <div>
        
        <Switch>
          <Route exact path = "/" component = {SearchDirectory} />
          <Route path = "/employee/:id" component = {Employee} />
        </Switch>
      </div>
      </Router>
    
  );
}

export default App;
