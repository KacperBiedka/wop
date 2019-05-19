import React from "react";
import classes from "./WorkoutCard.module.sass";
import { Link } from "react-router-dom";

const WorkoutCard = props => {
  return (
    <div
      key={props.number}
      className={classes.workoutCardDiv + " animated zoomIn"}
    >
      <div className={classes.workoutCardHeaderDiv}>
        {/* <h5 onClick={this.logData} className={classes.workoutNameHeader}>{this.state.workouts[w.number - 1].name}</h5> */}
        <input
          key={props.number}
          className={classes.workoutCardHeader}
          type="text"
          onBlur={props.addWorkout}
          onClick={props.setInputNumber}
          onChange={props.editWorkoutName}
          value={props.name}
        />
        <i
          onClick={props.removeWorkout}
          className={"material-icons " + classes.deleteIcon}
        >
          close
        </i>
      </div>
      <ul className={classes.workoutCardList}>
        {props.exercises[props.number - 1].map(ex => {
          return (
            <li
              key={ex.exercise.exerciseName + ex.exercise.exerciseNumber}
              className={classes.workoutCardListItem}
            >
              <span className={classes.exerciseNameSpan}>
                {ex.exercise.exerciseName}
              </span>
              {ex.exercise.sets} sets {ex.exercise.reps} reps with{" "}
              {ex.exercise.weight}kg
            </li>
          );
        })}
      </ul>
      <div className={classes.modalFooter}>
        <Link to="/exercises">
          <p
            onClick={props.getExercisesToRedux}
            className={classes.modalAnchor}
          >
            Choose
          </p>
        </Link>
      </div>
    </div>
  );
};

export default WorkoutCard;
