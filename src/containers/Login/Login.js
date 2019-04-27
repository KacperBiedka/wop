import React, { Component } from "react";
import firebase from "../../firebase.js";
import * as firebaseui from "firebaseui";
import classes from "./Login.module.sass";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loginError: null,
    column: " col-6"
  };

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.location.href = "/workouts";
      } else {
        console.log("User not logged in");
      }
    });
  };

  render() {
    const updateEmailState = e => {
      this.setState({
        email: e.target.value
      });
    };

    const updatePasswordState = e => {
      this.setState({
        password: e.target.value
      });
    };

    const loginWithEmailAndPassword = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(function() {
          window.location.href = "/workouts";
        })
        .catch(error => {
          var errorComponent = null;
          var errorMessage = error.message;
          console.log(errorMessage);
          errorComponent = (
            <div className={classes.loginErrorDiv}>{error.message}</div>
          );
          this.setState({
            loginError: errorComponent
          });
        });
    };

    const loginWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          console.log("login info: ", token, user);
          window.location.href = "/workouts";
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          alert("Error logging in: " + error.message);
        });
    };

    const loginWithFacebook = () => {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          console.log("login info: ", token, user);
          window.location.href = "/workouts";
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          alert("Error logging in: " + error.message);
        });
    };

    const loginWithTwitter = () => {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          console.log("login info: ", token, user);
          window.location.href = "/workouts";
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          alert("There is no twitter user signed in");
        });
    };

    return (
      <div className={classes.mainLoginDiv}>
        <div className={classes.authDiv + " animated zoomIn"}>
          <h1 className={classes.mainHeader}>Sign In</h1>
          <div className={classes.standardLoginDiv}>
            <input
              className={classes.inputField}
              onChange={updateEmailState}
              type="email"
              placeholder="Email"
            />
            <input
              className={classes.inputField + " " + classes.passwordInputField}
              onChange={updatePasswordState}
              type="password"
              placeholder="Password"
            />
            <button
              className={classes.loginButton + " " + classes.buttonAnimation}
              onClick={loginWithEmailAndPassword}
            >
              <span className={classes.loginSpan}>Sign In</span>
            </button>
            <div className={classes.forgotPasswordDiv}>
              <p className={classes.forgotPassword}>Forgot password ?</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
