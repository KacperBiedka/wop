import React from 'react';

const workoutCard = (props) => {
    <div className={classes.workoutCardDiv}>
    <span className={classes.workoutNameSpan}>{props.workoutName}</span><p> sets {props.sets} reps {props.reps} weight {weight}kg </p>
    </div>
}

export default workoutCard;