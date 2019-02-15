import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import firebase from '../../firebase.js';
import MaterialIcon, {colorPalette} from 'material-icons-react';

import classes from './AddWorkout.module.css';

class AddWorkout extends Component {
  state = {
    workoutName: "",
    exerciseNumber: 1,
    exerciseName: "",
    sets: null,
    reps: null,
    weight: null,
    exercises: []
  }
      render() {
  
  let db = firebase.firestore();      
  let globalWorkoutNumber = 0;      
        
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    const uid = user.uid;
    const usersCollection = db.collection("users");
    usersCollection.where("uid", "==", uid).orderBy("workoutsNumber", "desc").limit(1).get()
    .then((snapshot) => {
      if(snapshot.docs.length > 0) {
        console.log("snapshot docs length: " + snapshot.docs.length);
        console.log("doc exists");
        snapshot.docs.forEach(doc => {
        console.log(doc.data().uid);
        console.log(doc.data().workoutsNumber);
        globalWorkoutNumber = doc.data().workoutsNumber;
        return globalWorkoutNumber;
        })
      } else if(snapshot.docs.length == false) {
        console.log("doc doesn't exist");
        globalWorkoutNumber = 0;
        console.log("globalWorkoutNumber = " + globalWorkoutNumber);
        return globalWorkoutNumber;
      }
     })
    .catch(function(error) {
      console.log("Error getting workoutNumber data: ", error);
       });
  
     } else {
       console.log("user not logged in");
     }
   })

        let exercisesList = null;

        const renderNextExerciseInputs = () => {
          let exercisesArray = this.state.exercises.slice();
          let exercise = {
            workoutName: this.state.workoutName,
            exerciseNumber: this.state.exerciseNumber,
            exerciseName: this.state.exerciseName,
            sets: this.state.sets,
            reps: this.state.reps,
            weight: this.state.weight
          }
          console.log(exercisesArray);
          exercisesArray.push({exercise});
          console.log(exercisesArray);
          this.setState({
            exercises: exercisesArray
          });
          this.setState({
            exerciseNumber: this.state.exerciseNumber+1
          });
          console.log(this.state.exercises);
          this.setState({
            exerciseName: "",
            sets: "",
            reps: "",
            weight: ""
          });
        }

        const logState = () => {
          console.log(this.state.exercises);
          console.log(exercisesList);
        }
        
        const updateExerciseNameState = (e) => {
          this.setState({
           exerciseName: e.target.value
          })
        }
        const updateSetsState = (e) => {
          this.setState({
           sets: e.target.value
          })
        }
        const updateRepsState = (e) => {
          this.setState({
           reps: e.target.value
          })
        }
        const updateWeightState = (e) => {
          this.setState({
           weight: e.target.value
          })
        }
        const updateWorkoutNameState = (e) => {
          this.setState({
           workoutName: e.target.value
          })
        }

        const submitExercisesToFirebase = () => {
          this.state.exercises.map(ex => {
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                const uid = user.uid;
                db.collection("exercises").add({
                  uid: uid,
                  exerciseNumber: ex.exercise.exerciseNumber,
                  exerciseName: ex.exercise.exerciseName,
                  sets: ex.exercise.sets,
                  reps: ex.exercise.reps,
                  weight: ex.exercise.weight,
                  workoutName: ex.exercise.workoutName,
                  workoutNumber: globalWorkoutNumber+1
                })
                .then(function() {
                  
                })
                .catch(function(error) {
                    console.error("Error adding workout: ", error);
                });
              } else {
                console.log("user not logged in");
              }
            })
            })
          }

        return (
          <>
            <Modal show={this.props.visible} onHide={this.props.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add a new workout</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input onChange={updateWorkoutNameState} className={classes.workoutNameInput} type="text" placeholder="Workout Name" value={this.state.workoutName}/>
                <hr className={classes.workoutNameInputHr} />
                <h5 className={classes.exercisesHeader}>Exercise {this.state.exerciseNumber}</h5>
                <input onChange={updateExerciseNameState} className={classes.inputField} type="text" placeholder="Exercise Name" value={this.state.exerciseName} />
                <input onChange={updateSetsState} className={classes.inputField + " " + classes.numberInputField} type="number" placeholder="Sets"  value={this.state.sets} />
                <input onChange={updateRepsState} className={classes.inputField + " " + classes.numberInputField} type="number" placeholder="Reps"  value={this.state.reps} />
                <input onChange={updateWeightState} className={classes.inputField + " " + classes.numberInputField} type="number" placeholder="Weight (kg)"  value={this.state.weight} />
                <button onClick={renderNextExerciseInputs} className={classes.addExerciseButton}>+ Add exercise</button>
                { this.state.exercises.map(ex => {
                  // if (ex.exercise.exerciseName = null) {
                  //   return (
                  //   <span className={classes.errorMessage} key={ex.exercise.exerciseNumber}>
                  //     Please fill the exercise name input field
                  //   </span>
                  //   )
                  // } if (ex.exercise.sets = null) {
                  //   return (
                  //   <span className={classes.errorMessage} key={ex.exercise.exerciseNumber}>
                  //     Please fill the sets input field
                  //   </span>
                  //   ) 
                  // } if (ex.exercise.reps = null) {
                  //   return (
                  //   <span className={classes.errorMessage} key={ex.exercise.exerciseNumber}>
                  //     Please fill the reps input field
                  //   </span>
                  //   )
                  // } if (ex.exercise.weight = null) {
                  //   return (
                  //   <span number={ex.exercise.exerciseNumber} className={classes.exerciseListSpan} key={ex.exercise.exerciseName + ex.exercise.exerciseNumber + ex.exercise.weight}>
                  //     Exercise {ex.exercise.exerciseNumber} - {ex.exercise.exerciseName} {ex.exercise.sets} sets {ex.exercise.reps} reps with 0 kg
                  //   </span>
                  //   )
                  // } if (ex.exercise.exerciseName != null && ex.exercise.sets != null && ex.exercise.reps != null && ex.exercise.weight != null) {
                    return  <span number={ex.exercise.exerciseNumber} className={classes.exerciseListSpan} key={ex.exercise.exerciseName + ex.exercise.exerciseNumber + ex.exercise.weight}>
                      Exercise {ex.exercise.exerciseNumber} - {ex.exercise.exerciseName} {ex.exercise.sets} sets {ex.exercise.reps} reps with {ex.exercise.weight} kg
                    </span> 
                    // }
                  }
                )}
              </Modal.Body>
              <Modal.Footer>
                <button className={classes.modalButton} onClick={this.props.closeModal}>
                  Close
                </button>
                <button className={classes.modalButton} onClick={submitExercisesToFirebase}>
                  Add Workout
                </button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
    }

export default AddWorkout;