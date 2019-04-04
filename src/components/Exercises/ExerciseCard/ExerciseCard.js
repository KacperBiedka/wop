import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../../firebase.js';
import classes from './ExerciseCard.module.css';
import EditExercise from '../EditExercise/EditExercise';
import ExerciseSquare from './ExerciseSquare/ExerciseSquare';
import * as actionTypes from '../../../store/actions/actionTypes';


class ExerciseCard extends Component {
   state = {
    exercisesState: [],
    showEditModal: false,
   }

   componentWillMount = () => {
        this.setState({
            exercisesState: this.props.exercisesState
        })
   }

   closeEditModal = () => {
        this.setState({
            showEditModal: false
        });
        console.log(this.state.showEditModal);
    };

    toggleEditModal = () => {
        this.setState({
            showEditModal: !this.state.showEditModal
        });
        console.log(this.state.showEditModal);
    };

    removeExercise = () => {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let exercisesCopy = this.state.exercisesState;
        console.log(exercisesCopy);
        exercisesCopy.splice(this.props.exerciseNumber - 1, 1);
        exercisesCopy.map((ex, index) => {
            console.log(ex.exercise.exerciseNumber);
            console.log(ex);
            if (ex.exercise.exerciseNumber > this.props.exerciseNumber) {
                exercisesCopy[index].exercise.exerciseNumber = ex.exercise.exerciseNumber - 1;
            }
            return null;
        });
        console.log(exercisesCopy);
        const uid = user.uid;
        const query = db.collection("workouts").where("uid", "==", uid).where("workoutNumber", "==", this.props.workoutNumber).limit(1);
        query.get()
        .then((snapshot) => {
            snapshot.docs.forEach(doc => {
                db.collection("workouts").doc(doc.id).update({
                    exercises: exercisesCopy
                })
            .then(() => {
                this.setState({
                    exercisesState: exercisesCopy
                });
                this.props.getExercisesToRedux(exercisesCopy, this.props.workoutNumber);
                window.localStorage.setItem("exercises", JSON.stringify(exercisesCopy));
                console.log("successfuly removed the exercise from the doc", exercisesCopy)
                window.location.reload();
            })
            .catch((error) => {
                console.log("error updating the exercises: ", error);
            })
            })
        })
        .catch((error) => {
            console.log("error getting the workout doc.id: ", error);
        })
    } else {
      window.location.href = "../login";
    }
    }.bind(this))
    }

   render() {
        const renderSquares = () => {
            let exerciseSquaresTable = [];
            for (let x = 0; x < this.props.sets; x++) {
                exerciseSquaresTable.push(
                <ExerciseSquare closeTimer={this.props.closeTimer} toggleTimer={this.props.toggleTimer} key={x + this.props.exerciseName + this.props.sets} reps={this.props.reps} number={x} exerciseName={this.props.exerciseName}  sets={this.props.sets}/>
                )
            }
            return exerciseSquaresTable;
        }
        return (
            <div key={this.props.exerciseName + this.props.exerciseNumber} className={classes.exerciseCardDiv + " shadow p-3 mb-1 bg-white rounded"}>
                <div className={classes.exerciseCardHeaderDiv}>
                    <h5 className={classes.exerciseCardHeader}>{this.props.exerciseName} with {this.props.weight} kg</h5>
                </div>
                <div className={classes.exerciseCardBodyDiv}>
                    {renderSquares()}
                </div>
                <div className={classes.exerciseCardBottomDiv}>
                <div className={classes.anchorDiv}>
                    <p className={classes.modalAnchor} onClick={this.toggleEditModal}>edit</p>
                </div>
                <div className={classes.deleteDiv}>
                    <p onClick={this.removeExercise} className={classes.modalAnchor + " " + classes.deleteAnchor}>delete</p>
                </div>
            </div>
            <EditExercise 
                    key={this.props.exerciseNumber + this.props.exerciseName}
                    exercisesState={this.state.exercisesState} 
                    workoutNumber={this.props.workoutNumber}
                    exerciseNumber={this.props.exerciseNumber}
                    visible={this.state.showEditModal}
                    closeModal={this.closeEditModal}
                    exerciseName={this.props.exerciseName}
                    sets={this.props.sets}
                    reps={this.props.reps}
                    weight={this.props.weight}
             />
            </div>
        )
   }   
}

const mapDispatchToProps = dispatch => {
    return {
      getExercisesToRedux: (exercises, number) => dispatch(actionTypes.getExercises(exercises, number))
    };
  };
  
export default connect(null, mapDispatchToProps)(ExerciseCard);

