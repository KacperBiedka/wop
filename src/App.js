import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'firebase/firestore';
import './App.css';

import Login from './components/Auth/Login/Login';
import Workouts from './components/Workouts/Workouts';
import Signup from './components/Auth/Signup/Signup';
import Exercises from './components/Exercises/Exercises';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/Login' exact component={Login} />
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
