import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../firebase";
import classes from "./EditExercise.module.sass";
import * as actionTypes from "../../store/actions/actionTypes";

class EditExercise extends Component {
  state = {
    exercisesState: [],
    workoutNumber: null,
    exerciseNumber: null,
    exerciseName: "",
    exerciseNameClass: classes.inputField,
    exerciseNameError: null,
    sets: null,
    setsError: null,
    setsClass: classes.inputField,
    reps: null,
    repsError: null,
    repsClass: classes.inputField,
    weight: null,
    weightError: null,
    weightClass: classes.inputField,
    class: "",
    loader: null
  };

  componentDidMount = () => {
    this.setState({
      exercisesState: this.props.exercisesState,
      workoutNumber: this.props.workoutNumber,
      exerciseNumber: this.props.exerciseNumber,
      exerciseName: this.props.exerciseName,
      sets: this.props.sets,
      reps: this.props.reps,
      weight: this.props.weight
    });
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
      weight: parseFloat(e.target.value)
    });
  };

  checkExerciseNameError = () => {
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
    if (this.state.exerciseName.length > 45) {
      this.setState({
        exerciseNameClass: classes.inputFieldError,
        exerciseListClass: classes.exerciseListError,
        exerciseNameError: (
          <p className={classes.errorMessage}>Exercise Name is too long</p>
        )
      });
    }
    if (
      this.state.exerciseName.trim() &&
      this.state.exerciseName.length <= 45
    ) {
      this.setState({
        exerciseNameClass: classes.inputFieldSuccess,
        exerciseListClass: classes.exerciseList,
        exerciseNameError: null
      });
    }
  };

  checkSetsError = () => {
    if (!this.state.sets) {
      this.setState({
        setsClass: classes.inputFieldError,
        exerciseListClass: classes.exerciseListError,
        setsError: (
          <p className={classes.errorMessage}>Sets field can't be empty</p>
        )
      });
    }
    if (this.state.sets > 99) {
      this.setState({
        setsClass: classes.inputFieldError,
        exerciseListClass: classes.exerciseListError,
        setsError: (
          <p className={classes.errorMessage}>
            You can't set sets to more than 99 sets
          </p>
        )
      });
    }
    if (this.state.sets && this.state.sets <= 99) {
      this.setState({
        setsClass: classes.inputFieldSuccess,
        exerciseListClass: classes.exerciseList,
        setsError: null
      });
    }
  };

  checkRepsError = () => {
    if (!this.state.reps) {
      this.setState({
        repsClass: classes.inputFieldError,
        exerciseListClass: classes.exerciseListError,
        repsError: (
          <p className={classes.errorMessage}>Reps field can't be empty</p>
        )
      });
    }
    if (this.state.reps > 99) {
      this.setState({
        repsClass: classes.inputFieldError,
        exerciseListClass: classes.exerciseListError,
        repsError: (
          <p className={classes.errorMessage}>
            You can't set reps to more than 99 reps
          </p>
        )
      });
    }
    if (this.state.reps && this.state.reps <= 99) {
      this.setState({
        repsClass: classes.inputFieldSuccess,
        exerciseListClass: classes.exerciseList,
        repsError: null
      });
    }
  };

  checkWeightError = () => {
    if (!this.state.weight && this.state.weight !== 0) {
      this.setState({
        weightClass: classes.inputFieldError,
        exerciseListClass: classes.exerciseListError,
        weightError: (
          <p className={classes.errorMessage}>Weight field can't be empty</p>
        )
      });
    }
    if (this.state.weight > 999) {
      this.setState({
        weightClass: classes.inputFieldError,
        exerciseListClass: classes.exerciseListError,
        weightError: (
          <p className={classes.errorMessage}>
            You can't set weight to more than 999kg
          </p>
        )
      });
    }
    if (
      (this.state.weight || this.state.weight === 0) &&
      this.state.weight <= 999
    ) {
      this.setState({
        weightClass: classes.inputFieldSuccess,
        exerciseListClass: classes.exerciseList,
        weightError: null
      });
    }
  };

  submitEdit = () => {
    this.checkExerciseNameError();
    this.checkRepsError();
    this.checkSetsError();
    this.checkWeightError();
    if (
      this.state.weight >= 0 &&
      this.state.reps &&
      this.state.sets &&
      this.state.exerciseName &&
      this.state.exerciseName.length <= 45 &&
      this.state.reps <= 99 &&
      this.state.sets <= 99 &&
      this.state.weight <= 999
    ) {
      this.editExercise();
    }
  };

  editExercise = () => {
    console.log("edit exercise");
    if (!this.state.loader) {
      console.log("triggered the function");
      this.setState({
        loader: <div className={classes.loader} />
      });
      const db = firebase.firestore();
      let exercisesCopy = this.state.exercisesState;
      let exercise = {
        exerciseName: this.state.exerciseName,
        exerciseNumber: this.state.exerciseNumber,
        reps: this.state.reps,
        sets: this.state.sets,
        weight: this.state.weight,
        workoutNumber: this.state.workoutNumber
      };
      console.log(this.state.exercisesState);
      console.log(exercisesCopy);
      exercisesCopy[this.state.exerciseNumber - 1] = { exercise };
      console.log(exercisesCopy);
      firebase.auth().onAuthStateChanged(user => {
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
                    this.setState({
                      loader: null
                    });
                    window.localStorage.setItem(
                      "exercises",
                      JSON.stringify(exercisesCopy)
                    );
                    this.closeModal();
                  })
                  .catch(error => {
                    console.log("error performing getExercisesToRedux ", error);
                  });
              });
            })
            .catch(function(error) {
              console.error("Error editing exercise: ", error);
            });
        } else {
          console.log("user not logged in");
        }
      });
    }
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
            <h5 className={classes.modalHeader}>Edit Exercise</h5>
            <i
              onClick={this.closeModal}
              className={"material-icons " + classes.closeIcon}
            >
              close
            </i>
          </div>
          <div className={classes.exerciseNumberDiv}>
            <h5 className={classes.exerciseHeader}>
              Exercise {this.state.exerciseNumber}
            </h5>
          </div>
          <div className={classes.modalBodyDiv}>
            <input
              onChange={this.updateExerciseNameState}
              onBlur={this.checkExerciseNameError}
              className={this.state.exerciseNameClass}
              type="text"
              placeholder="Exercise Name"
              value={this.state.exerciseName}
            />
            {this.state.exerciseNameError}
            <input
              onChange={this.updateSetsState}
              onBlur={this.checkSetsError}
              className={this.state.setsClass}
              type="number"
              placeholder="Sets"
              value={this.state.sets}
            />
            {this.state.setsError}
            <input
              onChange={this.updateRepsState}
              onBlur={this.checkRepsError}
              className={this.state.repsClass}
              type="number"
              placeholder="Reps"
              value={this.state.reps}
            />
            {this.state.repsError}
            <input
              onChange={this.updateWeightState}
              onBlur={this.checkWeightError}
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
              onClick={this.submitEdit}
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
)(EditExercise);
