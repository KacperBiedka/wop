import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../firebase";
import classes from "./AddExercise.module.sass";
import * as actionTypes from "../../store/actions/actionTypes";

class AddExercise extends Component {
  state = {
    exercisesState: [],
    workoutNumber: null,
    exerciseNumber: null,
    exerciseName: "",
    exerciseNameError: null,
    exerciseNameClass: classes.inputField,
    loader: null,
    sets: null,
    setsError: null,
    setsClass: classes.inputField,
    reps: null,
    repsError: null,
    repsClass: classes.inputField,
    weight: null,
    weightError: null,
    weightClass: classes.inputField,
    class: ""
  };

  componentDidMount = () => {
    this.setState({
      exercisesState: this.props.exercisesCopy,
      closeModal: this.props.closeModal,
      workoutNumber: this.props.workoutNumber
    });
    console.log(this.props.exercisesCopy);
    console.log(this.props.workoutNumber);
  };

  updateExerciseNameState = e => {
    this.setState({
      exerciseName: e.target.value
    });
    console.log(this.state);
  };

  updateSetsState = e => {
    this.setState({
      sets: parseInt(e.target.value.trim())
    });
  };

  updateRepsState = e => {
    this.setState({
      reps: parseInt(e.target.value.trim())
    });
  };

  updateWeightState = e => {
    this.setState({
      weight: parseInt(e.target.value.trim())
    });
  };

  submitToFirebase = () => {
    if (!this.state.exerciseName.trim()) {
      this.setState({
        exerciseNameClass: classes.inputFieldError,
        exerciseListClass: classes.exerciseListError,
        exerciseNameError: (
          <p className={classes.errorMessage}>
            Exercise Name field can't be empty
          </p>
        )
      });
    }
    if (this.state.exerciseName.trim()) {
      this.setState({
        exerciseNameClass: classes.inputFieldSuccess,
        exerciseListClass: classes.exerciseList,
        exerciseNameError: null
      });
    }
    if (!this.state.sets) {
      this.setState({
        setsClass: classes.inputFieldError,
        exerciseListClass: classes.exerciseListError,
        setsError: (
          <p className={classes.errorMessage}>Sets field can't be empty</p>
        )
      });
    }
    if (this.state.sets) {
      this.setState({
        setsClass: classes.inputFieldSuccess,
        exerciseListClass: classes.exerciseList,
        setsError: null
      });
    }
    if (!this.state.reps) {
      this.setState({
        repsClass: classes.inputFieldError,
        exerciseListClass: classes.exerciseListError,
        repsError: (
          <p className={classes.errorMessage}>Reps field can't be empty</p>
        )
      });
    }
    if (this.state.reps) {
      this.setState({
        repsClass: classes.inputFieldSuccess,
        exerciseListClass: classes.exerciseList,
        repsError: null
      });
    }
    if (!this.state.weight) {
      this.setState({
        weightClass: classes.inputFieldError,
        exerciseListClass: classes.exerciseListError,
        weightError: (
          <p className={classes.errorMessage}>Weight field can't be empty</p>
        )
      });
    }
    if (this.state.weight) {
      this.setState({
        weightClass: classes.inputFieldSuccess,
        exerciseListClass: classes.exerciseList,
        weightError: null
      });
    }
    if (
      this.state.weight &&
      this.state.reps &&
      this.state.sets &&
      this.state.exerciseName
    ) {
      this.addExerciseToFirebase();
    }
  };

  addExerciseToFirebase = () => {
    this.setState({
      loader: <div className={classes.loader} />
    });
    const db = firebase.firestore();
    let exercisesCopy = this.state.exercisesState;
    let exercise = {
      exerciseName: this.state.exerciseName,
      exerciseNumber: this.state.exercisesState.length + 1,
      reps: this.state.reps,
      sets: this.state.sets,
      weight: this.state.weight,
      workoutNumber: this.state.workoutNumber
    };
    console.log(this.state.exercisesState);
    console.log(exercisesCopy);
    exercisesCopy.push({ exercise });
    console.log(exercisesCopy);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        let query = db
          .collection("workouts")
          .where("uid", "==", uid)
          .where("workoutNumber", "==", this.state.workoutNumber)
          .limit(1);
        query
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              db.collection("workouts")
                .doc(doc.id)
                .update({
                  exercises: exercisesCopy
                });
              this.props.getExercisesToRedux(
                exercisesCopy,
                this.state.workoutNumber
              );
              window.localStorage.setItem(
                "exercises",
                JSON.stringify(exercisesCopy)
              );
              this.setState({
                loader: null
              });
              this.closeModal();
              console.log("function finished");
            });
          })
          .catch(error => {
            console.error("Error editing exercise: ", error);
          });
      } else {
        console.log("user not logged in");
      }
    });
  };

  closeModal = () => {
    this.setState({
      class: "animated fadeOutUp fast "
    });
    setTimeout(() => {
      this.props.closeModal();
    }, 800);
  };

  render() {
    console.log(this.state);

    return (
      <div className={this.state.class + classes.opacityLayerDiv}>
        <div className={"animated zoomIn faster " + classes.mainModalDiv}>
          <div className={classes.modalHeaderMainDiv}>
            <h5 className={classes.modalHeader}>Add Exercise</h5>
            <i
              onClick={this.closeModal}
              className={"material-icons " + classes.closeIcon}
            >
              close
            </i>
          </div>
          <div className={classes.exerciseNumberDiv}>
            <h5 className={classes.exerciseHeader}>
              Exercise {this.props.exercisesCopy.length + 1}
            </h5>
          </div>
          <div className={classes.modalBodyDiv}>
            <input
              onChange={this.updateExerciseNameState}
              className={this.state.exerciseNameClass}
              type="text"
              placeholder="Exercise Name"
              value={this.state.exerciseName}
            />
            {this.state.exerciseNameError}
            <input
              onChange={this.updateSetsState}
              className={this.state.setsClass}
              type="number"
              placeholder="Sets"
              value={this.state.sets}
            />
            {this.state.setsError}
            <input
              onChange={this.updateRepsState}
              className={this.state.repsClass}
              type="number"
              placeholder="Reps"
              value={this.state.reps}
            />
            {this.state.repsError}
            <input
              onChange={this.updateWeightState}
              className={this.state.weightClass}
              type="number"
              placeholder="Weight (kg)"
              value={this.state.weight}
            />
            {this.state.weightError}
          </div>
          <div className={classes.bottomModalDiv}>
            {this.state.loader}
            <button
              className={classes.submitButton + " " + classes.buttonAnimation}
              onClick={this.submitToFirebase}
            >
              <span className={classes.submitSpan}>Submit Exercise</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    exercises: state.exercises
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getExercisesToRedux: (exercises, number) =>
      dispatch(actionTypes.getExercises(exercises, number))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExercise);
