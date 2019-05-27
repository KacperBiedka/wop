import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../firebase.js";
import classes from "./ExerciseCard.module.sass";
import ExerciseSquare from "./ExerciseSquare/ExerciseSquare";
import * as actionTypes from "../../store/actions/actionTypes";

class ExerciseCard extends Component {
  state = {
    exercisesState: [],
    properties: {},
    class: "",
    loader: null
  };

  componentDidMount = () => {
    this.setState({
      exercisesState: this.props.exercisesState
    });
  };

  removeExercise = () => {
    this.setState({
      loader: <div className={classes.loader} />
    });
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let exercisesCopy = this.state.exercisesState;
        console.log(exercisesCopy);
        exercisesCopy.splice(this.props.exerciseNumber - 1, 1);
        exercisesCopy.map((ex, index) => {
          console.log(ex.exercise.exerciseNumber);
          console.log(ex);
          if (ex.exercise.exerciseNumber > this.props.exerciseNumber) {
            exercisesCopy[index].exercise.exerciseNumber =
              ex.exercise.exerciseNumber - 1;
          }
          return null;
        });
        console.log(exercisesCopy);
        const uid = user.uid;
        const query = db
          .collection("workouts")
          .where("uid", "==", uid)
          .where("workoutNumber", "==", this.props.workoutNumber)
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
                  this.setState({
                    class: "animated zoomOut faster ",
                    loader: null
                  });
                  setTimeout(() => {
                    this.setState({
                      exercisesState: exercisesCopy
                    });
                    this.props.getExercisesToRedux(
                      exercisesCopy,
                      this.props.workoutNumber
                    );
                    window.localStorage.setItem(
                      "exercises",
                      JSON.stringify(exercisesCopy)
                    );
                  }, 1000);
                  console.log(
                    "successfuly removed the exercise from the doc",
                    exercisesCopy
                  );
                })
                .catch(error => {
                  console.log("error updating the exercises: ", error);
                });
            });
          })
          .catch(error => {
            console.log("error getting the workout doc.id: ", error);
          });
      } else {
        window.location.href = "../login";
      }
    });
  };

  renderSquares = () => {
    let exerciseSquaresTable = [];
    for (let x = 0; x < this.props.sets; x++) {
      exerciseSquaresTable.push(
        <ExerciseSquare
          toggleTimer={this.props.toggleTimer}
          key={x + this.props.exerciseName + this.props.sets}
          reps={this.props.reps}
          number={x}
          exerciseName={this.props.exerciseName}
          sets={this.props.sets}
        />
      );
    }
    return exerciseSquaresTable;
  };

  render() {
    return (
      <div
        key={this.props.exerciseName + this.props.exerciseNumber}
        className={"animated zoomIn faster " + classes.exerciseCardDiv}
      >
        <div className={this.state.class + classes.mainDiv}>
          <div className={classes.exerciseCardHeaderDiv}>
            <h5 className={classes.exerciseCardHeader}>
              {this.props.exerciseName} with {this.props.weight} kg
            </h5>
            <i
              className={"material-icons " + classes.deleteIcon}
              onClick={this.removeExercise}
            >
              close
            </i>
          </div>
          <div className={classes.exerciseCardBodyDiv}>
            {this.renderSquares()}
          </div>
          <div className={classes.exerciseCardBottomDiv}>
            <div className={classes.anchorDiv}>
              <p
                className={classes.modalAnchor}
                onClick={this.props.toggleEditModal}
              >
                Edit
              </p>
            </div>
            {/* {this.state.loader} */}
            <div className={classes.loader} />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getExercisesToRedux: (exercises, number) =>
      dispatch(actionTypes.getExercises(exercises, number))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ExerciseCard);
