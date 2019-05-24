import React, { Component } from "react";
import { connect } from "react-redux";

import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import NavBar from "../../components/Navbar/Navbar";
import Timer from "../../components/Timer/Timer";
import Sidenav from "../../components/Sidenav/Sidenav";

import classes from "./Exercises.module.sass";

class Exercises extends Component {
  state = {
    exercises: [],
    number: null,
    showTimer: false,
    duration: 0,
    timerMessage: "0:00",
    sidenavStyles: {
      width: "0px",
      borderLeft: "none",
      paddingLeft: "0px"
    },
    sidenavVisible: false,
    timerClass: "animated fadeInUp faster ",
    displayTimer: false
  };

  componentDidMount() {
    console.log(this.props.exercises);
    console.log(this.state.exercises);
    this.startTimer();
    if (this.props.exercises) {
      window.localStorage.clear();
      window.localStorage.setItem(
        "exercises",
        JSON.stringify(this.props.exercises)
      );
      window.localStorage.setItem("number", JSON.stringify(this.props.number));
      console.log(window.localStorage.getItem("exercises"));
      console.log(window.localStorage.getItem("number"));
      this.setState({
        exercises: this.props.exercises,
        number: this.props.number
      });
    } else {
      let localStorageExercises = JSON.parse(
        window.localStorage.getItem("exercises")
      );
      let localStorageNumber = parseInt(window.localStorage.getItem("number"));
      console.log(localStorageExercises);
      console.log(localStorageNumber);
      this.setState({
        exercises: localStorageExercises,
        number: localStorageNumber
      });
    }
    console.log(this.state.exercises);
  }

  logData = () => {
    console.log(this.state.exercises);
  };

  toggleEditModal = number => {
    this.setState({
      clickedExerciseNumber: number,
      showEditModal: !this.state.showEditModal
    });
    console.log(this.state.showEditModal);
  };

  startTimer = () => {
    setInterval(() => {
      if (this.state.displayTimer) {
        let minutes = parseInt(this.state.duration / 60);
        let seconds = this.state.duration - minutes * 60;
        if (seconds >= 10) {
          this.setState({
            timerMessage: minutes + ":" + seconds
          });
        } else if (seconds < 10) {
          this.setState({
            timerMessage: minutes + ":0" + seconds
          });
        }
        this.setState({
          duration: this.state.duration + 1
        });
        if (this.state.duration === 30) {
          console.log("loop finished");
        }
      } else {
        this.setState({
          duration: 0
        });
      }
    }, 1000);
  };

  toggleSidenav = () => {
    if (this.state.sidenavVisible) {
      this.setState({
        sidenavStyles: {
          sideNavDiv: {
            paddingLeft: "0px",
            width: "0px",
            borderLeft: "none"
          },
          iconDiv: {
            visibility: "hidden",
            opacity: "0"
          }
        },
        sidenavVisible: false
      });
    } else {
      this.setState({
        sidenavStyles: {
          sideNavDiv: {
            paddingLeft: "30px",
            width: "200px",
            borderLeft: "solid 1px #707070"
          },
          iconDiv: {
            transitionDelay: "0.3s",
            visibility: "visible",
            opacity: "1"
          }
        },
        sidenavVisible: true
      });
    }
  };

  toggleTimer = name => {
    if (name === "closed") {
      this.setState({
        timerClass: "animated slideOutDown faster "
      });
      setTimeout(() => {
        this.setState({
          duration: 1,
          displayTimer: false
        });
      }, 500);
    } else if (name === "active") {
      this.setState({
        timerClass: "animated slideInUp faster ",
        displayTimer: true,
        duration: 1
      });
    }
  };

  toggleTimerFromNavbar = () => {
    if (this.state.displayTimer) {
      this.setState({
        timerClass: "animated slideOutDown faster "
      });
      setTimeout(() => {
        this.setState({
          duration: 1,
          displayTimer: false
        });
      }, 500);
    } else {
      this.setState({
        timerClass: "animated slideInUp faster ",
        displayTimer: true,
        duration: 1
      });
    }
  };

  render() {
    return (
      <div style={this.state.addedMargin} className={classes.mainDiv}>
        <NavBar
          toggleSidenav={this.toggleSidenav}
          location="exercises"
          exercises={this.state.exercises}
          toggleTimer={this.toggleTimerFromNavbar}
          workoutNumber={this.state.number}
        />
        <Sidenav styles={this.state.sidenavStyles} />
        <div className={classes.exerciseCardsDiv}>
          {this.state.exercises.map(ex => {
            return (
              <ExerciseCard
                key={ex.exercise.exerciseName + ex.exercise.exerciseNumber}
                exerciseName={ex.exercise.exerciseName}
                exercisesState={this.state.exercises}
                exerciseNumber={ex.exercise.exerciseNumber}
                sets={ex.exercise.sets}
                reps={ex.exercise.reps}
                weight={ex.exercise.weight}
                workoutNumber={this.state.number}
                toggleTimer={this.toggleTimer}
              />
            );
          })}
          {this.state.displayTimer ? (
            <div className={this.state.timerClass + classes.timerContainer}>
              <Timer
                timerClass={this.state.timerClass}
                timerMessage={this.state.timerMessage}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    exercises: state.exercises,
    number: state.number
  };
};

export default connect(mapStateToProps)(Exercises);
