import React, { Component } from 'react';
import Redux from 'redux';
import firebase from '../../firebase.js';
import classes from './Workouts.module.css';

import Navbar from '../Navbar/Navbar';

class Workouts extends Component {
    render() {
      const logout = () => {
        firebase.auth().signOut();
        window.location.href = "..";
        }
        return (
          <div className={classes.workoutsDiv}>
          <Navbar/>
              <h1 className={classes.workoutsHeader}>
                Workouts Screen Successfuly Loaded!
              </h1>
              <button onClick={logout} className={classes.authButton}>
                Log out              
              </button>
          </div>  
        );
    }
}

export default Workouts;