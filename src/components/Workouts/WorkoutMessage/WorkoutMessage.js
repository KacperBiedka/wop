import React from 'react';
import classes from './WorkoutMessage.module.css';
import MaterialIcon from 'material-icons-react';

const workoutMessage = (props) => {
    return (
    <div className={classes.workoutMessageDiv}>
    <h3 classsName={classes.messageHeader}>You haven't added any workouts yet</h3>
    <h5 className={classes.addWorkoutHeader}>Start by adding a workout </h5>
    <button onClick={props.addWorkout} className={classes.addWorkoutButton}><MaterialIcon size="large" icon="add" color="#C7C7C7"/></button>
    </div>
    )
}

export default workoutMessage;