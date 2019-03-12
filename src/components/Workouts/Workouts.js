import React, { Component } from 'react';
import Redux from 'redux';
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
    reduxExercises: []
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

  render() {
        return (
          <div className={classes.workoutsDiv}>
          <Navbar/>
              {this.state.loading ? <Loading /> : null}
              {
                this.state.workouts.map(w => {
                  return (
                    <div className={classes.workoutCardDiv + " shadow p-3 mb-1 bg-white rounded"}>
                    <div className={classes.workoutCardHeaderDiv}>
                    <h5 onClick={this.logData} className={classes.workoutNameHeader}>{w.name}</h5>
                    </div>
                    <ul className={classes.workoutCardList}>
                  { 
                    this.state.exercises[w.number-1].map(ex => {
                    return <li className={classes.workoutCardListItem}>{ex.exercise.exerciseName} {ex.exercise.sets} sets {ex.exercise.reps} reps with {ex.exercise.weight}kg</li>
                    })
                  }
                  </ul>
                  <hr />
                  <Link to="/exercises">
                  <div className={classes.anchorDiv}>
                    <p onClick={() => this.props.getExercisesToRedux(this.state.exercises[w.number-1])} className={classes.modalAnchor}>choose</p>
                  </div>
                  </Link>
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