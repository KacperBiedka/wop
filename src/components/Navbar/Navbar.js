import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase.js";
import classes from "./Navbar.module.sass";
import AddWorkout from "../AddWorkout/AddWorkout";
import AddExercise from "../AddExercise/AddExercise";

class Navbar extends Component {
  state = {
    showAddWorkoutModal: false,
    showEditExerciseModal: false,
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
    this.setState({
      showAddWorkoutModal: !this.state.showAddWorkoutModal
    });
    console.log(this.state.showAddWorkoutModal);
  };

  closeAddExerciseModal = () => {
    this.setState({
      showAddExerciseModal: false
    });
  };

  toggleAddExerciseModal = () => {
    this.setState({
      showAddExerciseModal: !this.state.showAddExerciseModal
    });
    console.log(this.state.showAddExerciseModal);
  };

  closeAddWorkoutModal = () => {
    this.setState({
      showAddWorkoutModal: false
    });
    console.log(this.state.showAddWorkoutModal);
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
          <AddWorkout
            visible={this.state.showAddWorkoutModal}
            closeModal={this.closeAddWorkoutModal}
          />
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
            <i className={"material-icons " + classes.timerIcon}>timer</i>
            <h1
              className={classes.sectionHeader + " " + classes.exercisesHeader}
            >
              Exercises
            </h1>
            <i className={"material-icons " + classes.menuIcon}>menu</i>
          </nav>
          <AddExercise
            workoutNumber={this.state.workoutNumber}
            exercisesCopy={this.props.exercises}
            visible={this.state.showAddExerciseModal}
            closeModal={this.closeAddExerciseModal}
          />
        </div>
      );
    }
  }
}

export default Navbar;
