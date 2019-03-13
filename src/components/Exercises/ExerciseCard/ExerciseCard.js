import React from 'react';
import classes from './ExerciseCard.module.css';

const exerciseCard = (props) => {
    
    const renderSquares = () => {
        let exerciseSquaresTable = [];
        for (let x = 0; x < props.sets; x++) {
            exerciseSquaresTable.push(
            <div className={classes.exerciseCardSquare}>
                <p>{props.reps}</p>
            </div>)
        }
        return exerciseSquaresTable;
    }
    return (
        <div className={classes.exerciseCardDiv + " shadow p-3 mb-1 bg-white rounded"}>
            <div className={classes.exerciseCardHeaderDiv}>
                <h5 className={classes.exerciseCardHeader}>{props.name} with {props.weight} kg</h5>
            </div>
            <div className={classes.exerciseCardBodyDiv}>
                {renderSquares()}
            </div>
            <div className={classes.exerciseCardBottomDiv}>
            <p>There will be some options soon</p>
            </div>
        </div>
    )
}

export default exerciseCard