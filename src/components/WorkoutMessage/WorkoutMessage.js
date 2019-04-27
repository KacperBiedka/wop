import React from "react";
import classes from "./WorkoutMessage.module.css";

const workoutMessage = props => {
  return (
    <div className={classes.workoutMessageDiv}>
      <h3 classsName={classes.messageHeader}>
        You haven't added any workouts yet
      </h3>
      <h5 className={classes.addWorkoutHeader}>Start by adding a workout </h5>
      <button onClick={props.addWorkout} className={classes.addWorkoutButton} />
    </div>
  );
};

export default workoutMessage;
