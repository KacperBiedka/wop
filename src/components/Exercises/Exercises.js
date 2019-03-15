import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExerciseCard from './ExerciseCard/ExerciseCard';
import NavBar from '../Navbar/Navbar';

class Exercises extends Component {
    state = {
        exercises: []
    }

    componentWillMount() {
        console.log(this.props.exercises);
        console.log(this.state.exercises);
        if (this.props.exercises) {
           window.localStorage.clear();
           window.localStorage.setItem('exercises', JSON.stringify(this.props.exercises));
           console.log(window.localStorage.getItem('exercises'));
           this.setState({
               exercises: this.props.exercises
           })
        } else {
            let localStorageExercises = JSON.parse(window.localStorage.getItem('exercises'));
            console.log(localStorageExercises);
            this.setState({
                exercises: localStorageExercises
            });
        }
        console.log(this.state.exercises);   
    }
  

    render() {
        return (
        <div>
            <NavBar/>
            <h1>Exercises Loaded</h1>
            {console.log(this.props.exercises)}
            {  
                this.state.exercises.map(ex => {
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

