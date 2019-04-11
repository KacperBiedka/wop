import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import classes from './Home.module.sass';

class Home extends Component {
state = {
  class: "",
  displayedContent: null
}

render() {

const switchToChoiceDiv = () => {
  this.setState({
    class: " animated fadeOutUp"
  })
  setTimeout(() => {
    this.setState({
      displayedContent:
      <div className={classes.choiceDiv}>
        <h1 className={classes.choiceHeader + " animated fadeInUp"}>Welcome to Workout Planner</h1>
        <button className={classes.choiceButton + " animated fadeInUp"}>Login</button>
        <p className={classes.choiceText + " animated fadeInUp"}>or</p>
        <button className={classes.choiceButton + " animated fadeInUp"}>Sign Up</button>
      </div> 
    })
  }, 1000);
}

if (this.state.displayedContent) {
  return (
   <div className={classes.mainDiv}>
     {this.state.displayedContent}
   </div>
  )
} else {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.contentDiv + this.state.class}>
        <h1 className={classes.mainHeader}>Workout Planner</h1>
        <h4 className={classes.describtionHeader}>Add your own workout, check your progress and use the timers between sets</h4>
        <button onClick={switchToChoiceDiv} className={classes.getStartedButton}>Get Started</button>
      </div>
    </div>
    )
  }
 }
}

export default Home;