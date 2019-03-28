import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExerciseCard from './ExerciseCard/ExerciseCard';
import NavBar from '../Navbar/Navbar';


class Exercises extends Component {
    state = {
        exercises: [],
        number: null,

    }

    componentWillMount() {
        console.log(this.props.exercises);
        console.log(this.state.exercises);
        if (this.props.exercises) {
           window.localStorage.clear();
           window.localStorage.setItem('exercises', JSON.stringify(this.props.exercises));
           window.localStorage.setItem('number', JSON.stringify(this.props.number));
           console.log(window.localStorage.getItem('exercises'));
           console.log(window.localStorage.getItem('number'));
           this.setState({
               exercises: this.props.exercises,
               number: this.props.number
           })
        } else {
            let localStorageExercises = JSON.parse(window.localStorage.getItem('exercises'));
            let localStorageNumber = parseInt(window.localStorage.getItem("number"));
            console.log(localStorageExercises);
            this.setState({
                exercises: localStorageExercises,
                number: localStorageNumber
            });
        }
        console.log(this.state.exercises);   
    }

    componentDidMount = () => {
        console.log(this.state);
    }
  
    logData = () => {
        console.log(this.state.exercises);
    }


    toggleEditModal = (number) => {
        this.setState({
            clickedExerciseNumber: number,
            showEditModal: !this.state.showEditModal
        });
        console.log(this.state.showEditModal);
    };


    render() {
        return (
        <div>
            <NavBar workoutNumber={this.state.number} location="exercises" exercises={this.state.exercises}/>
            {console.log(this.props.exercises)}
            {  
                this.state.exercises.map(ex => {
                    return (
                        <ExerciseCard
                        key={ex.exercise.exerciseName + ex.exercise.exerciseNumber} 
                        exerciseName={ex.exercise.exerciseName}
                        exercisesState={this.state.exercises}
                        exerciseNumber={ex.exercise.exerciseNumber}
                        sets={ex.exercise.sets}
                        reps={ex.exercise.reps}
                        weight={ex.exercise.weight}
                        workoutNumber={this.state.number}
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
      exercises: state.exercises,
      number: state.number
    };
  };

export default connect(mapStateToProps)(Exercises);

