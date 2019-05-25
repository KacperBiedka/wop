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
    class: ""
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
      weight: parseInt(e.target.value.trim())
    });
  };

  submitEdit = () => {
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
      this.editExercise();
    }
  };

  editExercise = () => {
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
