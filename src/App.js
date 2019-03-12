import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from './firebase.js';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import './App.css';

import Login from './components/Auth/Login/Login';
import Workouts from './components/Workouts/Workouts';
import Signup from './components/Auth/Signup/Signup';
import Exercises from './components/Exercises/Exercises';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/workouts' exact component={Workouts} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/exercises' exact component={Exercises} />
      </Switch>
      {/* <button className="testBtn" onClick={testFirebase}>Test Firebase</button> */}
      </div>
    );
  }
}

export default App;
