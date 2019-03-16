import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import firebase from '../../firebase.js';
import classes from './Workouts.module.css';
import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Loading from '../Loading/Loading';

class Workouts extends Component {
  state = {
    workouts: [],
    workoutNames: [],
    exercises: [],
    workoutCards: {},
    loading: true,
    reduxExercises: [],
    removedDocId: null
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
  

    logData = () => {
      console.log(this.state.workouts);
      console.log(this.state.exercises);
    }

    removeWorkout = (number) => {
    console.log("removeWorkout function triggered " + number);
    const db = firebase.firestore();  
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.uid);
        const uid = user.uid;
        const deleteQuery = db.collection("workouts").where("uid", "==", uid).where("workoutNumber", "==", number).limit(1);
        const subtractNumberQuery = db.collection("workouts").where("uid", "==", uid);
        deleteQuery.get()
        .then((snapshot) => {
          snapshot.docs.forEach(doc => {
          firebase.firestore().collection("workouts").doc(doc.id).delete()
          .then(function() {
            subtractNumberQuery.get()
            .then((snapshot) => {
              snapshot.docs.forEach(doc => {
                console.log(doc.data().workoutNumber);
                if (doc.data().workoutNumber > number) {
                db.collection("workouts").doc(doc.id).update({
                  workoutNumber: doc.data().workoutNumber-1
                })
                .then(() => {
                  db.collection("users").doc(uid).get()
                  .then((doc) => {
                    console.log(doc.data().workoutsNumber);
                    db.collection("users").doc(uid).update({
                      workoutsNumber: doc.data().workoutsNumber - 1
                    })
                    .then(() => {
                      console.log("successfuly changed the user workoutsNumber")
                      window.location.reload();
                    })
                  })
                  .catch((error) => {
                    console.log("error changing user workoutsNumber : ", error);
                  })
                })
              }
            })
            })
            .catch((error) => {
              console.log("error subtracting workoutNumbers: ", error);
            })
            console.log("successfully removed the workout");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
        });
      })
      .catch(function(error) {
        console.log("Error getting removedWorkout Doc ID: " + error);
      })
      } else {
          console.log("Error getting document");
      }
    });
    }

  render() {
        return (
          <div className={classes.workoutsDiv}>
          <Navbar/>
              {this.state.loading ? <Loading /> : null}
              {
                this.state.workouts.map(w => {
                  return (
                    <div key={w.number + w.name} className={classes.workoutCardDiv + " shadow p-3 mb-1 bg-white rounded"}>
                    <div className={classes.workoutCardHeaderDiv}>
                    <h5 onClick={this.logData} className={classes.workoutNameHeader}>{w.name}</h5>
                    </div>
                    <ul className={classes.workoutCardList}>
                  { 
                    this.state.exercises[w.number-1].map(ex => {
                    return <li key={ex.exercise.exerciseName + ex.exercise.exerciseNumber} className={classes.workoutCardListItem}>{ex.exercise.exerciseName} {ex.exercise.sets} sets {ex.exercise.reps} reps with {ex.exercise.weight}kg</li>
                    })
                  }
                  </ul>
                  <hr />
                  <Link to="/exercises">
                  <div className={classes.anchorDiv}>
                    <p onClick={() => this.props.getExercisesToRedux(this.state.exercises[w.number-1])} className={classes.modalAnchor}>choose</p>
                  </div>
                  </Link>
                  <div className={classes.deleteDiv}>
                    <a className={classes.modalAnchor + " " + classes.deleteAnchor} onClick={() => this.removeWorkout(w.number)}>delete</a>
                  </div>
                  </div>
                )
                })
              }
          </div>  
        );
    }
}

const mapStateToProps = state => {
  return {
    exercises: state.exercises
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getExercisesToRedux: (exercises) => dispatch(actionTypes.getExercises(exercises))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workouts);