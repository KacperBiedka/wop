import React, { Component } from 'react';
import Redux from 'redux';
import firebase from '../../firebase.js';
import classes from './Workouts.module.css';

import Navbar from '../Navbar/Navbar';
import Loading from '../Loading/Loading';

class Workouts extends Component {
  state = {
    workouts: [],
    workoutNames: [],
    exercises: [],
    workoutCards: {},
    loading: true
  }

  componentDidMount() {
    const db = firebase.firestore();  
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const uid = user.uid;
        const query = db.collection("workouts").where("uid", "==", uid).orderBy("workoutNumber", "asc")
        query.get()
        .then((snapshot) => {
            snapshot.docs.forEach(doc => {
            let exercisesCopy = this.state.exercises;
            exercisesCopy.push(doc.data().exercises);
            let workoutsCopy = this.state.workouts;
            let workoutObject = {
              name: doc.data().workoutName,
              number: doc.data().workoutNumber
            }
            workoutsCopy.push(workoutObject);
            this.setState({
              exercises: exercisesCopy,
              workouts: workoutsCopy,
            })
          })
          this.setState({
            loading: false
          })
        })
        .catch(function(error) {
          console.log("Error getting workoutName: " + error);
          this.setState({
            loading: false
          })
        })
      } else {
          console.log("Error getting document");
      }
    }.bind(this));
  }
  

    logout = () => {
      firebase.auth().signOut();
      window.location.href = "..";
    }

    logData = () => {
      console.log(this.state.workouts);
      console.log(this.state.exercises);
    }

  render() {

        return (
          <div className={classes.workoutsDiv}>
          <Navbar/>
              {this.state.loading ? <Loading /> : null}
              <h1 className={classes.workoutsHeader}>
                Workouts Screen Successfuly Loaded!
              </h1>
              <button onClick={this.logout} className={classes.authButton}>Log out</button>
              <button onClick={() => this.logData()} className={classes.authButton}>Firebase!</button>
              {
                this.state.workouts.map(w => {
                  return (
                    <div className={classes.workoutCardDiv + " shadow p-3 mb-1 bg-white rounded"}>
                    <div className={classes.workoutCardHeaderDiv}>
                    <h5 className={classes.workoutNameHeader}>{w.name}</h5>
                    </div>
                    <ul className={classes.workoutCardList}>
                  { 
                    this.state.exercises[w.number-1].map(ex => {
                    return <li className={classes.workoutCardListItem}>{ex.exercise.exerciseName} {ex.exercise.sets} sets {ex.exercise.reps} reps with {ex.exercise.weight}kg</li>
                    })
                  }
                  </ul>
                </div>
                )
                })
              }
          </div>  
        );
    }
}

export default Workouts;