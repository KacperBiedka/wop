import React, { Component } from 'react';
import { Link } from 'react-router';
import firebase from '../../firebase';
import classes from './Home.module.sass';

class Home extends Component {
render() {
return (
<div className={classes.mainDiv + " shadow p-3 mb-1 bg-white rounded"}>
    <div className={classes.authDiv}>
     <h1 className={classes.mainHeader}>Workout Planner</h1>
     <p className={classes.inputParagraph}>Email</p>
     <input className={classes.inputField} type="email" placeholder=""/>
     <p className={classes.inputParagraph}>Password</p>
     <input className={classes.inputField} type="password" placeholder=""/>
     <p className={classes.inputParagraph}>Repeat Password</p>
     <input className={classes.inputField} type="password" placeholder=""/>
     <button className={classes.loginButton}>Login</button>
    </div>
</div> 
  )
 }
}

export default Home;