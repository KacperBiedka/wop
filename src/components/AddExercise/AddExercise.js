import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import firebase from "../../firebase";
import classes from "./AddExercise.module.css";
import * as actionTypes from "../../store/actions/actionTypes";

class AddExercise extends Component {
  state = {
    exercisesState: [],
    workoutNumber: null,
    exerciseNumber: null,
    exerciseName: "",
    exerciseNameError: null,
    sets: null,
    setsError: null,
    reps: null,
    repsError: null,
    weight: null,
    weightError: null
  };

  componentDidMount = () => {
    this.setState({
      exercisesState: this.props.exercisesCopy,
      closeModal: this.props.closeModal,
      workoutNumber: this.props.workoutNumber
    });
    console.log(this.props.exercisesCopy);
  };

  render() {
    console.log(this.state);

    const updateExerciseNameState = e => {
      this.setState({
        exerciseName: e.target.value
      });
      console.log(this.state);
    };

    const updateSetsState = e => {
      this.setState({
        sets: parseInt(e.target.value.trim())
      });
    };

    const updateRepsState = e => {
      this.setState({
        reps: parseInt(e.target.value.trim())
      });
    };

    const updateWeightState = e => {
      this.setState({
        weight: parseInt(e.target.value.trim())
      });
    };

    const submitToFirebase = () => {
      if (!this.state.exerciseName.trim()) {
        this.setState({
          exerciseNameError: null
        });
      }
      if (this.state.exerciseName && this.state.exerciseNameError) {
        this.setState({
          exerciseNameError: null
        });
      }
      if (!this.state.sets) {
        this.setState({
          setsError: null
        });
      }
      if (this.state.sets && this.state.setsError) {
        this.setState({
          setsError: null
        });
      }
      if (!this.state.reps) {
        this.setState({
          repsError: null
        });
      }
      if (this.state.reps && this.state.repsError) {
        this.setState({
          repsError: null
        });
      }
      if (!this.state.weight) {
        this.setState({
          weightError: null
        });
      }
      if (this.state.weight && !this.state.weightError) {
        this.setState({
          weightError: null
        });
      }
      if (
        this.state.weight &&
        this.state.reps &&
        this.state.sets &&
        this.state.exerciseName
      ) {
        AddExercise();
      }
    };

    const AddExercise = () => {
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
      firebase.auth().onAuthStateChanged(
        function(user) {
          if (user) {
            const uid = user.uid;
            const query = db
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
                    })
                    .then(() => {
                      this.props.getExercisesToRedux(
                        exercisesCopy,
                        this.state.workoutNumber
                      );
                      window.localStorage.setItem(
                        "exercises",
                        JSON.stringify(exercisesCopy)
                      );
                      window.location.reload();
                    })
                    .catch(error => {
                      console.log(
                        "error performing getExercisesToRedux ",
                        error
                      );
                    });
                });
              })
              .catch(function(error) {
                console.error("Error editing exercise: ", error);
              });
          } else {
            console.log("user not logged in");
          }
        }.bind(this)
      );
    };

    return (
      <>
        <Modal show={this.props.visible} onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Exercise</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 className={classes.exerciseHeader}>
              Exercise{" "}
              {this.state.exercisesState != null
                ? this.state.exercisesState.length + 1
                : null}
            </h5>
            <hr className={classes.exerciseHeaderHr} />
            <p className={classes.inputFieldLable}>Exercise Name</p>
            <input
              onChange={updateExerciseNameState}
              className={classes.inputField}
              type="text"
              placeholder="Exercise Name"
              value={this.state.exerciseName}
            />
            {this.state.exerciseNameError}
            <p className={classes.inputFieldLable}>Sets</p>
            <input
              onChange={updateSetsState}
              className={classes.inputField + " " + classes.numberInputField}
              type="number"
              placeholder="Sets"
              value={this.state.sets}
            />
            {this.state.setsError}
            <p className={classes.inputFieldLable}>Reps</p>
            <input
              onChange={updateRepsState}
              className={classes.inputField + " " + classes.numberInputField}
              type="number"
              placeholder="Reps"
              value={this.state.reps}
            />
            {this.state.repsError}
            <p className={classes.inputFieldLable}>Weight</p>
            <input
              onChange={updateWeightState}
              className={classes.inputField + " " + classes.numberInputField}
              type="number"
              placeholder="Weight (kg)"
              value={this.state.weight}
            />
            {this.state.weightError}
          </Modal.Body>
          <Modal.Footer>
            <button
              className={classes.modalButton}
              onClick={this.props.closeModal}
            >
              Cancel
            </button>
            <button className={classes.modalButton} onClick={submitToFirebase}>
              Add
            </button>
          </Modal.Footer>
        </Modal>
      </>
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
