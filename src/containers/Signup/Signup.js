import React, { Component } from "react";
import firebase from "../../firebase.js";
import classes from "./Signup.module.sass";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    repeatPassword: ""
  };

  render() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        window.location.href = "workouts";
      } else {
        // No user is signed in.
        console.log("not logged in");
      }
    });

    const createFirebaseUser = () => {
      if (this.state.repeatPassword === this.state.password) {
        console.log(this.state.email);
        console.log(this.state.password);
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .catch(function(error) {
            var errorMessage = error.message;
            console.log(errorMessage);
          });
      } else {
        alert("Passwords don't match!");
      }
    };

    const updateEmailState = e => {
      console.log(e.target.value);
      this.setState({
        email: e.target.value
      });
      console.log(this.state.email);
    };

    const updatePasswordState = e => {
      console.log(e.target.value);
      this.setState({
        password: e.target.value
      });
      console.log(this.state.password);
    };

    const updateRepeatPasswordState = e => {
      console.log(e.target.value);
      this.setState({
        repeatPassword: e.target.value
      });
      console.log(this.state.repeatPassword);
    };

    return (
      <div className={classes.signupDiv}>
        <div
          className={
            "  animated zoomIn shadow p-3 mb-5 bg-white rounded " +
            classes.mainDiv
          }
        >
          <h2 className={classes.loginHeader}>Signup</h2>
          <div className={classes.emailAuthContainer}>
            <p className={classes.inputParagraph}>Email</p>
            <input
              value={this.state.email}
              onChange={updateEmailState}
              className={classes.inputField}
              type="email"
            />
            <p className={classes.inputParagraph}>Password</p>
            <input
              value={this.state.password}
              onChange={updatePasswordState}
              className={classes.inputField + " " + classes.passwordInput}
              type="password"
            />
            <p className={classes.inputParagraph}>Repeat Password</p>
            <input
              value={this.state.repeatPassword}
              onChange={updateRepeatPasswordState}
              className={classes.inputField + " " + classes.passwordInput}
              type="password"
            />
            <button onClick={createFirebaseUser} className={classes.authButton}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
