import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase.js';
import classes from './Navbar.module.css';
import AddWorkout from '../AddWorkout/AddWorkout';


class Navbar extends Component {
  state = {
    showAddWorkoutModal: false
  }

  render() {
        const logout = () => {
          firebase.auth().signOut();
          window.location.href = "..";
        };
        const toggleAddWorkoutModal = () => {
        this.setState({
          showAddWorkoutModal: !this.state.showAddWorkoutModal
        });
        console.log(this.state.showAddWorkoutModal);
        };

        const closeAddWorkoutModal = () => {
          this.setState({
            showAddWorkoutModal: false
          });
          console.log(this.state.showAddWorkoutModal);
          };

        return (
        <div className="componentDiv">
          <div className={classes.navbarDiv + " row shadow p-3 mb-5"}>
              <div className={classes.navDiv + " col-2"}><button onClick={toggleAddWorkoutModal} className={classes.navButton}>Add Workout</button></div>
              <div className={classes.navDiv + " col-2"}><button className={classes.navButton}>Timers</button></div>
              <div className={classes.navDiv + " col-1"}></div>
              <div className={classes.navDiv + " col-2"}>
              <Link to="/workouts">
              <svg className={classes.dbIcon} height="480pt" viewBox="0 -116 480 480" width="480pt" xmlns="http://www.w3.org/2000/svg">
              <path d="m472 80h-32v-24c0-13.253906-10.746094-24-24-24h-16c-2.730469.027344-5.4375.523438-8 1.472656v-9.472656c0-13.253906-10.746094-24-24-24h-16c-13.253906 0-24 10.746094-24 24v56h-176v-48c0-13.253906-10.746094-24-24-24h-16c-13.253906 0-24 10.746094-24 24v9.472656c-2.5625-.949218-5.269531-1.445312-8-1.472656h-16c-13.253906 0-24 10.746094-24 24v16h-32c-4.417969 0-8 3.582031-8 8v80c0 4.417969 3.582031 8 8 8h32v24c0 13.253906 10.746094 24 24 24h16c2.730469-.027344 5.4375-.523438 8-1.472656v1.472656c0 13.253906 10.746094 24 24 24h16c13.253906 0 24-10.746094 24-24v-48h176v40c0 13.253906 10.746094 24 24 24h16c13.253906 0 24-10.746094 24-24v-1.472656c2.5625.949218 5.269531 1.445312 8 1.472656h16c13.253906 0 24-10.746094 24-24v-16h32c4.417969 0 8-3.582031 8-8v-80c0-4.417969-3.582031-8-8-8zm-456 80v-64h24v64zm64 48h-16c-4.417969 0-8-3.582031-8-8v-136c0-4.417969 3.582031-8 8-8h16c4.417969 0 8 3.582031 8 8v136c0 4.417969-3.582031 8-8 8zm56 16c0 4.417969-3.582031 8-8 8h-16c-4.417969 0-8-3.582031-8-8v-192c0-4.417969 3.582031-8 8-8h16c4.417969 0 8 3.582031 8 8zm16-64v-64h176v64zm224 56c0 4.417969-3.582031 8-8 8h-16c-4.417969 0-8-3.582031-8-8v-192c0-4.417969 3.582031-8 8-8h16c4.417969 0 8 3.582031 8 8zm48-24c0 4.417969-3.582031 8-8 8h-16c-4.417969 0-8-3.582031-8-8v-136c0-4.417969 3.582031-8 8-8h16c4.417969 0 8 3.582031 8 8zm40-32h-24v-64h24zm0 0"/>
              </svg>
              </Link>
              </div>
              <div className={classes.navDiv + " col-1"}></div>
              <div className={classes.navDiv + " col-2"}><button onClick={logout} className={classes.navButton}>Logout</button></div>
              <div className={classes.navDiv + " col-2"}><button className={classes.navButton}>More</button></div>
          </div>
          <AddWorkout visible={this.state.showAddWorkoutModal} closeModal={closeAddWorkoutModal}/>
        </div>
        )
}
} 
    
      

export default Navbar;