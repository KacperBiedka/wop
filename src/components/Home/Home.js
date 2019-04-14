import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import classes from "./Home.module.sass";
import Login from "../Auth/Login/Login";

class Home extends Component {
  state = {
    homeDivClass: "",
    displayedContent: null,
    choiceDivClass: ""
  };

  render() {
    const switchToChoiceDiv = () => {
      this.setState({
        homeDivClass: " animated fadeOutUp"
      });
      setTimeout(() => {
        this.setState({
          displayedContent: (
            <div className={classes.choiceDiv + this.state.choiceDivClass}>
              <h1 className={classes.choiceHeader + " animated fadeInUp"}>
                Welcome to Workout Planner
              </h1>
              <button
                onClick={switchToLoginDiv}
                className={classes.choiceButton + " animated fadeInUp"}
              >
                Login
              </button>
              <p className={classes.choiceText + " animated fadeInUp"}>or</p>
              <button className={classes.choiceButton + " animated fadeInUp"}>
                Sign Up
              </button>
            </div>
          )
        });
      }, 1000);
    };

    const switchToLoginDiv = () => {
      this.setState({
        displayedContent: (
          <div className={classes.choiceDiv + this.state.choiceDivClass}>
            <h1 className={classes.choiceHeader + " animated zoomOut"}>
              Welcome to Workout Planner
            </h1>
            <button
              onClick={switchToLoginDiv}
              className={classes.choiceButton + " animated zoomOut"}
            >
              Login
            </button>
            <p className={classes.choiceText + " animated zoomOut"}>or</p>
            <button className={classes.choiceButton + " animated zoomOut"}>
              Sign Up
            </button>
          </div>
        )
      });
      setTimeout(() => {
        this.setState({
          displayedContent: <Login />
        });
      }, 1000);
    };

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
              onClick={switchToChoiceDiv}
              className={classes.getStartedButton}
            >
              Get Started
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Home;
