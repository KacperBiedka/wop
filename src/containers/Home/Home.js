import React, { Component } from "react";
import classes from "./Home.module.sass";

import Login from "../Login/Login";

class Home extends Component {
  state = {
    homeDivClass: "",
    displayedContent: null,
    choiceDivClass: ""
  };

  switchToLoginDiv = () => {
    this.setState({
      homeDivClass: " animated fadeOutUp"
    });
    setTimeout(() => {
      this.setState({
        displayedContent: (
          <Login
            goToSignUp={this.switchToSignUp}
            class={this.state.loginDivClass}
          />
        )
      });
    }, 1000);
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
