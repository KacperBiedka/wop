import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase.js";
import classes from "./Navbar.module.sass";
import AddWorkout from "../AddWorkout/AddWorkout";
import AddExercise from "../AddExercise/AddExercise";

class Navbar extends Component {
  state = {
    displayAddWorkoutModal: null,
    showEditExerciseModal: false,
    displayAddExerciseModal: null,
    currentLocation: null,
    workoutNumber: null,
    exercises: []
  };

  componentWillMount = () => {
    this.setState({
      currentLocation: this.props.location,
      exercises: this.props.exercises,
      workoutNumber: this.props.workoutNumber
    });
    console.log(this.props.location);
    console.log(this.props.exercises);
  };

  logout = () => {
    firebase.auth().signOut();
    window.location.href = "..";
  };

  toggleAddWorkoutModal = () => {
    if (this.state.displayAddWorkoutModal) {
      this.setState({
        displayAddWorkoutModal: null
      });
    } else {
      this.setState({
        displayAddWorkoutModal: (
          <AddWorkout closeModal={this.closeAddWorkoutModal} />
        )
      });
    }
  };

  closeAddWorkoutModal = () => {
    this.setState({
      displayAddWorkoutModal: null
    });
  };

  closeAddExerciseModal = () => {
    this.setState({
      displayAddExerciseModal: null
    });
  };

  toggleAddExerciseModal = () => {
    if (this.state.displayAddExerciseModal) {
      this.setState({
        displayAddExerciseModal: null
      });
    } else {
      this.setState({
        displayAddExerciseModal: (
          <AddExercise
            workoutNumber={this.props.workoutNumber}
            exercisesCopy={this.props.exercises}
            closeModal={this.closeAddExerciseModal}
          />
        )
      });
    }
  };

  goBackToWorkouts = () => {
    window.location.href = "../workouts";
  };

  render() {
    if (this.props.location === "workouts") {
      return (
        <div className={classes.componentDiv}>
          <nav className={classes.navBar}>
            <i
              onClick={this.toggleAddWorkoutModal}
              className={"material-icons " + classes.workoutsAddIcon}
            >
              add
            </i>
            <h1
              onClick={this.logout}
              className={classes.sectionHeader + " " + classes.workoutsHeader}
            >
              Workouts
            </h1>
            <i
              onClick={this.props.toggleSidenav}
              className={"material-icons " + classes.menuIcon}
            >
              menu
            </i>
          </nav>
          {this.state.displayAddWorkoutModal}
        </div>
      );
    } else if (this.props.location === "exercises") {
      return (
        <div className={classes.componentDiv}>
          <nav className={classes.navBar}>
            <Link to="/workouts">
              <i className={"material-icons " + classes.chevronIcon}>
                chevron_left
              </i>
            </Link>
            <i
              onClick={this.toggleAddExerciseModal}
              className={"material-icons " + classes.exercisesAddIcon}
            >
              add
            </i>
            <i
              onClick={this.props.toggleTimer}
              className={"material-icons " + classes.timerIcon}
            >
              timer
            </i>
            <h1
              className={classes.sectionHeader + " " + classes.exercisesHeader}
            >
              Exercises
            </h1>
            <i
              onClick={this.props.toggleSidenav}
              className={"material-icons " + classes.menuIcon}
            >
              menu
            </i>
          </nav>
          {/* <AddExercise
            workoutNumber={this.state.workoutNumber}
            exercisesCopy={this.props.exercises}
            visible={this.state.showAddExerciseModal}
            closeModal={this.closeAddExerciseModal}
          /> */}
          {this.state.displayAddExerciseModal}
        </div>
      );
    }
  }
}

export default Navbar;
