import React, { Component } from "react";
import firebase from "../../firebase.js";

import classes from "./AddWorkout.module.sass";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

class AddWorkout extends Component {
  state = {
    workoutName: "",
    workoutNameError: null,
    exerciseNumber: 1,
    exerciseNumberError: null,
    exerciseName: "",
    exerciseNameError: null,
    sets: null,
    setsError: null,
    reps: null,
    repsError: null,
    weight: null,
    weightError: null,
    exercises: [],
    globalWorkoutNumber: 0,
    clickedExerciseNumber: null,
    class: " "
  };

  componentDidMount = () => {
    this.setState({
      display: this.props.display
    });
    const db = firebase.firestore();
    let globalWorkoutNumber = 0;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        const usersCollection = db.collection("users");
        usersCollection
          .where("uid", "==", uid)
          .orderBy("workoutsNumber", "desc")
          .limit(1)
          .get()
          .then(snapshot => {
            if (snapshot.docs.length > 0) {
              console.log("snapshot docs length: " + snapshot.docs.length);
              console.log("doc exists");
              snapshot.docs.forEach(doc => {
                console.log(doc.data().uid);
                console.log(doc.data().workoutsNumber);
                globalWorkoutNumber = doc.data().workoutsNumber;
                this.setState({
                  globalWorkoutNumber: globalWorkoutNumber
                });
              });
            } else if (snapshot.docs.length === false) {
              console.log("doc doesn't exist");
              globalWorkoutNumber = 0;
              console.log("globalWorkoutNumber = " + globalWorkoutNumber);
              this.setState({
                globalWorkoutNumber: globalWorkoutNumber
              });
            }
          })
          .catch(function(error) {
            console.log("Error getting workoutNumber data: ", error);
          });
      } else {
        console.log("user not logged in");
      }
    });
  };

  renderNextExerciseInputs = () => {
    if (!this.state.exerciseName.trim()) {
      this.setState({
        exerciseNameError: (
          <ErrorMessage text="Exercise Name field is required" />
        )
      });
    }
    if (this.state.exerciseName && this.state.exerciseNameError) {
      this.setState({
        exerciseNameError: null
      });
    }
    if (!this.state.sets) {
      this.setState({
        setsError: <ErrorMessage text="Sets field is required" />
      });
    }
    if (this.state.sets && this.state.setsError) {
      this.setState({
        setsError: null
      });
    }
    if (!this.state.reps) {
      this.setState({
        repsError: <ErrorMessage text="Reps field is required" />
      });
    }
    if (this.state.reps && this.state.repsError) {
      this.setState({
        repsError: null
      });
    }
    if (!this.state.weight) {
      this.setState({
        weightError: <ErrorMessage text="Weight field is required" />
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
      let exercisesArray = this.state.exercises.slice();
      let exercise = {
        exerciseNumber: this.state.exerciseNumber,
        exerciseName: this.state.exerciseName,
        sets: this.state.sets,
        reps: this.state.reps,
        weight: this.state.weight
      };
      console.log(exercisesArray);
      exercisesArray.push({ exercise });
      console.log(exercisesArray);
      this.setState({
        exercises: exercisesArray
      });
      this.setState({
        exerciseNumber: this.state.exerciseNumber + 1
      });
      console.log(this.state.exercises);
      this.setState({
        exerciseName: "",
        sets: "",
        reps: "",
        weight: "",
        exerciseNameError: null,
        setsError: null,
        repsError: null,
        weightError: null
      });
    }
  };

  updateExerciseNameState = e => {
    this.setState({
      exerciseName: e.target.value
    });
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
      weight: parseFloat(e.target.value)
    });
  };

  updateWorkoutNameState = e => {
    this.setState({
      workoutName: e.target.value,
      workoutNameError: null
    });
  };

  submitExercisesToFirebase = () => {
    const db = firebase.firestore();
    if (!this.state.workoutName.trim()) {
      console.log("there is no workout name :( pepehands");
      this.setState({
        workoutNameError: <ErrorMessage text="Workout Name is required" />
      });
    } else if (this.state.workoutName != null) {
      firebase.auth().onAuthStateChanged(
        function(user) {
          if (user) {
            const uid = user.uid;
            db.collection("users")
              .doc(uid)
              .set({
                uid: uid,
                email: user.email,
                workoutsNumber: this.state.globalWorkoutNumber + 1
              });
            // let exercisesStateCopy = this.state.exercises;
            // let workoutNameStateCopy = this.state.workoutName
            db.collection("workouts")
              .add({
                uid: uid,
                exercises: this.state.exercises,
                workoutName: this.state.workoutName,
                workoutNumber: this.state.globalWorkoutNumber + 1
              })
              .then(function() {
                window.location.href = "/workouts";
              })
              .catch(function(error) {
                console.error("Error adding workout: ", error);
              });
          } else {
            console.log("user not logged in");
          }
        }.bind(this)
      );
    }
  };

  changeExerciseNumberOnRemove = item => {
    if (item.exercise.exerciseNumber > this.state.clickedExerciseNumber) {
      item.exercise.exerciseNumber -= 1;
    }
  };

  removeExercise = number => {
    this.setState({
      clickedExerciseNumber: number
    });
    let exercisesStateCopy = this.state.exercises;
    exercisesStateCopy.splice(number, 1);
    exercisesStateCopy.forEach(this.changeExerciseNumberOnRemove);
    let exerciseNumberStateCopy = this.state.exerciseNumber;
    exerciseNumberStateCopy = exerciseNumberStateCopy - 1;
    this.setState({
      exercises: exercisesStateCopy,
      exerciseNumber: exerciseNumberStateCopy
    });
  };

  logCurrentState = () => {
    console.log(this.state.exercises);
  };

  closeModal = () => {
    this.setState({
      class: "animated fadeOutUp fast "
    });
    setTimeout(() => {
      this.props.closeModal();
    }, 1000);
  };

  render() {
    return (
      <div className={this.state.class + classes.opacityLayerDiv}>
        <div className={"animated fadeInDown faster " + classes.mainModalDiv}>
          <div className={classes.modalHeaderMainDiv}>
            <h5 className={classes.modalHeader}>Add workout</h5>
            <i
              onClick={this.closeModal}
              className={"material-icons " + classes.closeIcon}
            >
              close
            </i>
          </div>
          <div className={classes.workoutNameDiv}>
            <input
              onChange={this.updateWorkoutNameState}
              className={classes.workoutNameInput + " " + classes.inputField}
              type="text"
              placeholder="Workout Name"
              value={this.state.workoutName}
            />
            {this.state.workoutNameError}
          </div>
          <div className={classes.modalBodyDiv}>
            <h5 className={classes.exercisesHeader}>
              Exercise {this.state.exerciseNumber}
            </h5>
            <input
              onChange={this.updateExerciseNameState}
              className={classes.inputField}
              type="text"
              placeholder="Exercise Name"
              value={this.state.exerciseName}
            />
            {this.state.exerciseNameError}
            <input
              onChange={this.updateSetsState}
              className={classes.inputField + " " + classes.numberInputField}
              type="number"
              placeholder="Sets"
              value={this.state.sets}
            />
            {this.state.setsError}
            <input
              onChange={this.updateRepsState}
              className={classes.inputField + " " + classes.numberInputField}
              type="number"
              placeholder="Reps"
              value={this.state.reps}
            />
            {this.state.repsError}
            <input
              onChange={this.updateWeightState}
              className={classes.inputField + " " + classes.numberInputField}
              type="number"
              placeholder="Weight (kg)"
              value={this.state.weight}
            />
            {this.state.weightError}
            <div className={classes.addExerciseButtonContainer}>
              <button
                onClick={this.renderNextExerciseInputs}
                className={classes.addExerciseButton}
              >
                <span className={classes.addExerciseButtonText}>
                  Add exercise
                </span>
                <i className={"material-icons " + classes.plusIcon}>add</i>
              </button>
            </div>
            <div className={classes.exerciseListDiv}>
              {this.state.exercises.map(ex => {
                return (
                  <span
                    number={ex.exercise.exerciseNumber}
                    className={classes.exerciseListSpan}
                    key={
                      ex.exercise.exerciseName +
                      ex.exercise.exerciseNumber +
                      ex.exercise.weight
                    }
                  >
                    Exercise {ex.exercise.exerciseNumber} -{" "}
                    {ex.exercise.exerciseName} {ex.exercise.sets} sets{" "}
                    {ex.exercise.reps} reps with {ex.exercise.weight} kg
                    <i
                      onClick={() =>
                        this.removeExercise(ex.exercise.exerciseNumber - 1)
                      }
                      className={"material-icons " + classes.iconSpan}
                    >
                      close
                    </i>
                  </span>
                );
              })}
            </div>
          </div>
          <div className={classes.bottomModalDiv}>
            <button
              className={classes.submitButton + " " + classes.buttonAnimation}
              onClick={this.submitExercisesToFirebase}
            >
              <span className={classes.submitSpan}>Submit Workout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddWorkout;
