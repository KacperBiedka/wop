import React from "react";
import classes from "./WorkoutMessage.module.sass";

const workoutMessage = props => {
  return (
    <div className={classes.workoutMessageDiv}>
      <h3 className={classes.mainHeader}>You haven't added any workouts yet</h3>
      <h5 className={classes.addWorkoutHeader}>Start by adding a workout </h5>
      <div onClick={props.toggleAddWorkoutModal} className={classes.iconDiv}>
        <i className={"material-icons " + classes.plusIcon}>add</i>
      </div>
    </div>
  );
};

export default workoutMessage;
