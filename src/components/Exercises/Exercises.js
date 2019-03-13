import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExerciseCard from './ExerciseCard/ExerciseCard';

class Exercises extends Component {
    render() {
        return (
        <div>
            <h1>Exercises Loaded</h1>
            {console.log(this.props.exercises)}
            {
                this.props.exercises.map(ex => {
                    return (
                        <ExerciseCard
                        key={ex.exercise.exerciseName + ex.exercise.exerciseNumber} 
                        name={ex.exercise.exerciseName}
                        number={ex.exercise.exerciseNumber}
                        sets={ex.exercise.sets}
                        reps={ex.exercise.reps}
                        weight={ex.exercise.weight}
                        />
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

