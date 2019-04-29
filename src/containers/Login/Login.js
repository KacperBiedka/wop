import React, { Component } from "react";
import firebase from "../../firebase.js";
import * as firebaseui from "firebaseui";
import classes from "./Login.module.sass";

class Login extends Component {
  state = {
    email: "",
    password: "",
    emailError: null,
    passwordError: null,
    mainClass: " animated zoomIn",
    emailClass: classes.inputField,
    passwordClass: classes.inputField + " " + classes.passwordInput
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

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        mainClass: " "
      });
    }, 1000);
  };

  updateEmailState = e => {
    this.setState({
      email: e.target.value
    });
  };

  checkForEmailError = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.state.email.trim()) {
      this.setState({
        emailError: (
          <p className={classes.errorMessage}>Email field can't be empty</p>
        ),
        emailClass: classes.inputFieldError
      });
    } else if (!re.test(String(this.state.email).toLowerCase())) {
      this.setState({
        emailError: (
          <p className={classes.errorMessage}>Invalid Email format</p>
        ),
        emailClass: classes.inputFieldError
      });
    } else {
      this.setState({
        emailClass: classes.inputFieldSuccess,
        emailError: null
      });
    }
  };

  checkForPasswordError = () => {
    if (!this.state.password.trim()) {
      this.setState({
        passwordError: (
          <p className={classes.errorMessage}>Password field can't be empty</p>
        ),
        passwordClass: classes.inputFieldError
      });
    } else {
      this.setState({
        passwordClass: classes.inputFieldSuccess + " " + classes.passwordInput,
        passwordError: null
      });
    }
  };

  updatePasswordState = e => {
    this.setState({
      password: e.target.value
    });
  };

  loginWithEmailAndPassword = () => {
    if (this.state.passwordError || this.state.emailError) {
      alert("Input valid email and password before pressing Sign In");
    } else {
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
    }
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
        console.log("Error logging in: " + error.message);
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
        console.log("Error logging in: " + error.message);
      });
  };

  switchToSignUp = () => {
    this.setState({
      mainClass: " animated fadeOutUp"
    });
    setTimeout(() => {
      this.props.switchToSignUpDiv();
    }, 1000);
  };

  render() {
    return (
      <div className={classes.mainLoginDiv}>
        <div className={classes.authDiv + this.state.mainClass}>
          <h1 className={classes.mainHeader}>Sign In</h1>
          <div className={classes.standardLoginDiv}>
            <input
              className={this.state.emailClass}
              onChange={this.updateEmailState}
              onBlur={this.checkForEmailError}
              type="email"
              placeholder="Email"
            />
            {this.state.emailError}
            <input
              className={this.state.passwordClass}
              onChange={this.updatePasswordState}
              onBlur={this.checkForPasswordError}
              type="password"
              placeholder="Password"
            />
            {this.state.passwordError}
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
            <p onClick={this.switchToSignUp} className={classes.signUpAnchor}>
              Sign Up
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
