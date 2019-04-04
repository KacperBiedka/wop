import React, { Component } from 'react';
import classes from './ExerciseSquare.module.css';

class ExerciseSquare extends Component {
state = {
    class: classes.exerciseCardSquare
}

render() {

const toggleSquare = () => {
    if (this.state.class === classes.exerciseCardSquare) {
        this.setState({
            class: classes.exerciseClickedSquare
        }, () => {
        this.props.toggleTimer()
    })
    } else {
        this.setState({
            class: classes.exerciseCardSquare
        })
        this.props.closeTimer()
    }
}
return (
    <div onClick={toggleSquare} key={this.props.number + this.props.exerciseName + this.props.sets} className={this.state.class}>
        <p>{this.props.reps}</p>
    </div>
  )
 }
}

export default ExerciseSquare;