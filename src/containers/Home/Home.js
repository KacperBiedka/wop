import React, { Component } from "react";
import classes from "./Home.module.sass";
import firebase from "../../firebase";

import Login from "../Login/Login";
import Signup from "../Signup/Signup";

class Home extends Component {
  state = {
    homeDivClass: "",
    displayedContent: null,
    choiceDivClass: ""
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.location.href = "workouts";
      } else {
        console.log("not logged in");
      }
    });
  };

  switchToLoginDiv = () => {
    this.setState({
      homeDivClass: " animated fadeOutUp"
    });
    setTimeout(() => {
      this.setState({
        displayedContent: <Login switchToSignUpDiv={this.switchToSignUpDiv} />
      });
    }, 1000);
  };

  moveFromSignUpToLoginDiv = () => {
    this.setState({
      displayedContent: <Login switchToSignUpDiv={this.switchToSignUpDiv} />
    });
  };

  switchToSignUpDiv = () => {
    this.setState({
      displayedContent: (
        <Signup switchToLoginDiv={this.moveFromSignUpToLoginDiv} />
      )
    });
  };

  render() {
    if (this.state.displayedContent) {
      return (
        <div className={classes.mainDiv}>{this.state.displayedContent}</div>
      );
    } else {
      return (
        <div className={classes.mainDiv}>
          <div className={classes.contentDiv + this.state.homeDivClass}>
            <h1 className={classes.mainHeader}>Workout Planner</h1>
            <h4 className={classes.describtionHeader}>
              Add your own workout, check your progress and use the timers
              between sets
            </h4>
            <button
              onClick={this.switchToLoginDiv}
              className={
                classes.getStartedButton + " " + classes.buttonAnimation
              }
            >
              <span className={classes.getStartedSpan}>Get Started</span>
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Home;
