import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "firebase/firestore";
import "./App.sass";

import Login from "./containers/Login/Login";
import Workouts from "./containers/Workouts/Workouts";
import Signup from "./containers/Signup/Signup";
import Exercises from "./containers/Exercises/Exercises";
import Home from "./containers/Home/Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Login" exact component={Home} />
          <Route path="/workouts" exact component={Workouts} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/exercises" exact component={Exercises} />
        </Switch>
        {/* <button className="testBtn" onClick={testFirebase}>Test Firebase</button> */}
      </div>
    );
  }
}

export default App;
