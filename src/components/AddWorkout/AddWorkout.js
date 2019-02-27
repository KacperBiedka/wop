import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import firebase from '../../firebase.js';
import MaterialIcon, {colorPalette} from 'material-icons-react';

import classes from './AddWorkout.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

class AddWorkout extends Component {
  state = {
    workoutName: "",
    workoutNameError: null,
    exerciseNumber: 1,
    exerciseNumberError: null,
    exerciseName: null,
    exerciseNameError: null,
    sets: null,
    setsError: null,
    reps: null,
    repsError: null,
    weight: null,
    weightError: null,
    exercises: [],
    
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
          if (!this.state.exerciseName) {
            this.setState({
              exerciseNameError: <ErrorMessage text="Exercise Name field is required" />
            });
          } if (!this.state.sets) {
            this.setState({
              setsError: <ErrorMessage text="Sets field is required" />
            });
          } if (!this.state.reps) {
            this.setState({
              repsError: <ErrorMessage text="Reps field is required" />
            });
          } if (!this.state.weight) {
            this.setState({
              weightError: <ErrorMessage text="Weight field is required" />
            });
          } if (this.state.weight != null && !this.state.reps != null && this.state.sets != null && this.state.exerciseName != null) {
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
            weight: "",
            exerciseNameError: null,
            setsError: null,
            repsError: null,
            weightError: null
          });
        }
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
           workoutName: e.target.value,
           workoutNameError: null
          })
        }

        const submitExercisesToFirebase = () => {
          if (!this.state.workoutName) {
            console.log("there is no workout name :( pepehands");
            this.setState({
              workoutNameError: <ErrorMessage text="Workout Name is required" />
            });
          } else if (this.state.workoutName != null) {
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                const uid = user.uid;
                db.collection("users").doc(uid).set({
                  uid: uid,
                  email: user.email,
                  workoutsNumber: globalWorkoutNumber+1
                })
                // let exercisesStateCopy = this.state.exercises;
                // let workoutNameStateCopy = this.state.workoutName
                db.collection("workouts").add({
                  uid: uid,
                  exercises: this.state.exercises,
                  workoutName: this.state.workoutName,
                  workoutNumber: globalWorkoutNumber+1
                })
                .then(function() {
                  window.location.href = "/workouts";
                })
                .catch(function(error) {
                    console.error("Error adding workout: ", error);
                });
              } else {
                console.log("user not logged in");
              }
            }.bind(this))
            
          }
          }

          const removeExercise = (number) => {
            let exercisesStateCopy = this.state.exercises;
            this.state.exercises.splice(number, 1);
            this.setState({
              exercises: exercisesStateCopy
            })
          }

          const logCurrentState = () => {
            console.log(this.state.exercises);
          }
        
        return (
          <>
            <Modal show={this.props.visible} onHide={this.props.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add a new workout</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input onChange={updateWorkoutNameState} className={classes.workoutNameInput} type="text" placeholder="Workout Name" value={this.state.workoutName}/>
                {this.state.workoutNameError}
                <hr className={classes.workoutNameInputHr} />
                <h5 className={classes.exercisesHeader}>Exercise {this.state.exerciseNumber}</h5>
                <input onChange={updateExerciseNameState} className={classes.inputField} type="text" placeholder="Exercise Name" value={this.state.exerciseName} />
                {this.state.exerciseNameError}
                <input onChange={updateSetsState} className={classes.inputField + " " + classes.numberInputField} type="number" placeholder="Sets"  value={this.state.sets} />
                {this.state.setsError}
                <input onChange={updateRepsState} className={classes.inputField + " " + classes.numberInputField} type="number" placeholder="Reps"  value={this.state.reps} />
                {this.state.repsError}
                <input onChange={updateWeightState} className={classes.inputField + " " + classes.numberInputField} type="number" placeholder="Weight (kg)"  value={this.state.weight} />
                {this.state.weightError}
                <button onClick={renderNextExerciseInputs} className={classes.addExerciseButton}>+ Add exercise</button>
                { this.state.exercises.map(ex => {
                    return  <span number={ex.exercise.exerciseNumber} className={classes.exerciseListSpan} key={ex.exercise.exerciseName + ex.exercise.exerciseNumber + ex.exercise.weight}>
                     Exercise {ex.exercise.exerciseNumber} - {ex.exercise.exerciseName} {ex.exercise.sets} sets {ex.exercise.reps} reps with {ex.exercise.weight} kg 
                     <span number={ex.exercise.number} onClick={() => removeExercise(this.number)} className={classes.iconSpan}><MaterialIcon icon="cancel" color="coral" size="tiny"></MaterialIcon></span>
                    </span> 
                  }
                )}
              </Modal.Body>
              <Modal.Footer>
                
                <button className={classes.modalButton} onClick={this.props.closeModal}>
                  Close
                </button>
                <button className={classes.modalButton} onClick={logCurrentState}>
                  Log State
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