import React, { Component } from 'react';
import Redux from 'redux';
import { connect } from 'react-redux';

class Exercises extends Component {
    reder() {
        return (
        <div>
            {
                this.props.exercises.map(ex => {
                    return (
                        <span>Exercise {ex.exercise.number}: {ex.exercise.exerciseNumber} {ex.exercise.sets} sets {ex.exercise.reps} reps with {ex.exercise.weight} kg</span>
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

