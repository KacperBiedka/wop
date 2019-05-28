import React, { Component } from "react";
import classes from "./WorkoutCard.module.sass";
import { Link } from "react-router-dom";

class WorkoutCard extends Component {
  state = {
    loader: null
  };

  removeWorkout = () => {
    this.setState({
      loader: <div className={classes.loader} />
    });
    this.props.removeWorkout();
  };

  render() {
    return (
      <div
        key={this.props.number}
        className={classes.workoutCardDiv + " animated zoomIn fast"}
      >
        <div className={classes.workoutCardHeaderDiv}>
          <input
            key={this.props.number}
            className={classes.workoutCardHeader}
            type="text"
            onBlur={this.props.addWorkout}
            onClick={this.props.setInputNumber}
            onChange={this.props.editWorkoutName}
            value={this.props.name}
          />
          <i
            onClick={this.removeWorkout}
            className={"material-icons " + classes.deleteIcon}
          >
            close
          </i>
        </div>
        <ul className={classes.workoutCardList}>
          {this.props.exercises[this.props.number - 1].map(ex => {
            return (
              <li
                key={ex.exercise.exerciseName + ex.exercise.exerciseNumber}
                className={classes.workoutCardListItem}
              >
                <span className={classes.exerciseNameSpan}>
                  {ex.exercise.exerciseName}
                </span>
                <span className={classes.exerciseNumbersSpan}>
                  {ex.exercise.sets} sets {ex.exercise.reps} reps with{" "}
                  {ex.exercise.weight}kg
                </span>
              </li>
            );
          })}
        </ul>
        <div className={classes.modalFooter}>
          <Link to="/exercises">
            <p
              onClick={this.props.getExercisesToRedux}
              className={classes.modalAnchor}
            >
              Choose
            </p>
          </Link>
          {this.state.loader}
        </div>
      </div>
    );
  }
}

export default WorkoutCard;
