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

  loginWithTwitter = () => {
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

  updateEmailState = e => {
    this.setState({
      email: e.target.value
    });
  };

  updatePasswordState = e => {
    this.setState({
      password: e.target.value
    });
  };

  loginWithEmailAndPassword = () => {
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

  loginWithGoogle = () => {
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

  loginWithFacebook = () => {
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

  redirectToSignUp = () => {};

  render() {
    return (
      <div className={classes.mainLoginDiv}>
        <div className={classes.authDiv + " animated zoomIn"}>
          <h1 className={classes.mainHeader}>Sign In</h1>
          <div className={classes.standardLoginDiv}>
            <input
              className={classes.inputField}
              onChange={this.updateEmailState}
              type="email"
              placeholder="Email"
            />
            <input
              className={classes.inputField + " " + classes.passwordInputField}
              onChange={this.updatePasswordState}
              type="password"
              placeholder="Password"
            />
            <button
              className={classes.loginButton + " " + classes.buttonAnimation}
              onClick={this.loginWithEmailAndPassword}
            >
              <span className={classes.loginSpan}>Sign In</span>
            </button>
            <div className={classes.forgotPasswordDiv}>
              <p className={classes.forgotPassword}>Forgot password ?</p>
            </div>
          </div>
          <div className={classes.differentOptionsDiv}>
            <p className={classes.differentOptionsHeader}>
              Different login options
            </p>
            <i
              onClick={this.loginWithGoogle}
              className={"fab fa-google " + classes.googleIcon}
            />
            <i
              onClick={this.loginWithFacebook}
              className={"fab fa-facebook " + classes.facebookIcon}
            />
          </div>
          <div className={classes.signUpDiv}>
            <p onClick={this.redirectToSignUp} className={classes.signUpHeader}>
              Don't have an account ?
            </p>
            <p className={classes.signUpAnchor}>Sign Up</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
