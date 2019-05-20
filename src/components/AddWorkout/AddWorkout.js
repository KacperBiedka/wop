import React, { Component } from "react";
import firebase from "../../firebase.js";

import classes from "./AddWorkout.module.sass";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

class AddWorkout extends Component {
  state = {
    workoutName: "",
    workoutNameError: null,
    workoutNameClass: classes.inputField,
    exerciseNumber: 1,
    exerciseName: "",
    exerciseNameError: null,
    exerciseNameClass: classes.inputField,
    sets: null,
    setsError: null,
    setsClass: classes.inputField,
    reps: null,
    repsError: null,
    repsClass: classes.inputField,
    weight: null,
    weightError: null,
    weightClass: classes.inputField,
    exerciseListClass: classes.exerciseList,
    exercises: [],
    globalWorkoutNumber: 0,
    clickedExerciseNumber: null,
    class: " "
  };

  componentDidMount = () => {
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
        exerciseNameClass: classes.inputField,
        setsClass: classes.inputField,
        repsClass: classes.inputField,
        weightClass: classes.inputField,
        exerciseListClass: classes.exerciseList,
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
    if (this.state.workoutName.trim()) {
      this.setState({
        workoutNameClass: classes.inputFieldSuccess,
        workoutNameError: null
      });
    }
    if (!this.state.workoutName.trim()) {
      console.log("there is no workout name :( pepehands");
      this.setState({
        workoutNameClass: classes.inputFieldError,
        workoutNameError: (
          <p className={classes.errorMessage}>
            Workout Name field can't be empty
          </p>
        )
      });
    }
    if (!(this.state.exercises.length > 0)) {
      alert("You need to add at least one exercise!");
    }
    if (this.state.workoutName.trim() && this.state.exercises.length > 0) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const uid = user.uid;
          db.collection("users")
            .doc(uid)
            .set({
              uid: uid,
              email: user.email,
              workoutsNumber: this.state.globalWorkoutNumber + 1
            });
          db.collection("workouts")
            .add({
              uid: uid,
              exercises: this.state.exercises,
              workoutName: this.state.workoutName,
              workoutNumber: this.state.globalWorkoutNumber + 1
            })
            .then(() => {
              window.location.href = "/workouts";
            })
            .catch(error => {
              console.error("Error adding workout: ", error);
            });
        } else {
          console.log("user not logged in");
        }
      });
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
              onBlur={this.checkWorkoutNameError}
              className={
                classes.workoutNameInput + " " + this.state.workoutNameClass
              }
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
              className={this.state.exerciseNameClass}
              onBlur={this.checkExerciseNameError}
              type="text"
              placeholder="Exercise Name"
              value={this.state.exerciseName}
            />
            {this.state.exerciseNameError}
            <input
              onChange={this.updateSetsState}
              onBlur={this.checkSetsError}
              className={this.state.setsClass + " " + classes.numberInputField}
              type="number"
              placeholder="Sets"
              value={this.state.sets}
            />
            {this.state.setsError}
            <input
              onChange={this.updateRepsState}
              onBlur={this.checkRepsError}
              className={this.state.repsClass + " " + classes.numberInputField}
              type="number"
              placeholder="Reps"
              value={this.state.reps}
            />
            {this.state.repsError}
            <input
              onChange={this.updateWeightState}
              onBlur={this.checkWeightError}
              className={
                this.state.weightClass + " " + classes.numberInputField
              }
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
            <div className={this.state.exerciseListClass}>
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
