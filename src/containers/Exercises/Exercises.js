import React, { Component } from "react";
import { connect } from "react-redux";

import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import NavBar from "../../components/Navbar/Navbar";
import Timer from "../../components/Timer/Timer";

import classes from "./Exercises.module.sass";

class Exercises extends Component {
  state = {
    exercises: [],
    number: null,
    showTimer: false,
    duration: 0,
    timerMessage: "0:00"
  };

  componentWillMount() {
    console.log(this.props.exercises);
    console.log(this.state.exercises);
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
      this.setState({
        exercises: localStorageExercises,
        number: localStorageNumber
      });
    }
    console.log(this.state.exercises);
  }

  componentDidMount = () => {
    console.log(this.state);
    this.startTimer();
  };

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

  toggleTimer = () => {
    console.log("----- Displayed Timer ;---D -----");
    this.setState({
      showTimer: true,
      duration: 0
    });
  };

  closeTimer = () => {
    console.log("----- Timer Closed XD -----");
    this.setState({
      showTimer: false,
      duration: 0
    });
  };

  startTimer = () => {
    setInterval(
      function() {
        if (this.state.showTimer) {
          console.log(this.state.duration);
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
          console.log(this.state.duration);
        }
      }.bind(this),
      1000
    );
  };

  render() {
    return (
      <div className={classes.mainDiv}>
        <NavBar
          workoutNumber={this.state.number}
          location="exercises"
          exercises={this.state.exercises}
        />
        <div className={classes.exerciseCardsDiv}>
          {console.log(this.props.exercises)}
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
                closeTimer={this.closeTimer}
              />
            );
          })}
        </div>
        <Timer
          visible={this.state.showTimer}
          timerMessage={this.state.timerMessage}
        />
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
