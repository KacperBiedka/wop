import React, { Component } from 'react';
import { connect } from 'react-redux';

class Exercises extends Component {
    render() {
        return (
        <div>
            <h1>Exercises Loaded</h1>
            {console.log(this.props.exercises)}
            {
                this.props.exercises.map(ex => {
                    return (
                        <span>Exercise {ex.exercise.exerciseNumber}: {ex.exercise.exerciseName} {ex.exercise.sets} sets {ex.exercise.reps} reps with {ex.exercise.weight} kg</span>
                    );
                })
            }
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      exercises: state.exercises
    };
  };

export default connect(mapStateToProps)(Exercises);

